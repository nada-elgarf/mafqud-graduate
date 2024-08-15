import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SignUp } from 'src/app/Models/sign-up';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userRegister!: FormGroup;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.userRegister = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Name: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  userSubmit() {
    if (this.userRegister.valid) {
      const signUpData: SignUp = this.userRegister.value;
      this.authService.signUp(signUpData).subscribe(
        response => {
          console.log('Sign-up successful', response);
          this.router.navigate(['/']);
        },
        error => {
          console.error('Sign-up failed', error);
        }
      );
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
