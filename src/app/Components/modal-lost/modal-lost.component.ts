import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LostChildren } from 'src/app/Models/lostChildren';
import { ModalLostService } from './modal-lost.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-lost',
  templateUrl: './modal-lost.component.html',
  styleUrls: ['./modal-lost.component.css']
})
export class ModalLostComponent implements OnInit {

  urlImg = 'assets/image/photo.png';
  myFormLost!: FormGroup;
  file : File |null = null;

  constructor(private ref : MatDialogRef<ModalLostComponent> ,
              private http : HttpClient,
              private modalService : ModalLostService,
              private router: Router,
              ) { }

  ngOnInit() {
    this.myFormLost = new FormGroup({
      Image: new FormControl(''),
      Name: new FormControl(''),
      Date: new FormControl(''),
      Age: new FormControl(),
      LostCity: new FormControl(''),
      Address_City: new FormControl(''),
      PersonWhoLost: new FormControl(''),
      PhonePersonWhoLost: new FormControl(''),
      Note: new FormControl(''),
      Gender: new FormControl('')
    });
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.urlImg = reader.result as string;
      };
      this.file = file;
    } else {
      this.file = null;
    }
  }

  closeModal() {
    this.ref.close()
  }




  lostSubmit() {
    const ageValue = parseInt(this.myFormLost.controls['Age'].value);
    this.myFormLost.controls['Age'].setValue(ageValue);

    const formData = new FormData();
    if (this.file) {
      formData.append('Image', this.file);
    }
    formData.append('Name', this.myFormLost.get('Name')?.value);
    formData.append('Date', this.myFormLost.get('Date')?.value);
    formData.append('Age', this.myFormLost.get('Age')?.value);
    formData.append('LostCity', this.myFormLost.get('LostCity')?.value);
    formData.append('Address_City', this.myFormLost.get('Address_City')?.value);
    formData.append('PersonWhoLost', this.myFormLost.get('PersonWhoLost')?.value);
    formData.append('PhonePersonWhoLost', this.myFormLost.get('PhonePersonWhoLost')?.value);
    formData.append('Note', this.myFormLost.get('Note')?.value);
    formData.append('Gender', this.myFormLost.get('Gender')?.value);
    if (this.myFormLost.valid) {
      this.http.post<LostChildren>('https://missingpersonapi.runasp.net/api/LostPerson', formData)
        .subscribe({
          next: res => {
            console.log('The form:', res);
            this.modalService.sendFoundData([res]);
            this.closeModal();
            this.router.navigate(['/Lost']);
          },
          error: err => console.error('Error:', err)
        });
    }
  }

}
