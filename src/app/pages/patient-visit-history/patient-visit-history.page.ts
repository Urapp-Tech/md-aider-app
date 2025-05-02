import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { BackHeaderComponent } from 'src/app/components/back-title-header/back-title-header.component';

@Component({
  selector: 'app-patient-visit-history',
  templateUrl: './patient-visit-history.page.html',
  styleUrls: ['./patient-visit-history.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    SharedModule,
    HeaderComponent,
    CommonModule,
    BackHeaderComponent,
  ],
})
export class PatientVisitHistoryPage implements OnInit {
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  patientId: string | null = null;
  patientData: any;
  allPateintData: any;

  ngOnInit() {
    const navState = history.state;
    this.patientId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('visit data', navState, this.patientId);

    if (navState && navState.patient) {
      this.patientData = navState.patient;
      this.allPateintData = navState.allPatientList;
    }
  }

  isImage(url: string): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const ext = url.split('.').pop()?.toLowerCase();
    return ext ? imageExtensions.includes(ext) : false;
  }

  formatDate(date: string): string {
    return format(new Date(date), 'dd MMM yyyy');
  }
}
