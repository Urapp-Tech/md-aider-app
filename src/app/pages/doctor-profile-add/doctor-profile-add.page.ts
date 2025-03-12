import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonDatetime, IonPopover } from '@ionic/angular/standalone';
import { endOfDay, formatISO, sub } from 'date-fns';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { ToastService } from 'src/app/services/toast.service';
import { addCustomStylesToIonPickerInternal } from 'src/app/utilities/add-custom-styles-to-ion-picker-internal';
import { getTimeAsDateTime } from 'src/app/utilities/date-helpers';
import fileToDataUrl from 'src/app/utilities/file-to-data-url';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

const TEMP_IMAGE: File | null = null;
const DAYS_INT = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;
const DAYS = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
] as const;
const TEMP_STRING_ARRAY: Array<string> = [];
type Day = (typeof DAYS)[number];
type Schedule = {
  day: Day;
  startTime: string;
  endTime: string;
};
const TEMP_SCHEDULE_ARRAY: Array<Schedule> = [];

type Mode = 'ADD' | 'EDIT';

@Component({
  selector: 'app-doctor-profile-add',
  templateUrl: 'doctor-profile-add.page.html',
  styleUrls: ['doctor-profile-add.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule, HeaderComponent, TabsComponent],
})
export class DoctorProfileAddPage {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly datePipe: DatePipe,
    private readonly toastService: ToastService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  mode: Mode = 'ADD';

  dateOfBirthValue!: string;

  selectedImage: string | ArrayBuffer | null | undefined = null;

  dateOfBirthMaximumDate = formatISO(endOfDay(sub(new Date(), { years: 18 })));
  dateOfBirthMinimumDate = formatISO(endOfDay(sub(new Date(), { years: 118 })));

  doctorProfileForm = this.formBuilder.group({
    image: [TEMP_IMAGE, []],
    firstName: ['', []],
    lastName: ['', []],
    dateOfBirth: ['', []],
    phone: ['', []],
    email: ['', []],
    address: ['', []],
    gender: ['', []],
    designation: ['', []],
    expertise: ['', []],
    boardCertification: ['', []],
    college: ['', []],
    university: ['', []],
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
    schedule: [TEMP_SCHEDULE_ARRAY, []],
  });

  get remainingScheduleDay() {
    const schedule = this.doctorProfileForm.controls.schedule.value.map(
      (item) => item.day
    );
    return DAYS.filter((day) => !schedule.includes(day));
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
    const schedule = this.doctorProfileForm.controls.schedule.value;

    this.doctorProfileForm.patchValue({
      day: '',
      schedule: [...schedule, { day, startTime, endTime }].sort(
        (a, b) => DAYS_INT[a.day] - DAYS_INT[b.day]
      ),
    });

    if (this.remainingScheduleDay.length === 0) {
      this.doctorProfileForm.controls.day.disable();
    }
  }

  removeSchedule(day: Day) {
    if (!this.doctorProfileForm.controls.day) {
      return;
    }
    const schedule = this.doctorProfileForm.controls.schedule.value;

    this.doctorProfileForm.patchValue({
      schedule: schedule.filter((item) => item.day !== day),
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
    if (currentValues.length === 4) {
      await this.toastService.show('Only 4 languages can be added.');
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
    if (currentValues.length === 4) {
      await this.toastService.show('Only 4 social media links can be added.');
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
      image: file,
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
  }
}
