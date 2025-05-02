import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATHS } from 'src/environments/API-PATHS';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  getPatientList(qp: {
    page: string;
    size: string;
    search: string;
  }): Observable<any> {
    return this.http.get(API_PATHS.getPatients(), { params: qp });
  }

  create(formData: any): Observable<any> {
    return this.http.post(API_PATHS.createPatient(), formData);
  }

  update(id: any, formData: any): Observable<any> {
    return this.http.post(API_PATHS.updatePatient(id), formData);
  }

  // patient visit

  getPatientVisitList(qp: {
    page: string;
    size: string;
    search: string;
    patient: string;
  }): Observable<any> {
    console.log('qp', qp);

    return this.http.get(API_PATHS.getPatientVisit(), { params: qp });
  }

  createPatientVisit(formData: any): Observable<any> {
    return this.http.post(API_PATHS.createPatientVisit(), formData);
  }
}
