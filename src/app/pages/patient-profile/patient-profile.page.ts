import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { LoadingService } from 'src/app/services/loading.service';
import { PatientService } from 'src/app/services/patient.service';
import { ToastService } from 'src/app/services/toast.service';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { NavController } from '@ionic/angular/standalone';
import { SharedModule } from 'src/modules/shared.module';
import { format } from 'date-fns';
import { CommonModule } from '@angular/common';
import { BackHeaderComponent } from 'src/app/components/back-title-header/back-title-header.component';

@Component({
  selector: 'app-patient-profile',
  templateUrl: 'patient-profile.page.html',
  styleUrls: ['patient-profile.page.scss'],
  standalone: true,
  imports: [
    BackHeaderComponent,
    IonicSharedModule,
    SharedModule,
    HeaderComponent,
    TabsComponent,
    CommonModule,
  ],
})
export class PatientProfilePage implements OnInit {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService,
    private readonly patientService: PatientService,
    private readonly navController: NavController
  ) {}

  patientId: string | null = null;
  patientData: any;
  page: any = 0;
  size: any = 10;
  search: string = '';

  list: any[] = [];
  total: any = 0;

  ngOnInit() {
    const navState = history.state;
    this.patientId = this.activatedRoute.snapshot.paramMap.get('id');

    if (navState && navState.patientData) {
      this.patientData = navState.patientData;
    }

    this.patientService
      .getPatientVisitList({
        page: this.page,
        size: this.size,
        search: this.search,
        patient: this.patientId || '',
      })
      .subscribe({
        next: (data) => {
          this.list = data.data.list;
          this.total = data.data.total;
        },
        error: async (err) =>
          await this.toastService.show(err.error.message, 2000, 'Error', 'top'),
      });
  }
  navigateToPatientVisitCreate(patient: any) {
    console.log('patient', patient);

    return this.navController.navigateRoot(['/patient-visit-add', patient.id], {
      state: { patient, patientList: this.list },
    });
  }

  navigateToPatientVisitHistory(patient: any) {
    console.log('patient visit', patient);
    return this.navController.navigateRoot(
      ['/patient-visit-history', patient.id],
      {
        state: { patient, allPatientList: this.list },
      }
    );
  }

  formatDate(date: string): string {
    return format(new Date(date), 'dd MMM yyyy');
  }
}
