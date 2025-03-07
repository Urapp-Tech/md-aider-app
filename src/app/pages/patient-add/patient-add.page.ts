import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import addWidthToSelectWrapperInner from 'src/app/utilities/add-width-to-select-wrapper-inner';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-patient-add',
  templateUrl: 'patient-add.page.html',
  styleUrls: ['patient-add.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule, HeaderComponent, TabsComponent],
})
export class PatientAddPage {
  constructor(private readonly formBuilder: NonNullableFormBuilder) {}

  addPatientForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    age: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    status: ['', [Validators.required]],
    occupation: ['', [Validators.required]],
  });

  submit() {
    if (this.addPatientForm.invalid) {
      this.addPatientForm.markAllAsTouched();
      return;
    }
  }

  ionViewWillEnter() {
    addWidthToSelectWrapperInner('gender');
    addWidthToSelectWrapperInner('status');
  }
}
