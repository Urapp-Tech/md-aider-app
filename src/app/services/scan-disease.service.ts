import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATHS } from 'src/environments/API-PATHS';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScanDiseaseService {
  constructor(private http: HttpClient) {}

  create(formData: any): Observable<any> {
    return this.http.post(API_PATHS.createScanDisease(), formData);
  }
}
