import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MafqudService } from 'src/app/Mafqud.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchResultsService } from 'src/app/searchResults.service';
import { foundChildren } from 'src/app/Models/foundChildren';
import { ModalFoundService } from '../modal-found/modal-found.service';

@Component({
  selector: 'app-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.css']
})
export class FoundComponent implements OnInit, OnDestroy {
  foundChild: foundChildren[] = [];
  FoundDataSubscription: Subscription | undefined;
  formSearch: FormGroup;
  results: foundChildren[] = [];
  urlImg = 'assets/image/photo.png';
  file: File | null = null;
  showModal = false;
  searchPerformed = false;
  showNoResultsMessage = false;
  showImageSearchError = false;
  constructor(
    private router: Router,
    private foundService: MafqudService,
    private searchResultsService: SearchResultsService,
    private modalFound: ModalFoundService,
    private cdr: ChangeDetectorRef
  ) {
    this.formSearch = new FormGroup({
      Name: new FormControl(''),
      Iamge: new FormControl(null)
    });
  }

  ngOnInit() {
    this.modalFound.foundChildrenSource.subscribe({
      next: res => {
        this.foundChild.push(res);
        console.log('postCard', res);
      }
    });
    this.getAllFoundChildren();
    this.searchResultsService.foundCurrentResults.subscribe(results => {
      this.results = Array.isArray(results) ? results : [];
      this.showNoResultsMessage = this.searchPerformed && this.results.length === 0;
      this.cdr.detectChanges();
    });
  }

  getAllFoundChildren() {
    this.FoundDataSubscription = this.foundService.getAllChildrenFound().subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        this.foundChild = Array.isArray(response.value) ? response.value : [];
      },
      error: (err: any) => {
        console.error('Error fetching found children:', err);
        this.foundChild = [];
      }
    });
  }

  gotoDetails(child: foundChildren) {
    this.router.navigate(['/Details', child.id]);
  }

  ngOnDestroy() {
    if (this.FoundDataSubscription) {
      this.FoundDataSubscription.unsubscribe();
    }
  }

  onSelectFile(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.formSearch.patchValue({ Iamge: this.file });
      const reader = new FileReader();
      reader.onload = () => {
        this.urlImg = reader.result as string;
      };
      reader.readAsDataURL(this.file);
      console.log(this.file);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    const { Name } = this.formSearch.value;

    if (Name || this.file) {
      this.searchPerformed = true;
      this.showNoResultsMessage = false;
      this.showImageSearchError = false;

      if (Name) {
        this.foundService.searchByNameForFound(Name).subscribe({
          next: (data: any) => {
            console.log('Search by name result:', data);
            if (Array.isArray(data.value)) {
              this.results = data.value;
            } else {
              this.results = [];
            }
            this.searchResultsService.updateFoundResults(this.results);
            this.cdr.detectChanges();
          },
          error: err => {
            console.error('Error searching by name:', err);
            this.results = [];
          },
          complete: () => {
            this.showNoResultsMessage = this.searchPerformed && this.results.length === 0;
            this.closeModal();
          }
        });
      }

      if (this.file) {
        const formData = new FormData();
        formData.append('Iamge', this.file);
        this.foundService.searchByImageForFound(formData).subscribe({
          next: (data: foundChildren[]) => {
            console.log('Search by image result:', data);
            if (Array.isArray(data)) {
              this.results = data;
              this.showNoResultsMessage = this.searchPerformed && this.results.length === 0;
            } else {
              this.results = [];
              this.showNoResultsMessage = true;
            }
            this.searchResultsService.updateFoundResults(this.results);
            this.cdr.detectChanges();
          },
          error: err => {
            console.error('Error searching by image:', err);
            this.results = [];
            this.showNoResultsMessage = true;
            this.showImageSearchError = true;
          },
          complete: () => {
            this.closeModal();
          }
        });
      }
    } else {
      this.searchPerformed = false;
      this.showNoResultsMessage = false;
      this.showImageSearchError = false;
    }
  }
}
