import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css']
})
export class NavbarComponent implements OnInit {

  urlImg = 'assets/image/photo.png'

  constructor() { }

  ngOnInit() {
  }

  onSelectFile(event : any) {
    if(event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]) ;
      reader.onload = (e : any) => {
        this.urlImg = e.target.result;
      }
    }
  }


  openModal() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv !=null) {
      modelDiv.style.display = 'block';
    }
  }
  closeModal() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv !=null) {
      modelDiv.style.display = 'none';
    }
  }

}
