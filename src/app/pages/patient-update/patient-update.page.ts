import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { FieldErrorMessageComponent } from 'src/app/components/field-error-message/field-error-message.component';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PatientService } from 'src/app/services/patient.service';
import { NavController } from '@ionic/angular/standalone';
import { imageAllowedTypes } from 'src/app/utilities/file-types';
import { PATTERN } from 'src/app/utilities/form-patterns';
import { BackHeaderComponent } from 'src/app/components/back-title-header/back-title-header.component';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.page.html',
  styleUrls: ['./patient-update.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    SharedModule,
    HeaderComponent,
    TabsComponent,
    FieldErrorMessageComponent,
    CommonModule,
    BackHeaderComponent,
  ],
})
export class PatientUpdatePage implements OnInit {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService,
    private readonly patientService: PatientService,
    private readonly navController: NavController
  ) {}

  addPatientForm = this.formBuilder.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.pattern(PATTERN.CHAR_NUM_DASH),
        Validators.maxLength(50),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.pattern(PATTERN.CHAR_NUM_DASH),
        Validators.maxLength(50),
      ],
    ],
    age: [
      '',
      [
        Validators.required,
        Validators.pattern(PATTERN.ONLY_NUM),
        (control: any) =>
          control.value && control.value.toString().length > 3
            ? { maxlength: true }
            : null,
      ],
    ],
    address: ['', []],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(PATTERN.ONLY_NUM),
        (control: any) =>
          control.value && control.value.toString().length > 15
            ? { maxlength: true }
            : null,
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(PATTERN.EMAIL),
        Validators.maxLength(50),
      ],
    ],
    gender: ['', [Validators.required]],
    desc: ['', [Validators.required, Validators.maxLength(250)]],
    occupation: ['', []],
    avatar: [null as File | null, []],
  });

  avatarPrevieweUrl: string | ArrayBuffer | undefined | null = null;
  patientId: string | null = null;
  patientData: any;

  onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];

      if (!imageAllowedTypes.includes(file.type)) {
        this.toastService.show(
          'Only PNG, JPG, and JPEG files are allowed.',
          2000,
          'Error',
          'top'
        );
        input.value = '';
        return;
      }

      this.addPatientForm.patchValue({ avatar: file });
      this.addPatientForm.get('avatar')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPrevieweUrl = reader.result?.toString() || null;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit() {
    const navState = history.state;
    this.patientId = this.activatedRoute.snapshot.paramMap.get('id');

    if (navState && navState.patientData) {
      this.patientData = navState.patientData;
      this.populateForm(this.patientData);
    }
  }

  populateForm(patient: any) {
    const [firstName, lastName] = patient.name.split(' ');
    this.addPatientForm.patchValue({
      ...patient,
      firstName,
      lastName,
    });

    if (patient.avatar) {
      this.avatarPrevieweUrl = patient.avatar;
    }
  }

  async submit() {
    if (this.addPatientForm.invalid) {
      this.addPatientForm.markAllAsTouched();
      return;
    }
    await this.loadingService.show();

    const formValue = this.addPatientForm.getRawValue();
    const formData = new FormData();

    console.log('update formValue', formValue);

    formData.append('name', `${formValue.firstName} ${formValue.lastName}`);
    formData.append('age', formValue.age);
    formData.append('address', formValue.address);
    formData.append('phone', formValue.phone);
    formData.append('email', formValue.email);
    formData.append('gender', formValue.gender);
    formData.append('desc', formValue.desc);
    formData.append('occupation', formValue.occupation);

    if (formValue.avatar && formValue.avatar instanceof File) {
      formData.append('avatar', formValue.avatar);
    }

    this.patientService.update(this.patientId, formData).subscribe({
      next: async (response) => {
        await this.loadingService.hide();
        await this.toastService.show(response.message, 2000, 'Success', 'top');
        this.navController.back();
      },
      error: async (err) => {
        await this.loadingService.hide();
        await this.toastService.show(err.error.message, 2000, 'Error', 'top');
        console.error('Login failed:', err);
      },
    });
  }
}
