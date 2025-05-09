import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import addWidthToSelectWrapperInner from 'src/app/utilities/add-width-to-select-wrapper-inner';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';
import { PATTERN } from 'src/app/utilities/form-patterns';
import { FieldErrorMessageComponent } from 'src/app/components/field-error-message/field-error-message.component';
import { CommonModule } from '@angular/common';
import { ToastService } from 'src/app/services/toast.service';
import { imageAllowedTypes } from 'src/app/utilities/file-types';
import { LoadingService } from 'src/app/services/loading.service';
import { PatientService } from 'src/app/services/patient.service';
import { NavController } from '@ionic/angular/standalone';
import { BackHeaderComponent } from 'src/app/components/back-title-header/back-title-header.component';

@Component({
  selector: 'app-patient-add',
  templateUrl: 'patient-add.page.html',
  styleUrls: ['patient-add.page.scss'],
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
export class PatientAddPage {
  constructor(
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
      [Validators.pattern(PATTERN.CHAR_NUM_DASH), Validators.maxLength(50)],
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

  async submit() {
    if (this.addPatientForm.invalid) {
      this.addPatientForm.markAllAsTouched();
      return;
    }
    await this.loadingService.show();

    const formValue = this.addPatientForm.getRawValue();
    const formData = new FormData();

    console.log('formValue', formValue);

    formData.append('name', `${formValue.firstName} ${formValue.lastName}`);
    formData.append('age', formValue.age);
    formData.append('address', formValue.address);
    formData.append('phone', formValue.phone);
    formData.append('email', formValue.email);
    formData.append('gender', formValue.gender);
    formData.append('desc', formValue.desc);
    formData.append('occupation', formValue.occupation);

    if (formValue.avatar) {
      formData.append('avatar', formValue.avatar);
    }

    this.patientService.create(formData).subscribe({
      next: async (response) => {
        console.log('response', response);
        await this.loadingService.hide();
        await this.toastService.show(response.message, 2000, 'Success', 'top');
        // this.navController.back();
        return this.navController.navigateRoot(['/patients-log']);
      },
      error: async (err) => {
        await this.loadingService.hide();
        await this.toastService.show(err.error.message, 2000, 'Error', 'top');
        console.error('Login failed:', err);
      },
    });
  }

  ionViewWillEnter() {
    addWidthToSelectWrapperInner('gender');
    addWidthToSelectWrapperInner('status');
  }
}
