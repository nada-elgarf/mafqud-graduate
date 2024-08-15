import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required)
    });
  }

  userSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next : response => {
          console.log('Login successful', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', loginData.UserName);
          this.router.navigate(['/']);
        },
        error : err=> {
          console.error('Login failed', err);
          this.errorMessage = 'Invalid username or password';
        }
      }

      );
    }
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
