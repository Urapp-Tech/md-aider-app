import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { IonDatetime, IonPopover } from '@ionic/angular/standalone';
import { endOfDay } from 'date-fns';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-patient-visit-add',
  templateUrl: 'patient-visit-add.page.html',
  styleUrls: ['patient-visit-add.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule, HeaderComponent, TabsComponent],
})
export class PatientVisitAddPage {
  constructor(private readonly formBuilder: NonNullableFormBuilder) {}

  durationStartValue!: string;
  durationEndValue!: string;

  durationEndMinimumDate = new Date().toISOString();

  tab:
    | 'PRESENTING_COMPLAINTS'
    | 'PRESCRIPTION'
    | 'LAB_TEST'
    | 'SCAN'
    | 'PREVIOUS_VISITS' = 'PRESENTING_COMPLAINTS';

  addPatientVisitForm = this.formBuilder.group({
    presentingComplaints: this.formBuilder.group({
      chiefPresentingComplaints: ['', []],
      typeOfComplaint: ['NEW', []],
      durationStart: ['', []],
      durationEnd: ['', []],
    }),
    prescription: this.formBuilder.group({}),
    labTest: this.formBuilder.group({}),
    scan: this.formBuilder.group({}),
  });

  async durationStartChanged(
    ionPopoverRef: IonPopover,
    ionDatetimeRef: IonDatetime
  ) {
    this.durationStartValue = ionDatetimeRef.value as string;
    this.durationEndValue = '';
    this.durationEndMinimumDate = endOfDay(
      this.durationStartValue.split('T')[0]
    ).toISOString();
    this.addPatientVisitForm.patchValue({
      presentingComplaints: {
        durationEnd: '',
      },
    });
    await ionPopoverRef.dismiss();
  }

  async durationEndChanged(
    ionPopoverRef: IonPopover,
    ionDatetimeRef: IonDatetime
  ) {
    this.durationEndValue = ionDatetimeRef.value as string;
    await ionPopoverRef.dismiss();
  }

  nextTab() {
    if (this.tab === 'PRESENTING_COMPLAINTS') {
      this.tab = 'PRESCRIPTION';
      return;
    }
    if (this.tab === 'PRESCRIPTION') {
      this.tab = 'LAB_TEST';
      return;
    }
    if (this.tab === 'LAB_TEST') {
      this.tab = 'SCAN';
      return;
    }
    if (this.tab === 'SCAN') {
      this.tab = 'PREVIOUS_VISITS';
      return;
    }
  }

  submit() {
    if (this.addPatientVisitForm.invalid) {
      this.addPatientVisitForm.markAllAsTouched();
      return;
    }
  }

  ionViewWillEnter() {}
}
