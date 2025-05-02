import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATHS } from 'src/environments/API-PATHS';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  getDashboardActivity(): Observable<any> {
    return this.http.get(API_PATHS.getDashboardActivity());
  }
}
