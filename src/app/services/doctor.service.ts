import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATHS } from 'src/environments/API-PATHS';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  update(id: any, formData: any): Observable<any> {
    return this.http.post(API_PATHS.updateDoctor(id), formData);
  }
}
