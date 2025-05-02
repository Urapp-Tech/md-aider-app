import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { NavController } from '@ionic/angular/standalone';
import { PatientService } from 'src/app/services/patient.service';
import { ToastService } from 'src/app/services/toast.service';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';
import { format } from 'date-fns';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patients-log',
  templateUrl: 'patients-log.page.html',
  styleUrls: ['patients-log.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    SharedModule,
    HeaderComponent,
    TabsComponent,
    CommonModule,
  ],
})
export class PatientsLogPage {
  constructor(
    private patientService: PatientService,
    private toastService: ToastService,
    private readonly navController: NavController
  ) {
    this.patientService
      .getPatientList({ page: this.page, size: this.size, search: this.search })
      .subscribe({
        next: (data) => {
          this.list = data.data.list;
          this.total = data.data.total;
        },
        error: async (err) =>
          await this.toastService.show(err.error.message, 2000, 'Error', 'top'),
      });
  }

  page: any = 0;
  size: any = 10;
  search: string = '';

  list: any[] = [];
  total: any = 0;
  formatDate(date: string): string {
    return format(new Date(date), 'dd MMM yyyy');
  }

  navigateToAddPage() {
    return this.navController.navigateRoot('/patient-add');
  }

  navigateToPatientProfile(patient: any, index: number) {
    return this.navController.navigateRoot(['/patient-profile', patient.id], {
      state: {
        patientData: { ...patient, mrNo: index + 1 },
      },
    });
  }

  navigateToPatientUpdateProfile(patient: any) {
    return this.navController.navigateRoot(['/patient-update', patient.id], {
      state: { patientData: patient },
    });
  }
}
