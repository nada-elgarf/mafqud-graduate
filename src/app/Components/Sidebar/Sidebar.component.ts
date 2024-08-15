import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalFoundComponent } from '../modal-found/modal-found.component';
import { ModalLostComponent } from '../modal-lost/modal-lost.component';


@Component({
  selector: 'app-Sidebar',
  templateUrl: './Sidebar.component.html',
  styleUrls: ['./Sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
  }

  openFoundModal() {
    this.dialog.open(ModalFoundComponent, {
      width: '40%'
    });
  }

  openLostModal() {
    this.dialog.open(ModalLostComponent, {
      width: '40%'
    });
  }

  openModal() {

      const modelDiv = document.getElementById('uploadPhoto');
      if (modelDiv != null) {
        modelDiv.style.display = 'block';
      }

  }

  closeModal() {
    const modelDiv = document.getElementById('uploadPhoto');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  logout() {
  }
}
