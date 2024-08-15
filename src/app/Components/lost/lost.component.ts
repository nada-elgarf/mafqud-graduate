import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MafqudService } from 'src/app/Mafqud.service';
import { LostChildren } from 'src/app/Models/lostChildren';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchResultsService } from 'src/app/searchResults.service';

@Component({
  selector: 'app-lost',
  templateUrl: './lost.component.html',
  styleUrls: ['./lost.component.css']
})
export class LostComponent implements OnInit, OnDestroy {
  lostChild: LostChildren[] = [];
  LostDataSubscription: Subscription | undefined;
  formSearch!: FormGroup;
  results: LostChildren[] = [];
  urlImg = 'assets/image/photo.png';
  file: File | null = null;
  showModal = false;

  constructor(
    private router: Router,
    private lostService: MafqudService,
    private searchResultsService: SearchResultsService
  ) {}

  ngOnInit() {
    this.getAllLostChildren();
    this.formSearch = new FormGroup({
      Name: new FormControl(''),
      Address_City: new FormControl('')
    });

    this.searchResultsService.lostCurrentResults.subscribe(results => {
      if (Array.isArray(results)) {
        this.results = results;
      } else {
        console.error('Received non-array results:', results);
      }
    });
  }

  getAllLostChildren() {
    this.lostService.getAllLostChildren().subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        if (response && Array.isArray(response.value)) {
          this.lostChild = response.value;
        } else {
          console.error('Received non-array or invalid result:', response);
          this.lostChild = [];
        }
      },
      error: err => {
        console.error('Error fetching lost children:', err);
        this.lostChild = [];
      }
    });
  }

  gotoDetails(child: LostChildren) {
    this.router.navigate(['/lostDetails', child.id]);
  }

  ngOnDestroy() {
    if (this.LostDataSubscription) {
      this.LostDataSubscription.unsubscribe();
    }
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.urlImg = reader.result as string;
      };
      reader.readAsDataURL(file);
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
    if (Name) {
      this.lostService.searchByNameForLost(Name).subscribe({
        next: data => {
          console.log('Search by name result:', data);
          this.results = Array.isArray(data) ? data : [];
          this.searchResultsService.updateLostResults(this.results);
          this.closeModal();
        },
        error: err => {
          console.error('Error searching by name:', err);
          this.results = [];
        }
      });
    }
  }
}
