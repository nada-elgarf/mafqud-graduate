import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signUpUrl = 'https://missingpersonapi.runasp.net/api/Account/Register';
  private loginUrl = 'https://missingpersonapi.runasp.net/api/Account/Login';

  constructor(private http: HttpClient) { }

  signUp(userData: any): Observable<any> {
    return this.http.post(this.signUpUrl, userData, { responseType: 'text' }) // Expect a text response
      .pipe(
        catchError(this.handleError)
      );
  }

  login(loginData: any): Observable<any> {
    const formData = new FormData();
    formData.append('UserName', loginData.UserName);
    formData.append('Password', loginData.Password);
    return this.http.post<any>(this.loginUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') && !!localStorage.getItem('userName');
  }

  getLoggedInUserName(): string | null {
    return localStorage.getItem('userName');
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error); // Log full error details
    let errorMessage = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('Detailed Error:', errorMessage);
    return throwError(errorMessage);
  }
}
