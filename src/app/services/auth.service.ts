import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATHS } from 'src/environments/API-PATHS';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginUser(payload: {
    identifier: string;
    password: string;
  }): Observable<any> {
    return this.http.post(API_PATHS.loginUser(), payload);
  }

  getOtp(payload: { email: string }): Observable<any> {
    return this.http.post(API_PATHS.getOtp(), payload);
  }

  newPassword(payload: {
    email: string;
    password: string;
    otp: string;
  }): Observable<any> {
    return this.http.post(API_PATHS.newPassword(), payload);
  }
}
