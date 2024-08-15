import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-Setting',
  templateUrl: './Setting.component.html',
  styleUrls: ['./Setting.component.css']
})
export class SettingComponent implements OnInit {
  userName: string | null = null;

  constructor(private authservice : AuthService) { }

  ngOnInit() {
    this.userName = this.authservice.getLoggedInUserName();  }

}
