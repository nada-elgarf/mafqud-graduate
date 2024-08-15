import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { foundChildren } from 'src/app/Models/foundChildren';
import { Router } from '@angular/router';
import { ModalFoundService } from './modal-found.service';

@Component({
  selector: 'app-modal-found',
  templateUrl: './modal-found.component.html',
  styleUrls: ['./modal-found.component.css']
})
export class ModalFoundComponent implements OnInit {
  urlImg = 'assets/image/photo.png';
  myFormFound!: FormGroup;
  file: File | null = null;

  constructor(
    private ref: MatDialogRef<ModalFoundComponent>,
    private http: HttpClient,
    private route: Router,
    private modalFoundService: ModalFoundService
  ) {}

  ngOnInit() {
    this.myFormFound = new FormGroup({
      Image: new FormControl(''),
      Name: new FormControl(''),
      Date: new FormControl(''),
      Age: new FormControl(),
      FoundCity: new FormControl(''),
      Address_City: new FormControl(''),
      Finder: new FormControl(''),
      FinderContact: new FormControl(''),
      Note: new FormControl(''),
      Gender: new FormControl('')
    });
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.file = file;
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.urlImg = reader.result as string;
        }
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        this.file = null;
      };
      reader.readAsDataURL(file);
    } else {
      this.file = null;
    }
  }


  closeModal() {
    this.ref.close();
  }

  foundSubmit() {
    const ageValue = parseInt(this.myFormFound.controls['Age'].value);
    this.myFormFound.controls['Age'].setValue(ageValue);

    const formData = new FormData();
    if (this.file) {
      formData.append('Image', this.file);
    }
    formData.append('Name', this.myFormFound.get('Name')?.value);
    formData.append('Date', this.myFormFound.get('Date')?.value);
    formData.append('Age', this.myFormFound.get('Age')?.value);
    formData.append('FoundCity', this.myFormFound.get('FoundCity')?.value);
    formData.append('Address_City', this.myFormFound.get('Address_City')?.value);
    formData.append('Finder', this.myFormFound.get('Finder')?.value);
    formData.append('FinderContact', this.myFormFound.get('FinderContact')?.value);
    formData.append('Note', this.myFormFound.get('Note')?.value);
    formData.append('Gender', this.myFormFound.get('Gender')?.value);

    if (this.myFormFound.valid) {
      this.http.post<any>('https://missingpersonapi.runasp.net/api/FoundPerson', formData)
        .subscribe({
          next: res => {
            console.log('The form:', res);
            this.modalFoundService.addFoundChild(res.value);
            this.closeModal();
          },
          error: err => console.error('Error:', err)
        });
    }
  }
}
