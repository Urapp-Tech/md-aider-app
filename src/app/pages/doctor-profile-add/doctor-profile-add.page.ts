import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IonDatetime, IonPopover } from '@ionic/angular/standalone';
import { endOfDay, formatISO, sub } from 'date-fns';
import { BackHeaderComponent } from 'src/app/components/back-title-header/back-title-header.component';
import { FieldErrorMessageComponent } from 'src/app/components/field-error-message/field-error-message.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { CapacitorStorageService } from 'src/app/services/capacitor-storage.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { addCustomStylesToIonPickerInternal } from 'src/app/utilities/add-custom-styles-to-ion-picker-internal';
import { getTimeAsDateTime } from 'src/app/utilities/date-helpers';
import fileToDataUrl from 'src/app/utilities/file-to-data-url';
import { PATTERN } from 'src/app/utilities/form-patterns';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

const TEMP_IMAGE: File | null = null;
const DAYS_INT = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
} as const;
const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;
const TEMP_STRING_ARRAY: Array<string> = [];
type Day = (typeof DAYS)[number];
type Schedule = {
  day: Day;
  openTime: string;
  closeTime: string;
};
const TEMP_SCHEDULE_ARRAY: Array<Schedule> = [];

type Mode = 'ADD' | 'EDIT';

@Component({
  selector: 'app-doctor-profile-add',
  templateUrl: 'doctor-profile-add.page.html',
  styleUrls: ['doctor-profile-add.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    SharedModule,
    HeaderComponent,
    TabsComponent,
    BackHeaderComponent,
    FieldErrorMessageComponent,
  ],
})
export class DoctorProfileAddPage {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly datePipe: DatePipe,
    private readonly toastService: ToastService,
    private readonly doctorService: DoctorService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
    private readonly loadingService: LoadingService,
    private readonly navController: NavController
  ) {
    this.userData = this.userService.userData;
    console.log('userData ->', this.userData);

    this.populateForm(this.userData);
  }

  userData: any;

  mode: Mode = 'ADD';

  dateOfBirthValue!: string;

  selectedImage: string | ArrayBuffer | null | undefined = null;

  dateOfBirthMaximumDate = formatISO(endOfDay(sub(new Date(), { years: 18 })));
  dateOfBirthMinimumDate = formatISO(endOfDay(sub(new Date(), { years: 118 })));

  doctorProfileForm = this.formBuilder.group({
    avatar: [TEMP_IMAGE, []],
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
    // dateOfBirth: ['', []],
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
    address: ['', []],
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
    gender: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    expertise: ['', [Validators.required]],
    boardCertification: ['', [Validators.required]],
    college: ['', [Validators.required]],
    university: ['', [Validators.required]],
    fellowship: ['', []],
    tempExperience: ['', []],
    experience: [TEMP_STRING_ARRAY, []],
    tempSkill: ['', []],
    skill: [TEMP_STRING_ARRAY, []],
    tempLanguage: ['', []],
    languages: [TEMP_STRING_ARRAY, []],
    tempSocialMedia: ['', []],
    socialMedia: [TEMP_STRING_ARRAY, []],
    day: ['', []],
    startTime: ['09:00', []],
    endTime: ['17:00', []],
    addDateTime: [TEMP_SCHEDULE_ARRAY, []],
    bio: ['', []],
  });

  get remainingScheduleDay() {
    const addDateTime = this.doctorProfileForm.controls.addDateTime.value.map(
      (item) => item.day
    );
    return DAYS.filter((day) => !addDateTime.includes(day));
  }

  populateForm(doctorData: any) {
    this.doctorProfileForm.patchValue({
      ...doctorData,
      languages: doctorData.languages || [],
      skill: doctorData.skill || [],
      experience: doctorData.experience || [],
      socialMedia: doctorData.socialMedia || [],
    });

    if (doctorData.avatar) {
      this.selectedImage = doctorData.avatar;
    }
  }

  ionViewWillEnter() {
    this.mode = (this.activatedRoute.snapshot.queryParamMap.get('mode') ??
      'ADD') as Mode;

    addCustomStylesToIonPickerInternal('startTime');
    addCustomStylesToIonPickerInternal('endTime');
  }

  addSchedule() {
    const day = this.doctorProfileForm.controls.day.value as Day;
    if (!day) {
      return;
    }
    const startTime = formatISO(
      getTimeAsDateTime(this.doctorProfileForm.controls.startTime.value)
    );
    const endTime = formatISO(
      getTimeAsDateTime(this.doctorProfileForm.controls.endTime.value)
    );
    const addDateTime = this.doctorProfileForm.controls.addDateTime.value;

    this.doctorProfileForm.patchValue({
      day: '',
      addDateTime: [
        ...addDateTime,
        { day, openTime: startTime, closeTime: endTime },
      ].sort((a, b) => DAYS_INT[a.day] - DAYS_INT[b.day]),
    });

    if (this.remainingScheduleDay.length === 0) {
      this.doctorProfileForm.controls.day.disable();
    }
  }

  removeSchedule(day: Day) {
    if (!this.doctorProfileForm.controls.day) {
      return;
    }
    const addDateTime = this.doctorProfileForm.controls.addDateTime.value;

    this.doctorProfileForm.patchValue({
      addDateTime: addDateTime.filter((item) => item.day !== day),
    });

    this.doctorProfileForm.controls.day.enable();
  }

  async addExperience() {
    const currentValue = this.doctorProfileForm.controls.tempExperience.value;
    if (!currentValue) {
      return;
    }
    const currentValues = this.doctorProfileForm.controls.experience.value;
    if (currentValues.includes(currentValue)) {
      await this.toastService.show('Experience already added.');
      this.doctorProfileForm.patchValue({
        tempExperience: '',
      });
      return;
    }
    if (currentValues.length === 3) {
      await this.toastService.show('Only 3 experiences can be added.');
      return;
    }
    const newValues = [...currentValues, currentValue];
    this.doctorProfileForm.patchValue({
      experience: newValues,
      tempExperience: '',
    });
  }

  async removeExperience(value: string) {
    const currentValues = this.doctorProfileForm.controls.experience.value;
    this.doctorProfileForm.patchValue({
      experience: currentValues.filter((item) => item !== value),
    });
  }

  async addSkill() {
    const currentValue = this.doctorProfileForm.controls.tempSkill.value;
    if (!currentValue) {
      return;
    }
    const currentValues = this.doctorProfileForm.controls.skill.value;
    if (currentValues.includes(currentValue)) {
      await this.toastService.show('Skill already added.');
      this.doctorProfileForm.patchValue({
        tempSkill: '',
      });
      return;
    }
    if (currentValues.length === 3) {
      await this.toastService.show('Only 3 skills can be added.');
      return;
    }
    const newValues = [...currentValues, currentValue];
    this.doctorProfileForm.patchValue({
      skill: newValues,
      tempSkill: '',
    });
  }
  async removeSkill(value: string) {
    const currentValues = this.doctorProfileForm.controls.skill.value;
    this.doctorProfileForm.patchValue({
      skill: currentValues.filter((item) => item !== value),
    });
  }

  async addLanguage() {
    const currentValue = this.doctorProfileForm.controls.tempLanguage.value;
    console.log('languages', currentValue);

    if (!currentValue) {
      return;
    }

    const currentValues = this.doctorProfileForm.controls.languages.value;
    if (currentValues.includes(currentValue)) {
      await this.toastService.show('Languages already added.');
      this.doctorProfileForm.patchValue({
        tempLanguage: '',
      });
      return;
    }
    if (currentValues.length === 3) {
      await this.toastService.show('Only 3 languages can be added.');
      return;
    }
    const newValues = [...currentValues, currentValue];
    this.doctorProfileForm.patchValue({
      languages: newValues,
      tempLanguage: '',
    });
  }
  async removeLanguage(value: string) {
    const currentValues = this.doctorProfileForm.controls.languages.value;
    this.doctorProfileForm.patchValue({
      languages: currentValues.filter((item) => item !== value),
    });
  }

  async addSocialMedia() {
    const currentValue = this.doctorProfileForm.controls.tempSocialMedia.value;
    if (!currentValue) {
      return;
    }
    const currentValues = this.doctorProfileForm.controls.socialMedia.value;
    if (currentValues.includes(currentValue)) {
      await this.toastService.show('Social Media link already added.');
      this.doctorProfileForm.patchValue({
        tempSocialMedia: '',
      });
      return;
    }
    if (currentValues.length === 3) {
      await this.toastService.show('Only 3 social media links can be added.');
      return;
    }
    const newValues = [...currentValues, currentValue];
    this.doctorProfileForm.patchValue({
      socialMedia: newValues,
      tempSocialMedia: '',
    });
  }
  async removeSocialMedia(value: string) {
    const currentValues = this.doctorProfileForm.controls.socialMedia.value;
    this.doctorProfileForm.patchValue({
      socialMedia: currentValues.filter((item) => item !== value),
    });
  }

  async changeImage(event: Event) {
    const target = event.target as HTMLInputElement;
    const { files } = target;
    if (!files) {
      return;
    }
    if (!files.length) {
      return;
    }
    const file = files[0];
    this.doctorProfileForm.patchValue({
      avatar: file,
    });

    fileToDataUrl(file, (progressEvent) => {
      this.selectedImage = progressEvent.target?.result;
    });
  }

  async dateOfBirthChanged(
    ionPopoverRef: IonPopover,
    ionDatetimeRef: IonDatetime
  ) {
    this.dateOfBirthValue = ionDatetimeRef.value as string;
    await ionPopoverRef.dismiss();
  }

  submit() {
    if (this.doctorProfileForm.invalid) {
      this.doctorProfileForm.markAllAsTouched();
      return;
    }
    const formValue = this.doctorProfileForm.getRawValue();
    // console.log('formValue', formValue);
    this.loadingService.show();

    const formData = new FormData();

    formData.append('firstName', formValue.firstName || '');
    formData.append('lastName', formValue.lastName || '');
    formData.append('gender', formValue.gender || '');
    formData.append('phone', formValue.phone || '');
    formData.append('email', formValue.email || '');
    formData.append('age', formValue.age || '');
    formData.append('address', formValue.address || '');
    formData.append('designation', formValue.designation || '');
    formData.append('expertise', formValue.expertise || '');
    formData.append('boardCertification', formValue.boardCertification || '');
    formData.append('college', formValue.college || '');
    formData.append('university', formValue.university || '');
    formData.append('fellowship', formValue.fellowship || '');
    formData.append('bio', formValue.bio || '');

    if (formValue.experience?.length) {
      formData.append('experience', JSON.stringify(formValue.experience));
    }

    if (formValue.skill?.length) {
      formData.append('skill', JSON.stringify(formValue.skill));
    }

    if (formValue.languages?.length) {
      formData.append('languages', JSON.stringify(formValue.languages));
    }

    if (formValue.socialMedia?.length) {
      formData.append('socialMedia', JSON.stringify(formValue.socialMedia));
    }

    // if (formValue.addDateTime?.length) {
    formData.append('addDateTime', JSON.stringify(formValue.addDateTime || []));
    // }

    if (formValue.avatar && formValue.avatar instanceof File) {
      formData.append('avatar', formValue.avatar);
    }

    this.doctorService.update(this.userData.id, formData).subscribe({
      next: async (response) => {
        console.log('response', response);
        await this.loadingService.hide();
        await this.toastService.show(response.message, 2000, 'Success', 'top');
        this.userService.userData = response.data;
        this.navController.back();
      },
      error: async (err) => {
        console.error('failed:', err);
        await this.loadingService.hide();
        await this.toastService.show(err.error.message, 2000, 'Error', 'top');
      },
    });
  }
}
