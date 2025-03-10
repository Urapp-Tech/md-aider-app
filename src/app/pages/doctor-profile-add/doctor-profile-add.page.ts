import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { IonDatetime, IonPopover } from '@ionic/angular/standalone';
import { endOfDay, formatISO, set, sub } from 'date-fns';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { ToastService } from 'src/app/services/toast.service';
import fileToDataUrl from 'src/app/utilities/file-to-data-url';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

const TEMP_IMAGE: File | null = null;
const TEMP_STRING_ARRAY: Array<string> = [];

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
    private readonly toastService: ToastService
  ) {}

  dateOfBirthValue!: string;

  selectedImage: string | ArrayBuffer | null | undefined = null;

  dateOfBirthMaximumDate = formatISO(endOfDay(sub(new Date(), { years: 18 })));
  dateOfBirthMinimumDate = formatISO(endOfDay(sub(new Date(), { years: 118 })));

  addDoctorProfileForm = this.formBuilder.group({
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
    addDateTime: [new Date(), []],
  });

  async addExperience() {
    const currentValue =
      this.addDoctorProfileForm.controls.tempExperience.value;
    if (!currentValue) {
      return;
    }
    const currentValues = this.addDoctorProfileForm.controls.experience.value;
    if (currentValues.includes(currentValue)) {
      await this.toastService.show('Experience already added.');
      this.addDoctorProfileForm.patchValue({
        tempExperience: '',
      });
      return;
    }
    if (currentValues.length === 3) {
      await this.toastService.show('Only 3 experiences can be added.');
      return;
    }
    const newValues = [...currentValues, currentValue];
    this.addDoctorProfileForm.patchValue({
      experience: newValues,
      tempExperience: '',
    });
  }

  async removeExperience(value: string) {
    const currentValues = this.addDoctorProfileForm.controls.experience.value;
    this.addDoctorProfileForm.patchValue({
      experience: currentValues.filter((item) => item !== value),
    });
  }

  async addSkill() {
    const currentValue = this.addDoctorProfileForm.controls.tempSkill.value;
    if (!currentValue) {
      return;
    }
    const currentValues = this.addDoctorProfileForm.controls.skill.value;
    if (currentValues.includes(currentValue)) {
      await this.toastService.show('Skill already added.');
      this.addDoctorProfileForm.patchValue({
        tempSkill: '',
      });
      return;
    }
    if (currentValues.length === 3) {
      await this.toastService.show('Only 3 skills can be added.');
      return;
    }
    const newValues = [...currentValues, currentValue];
    this.addDoctorProfileForm.patchValue({
      skill: newValues,
      tempSkill: '',
    });
  }
  async removeSkill(value: string) {
    const currentValues = this.addDoctorProfileForm.controls.skill.value;
    this.addDoctorProfileForm.patchValue({
      skill: currentValues.filter((item) => item !== value),
    });
  }

  async addLanguage() {
    const currentValue = this.addDoctorProfileForm.controls.tempLanguage.value;
    if (!currentValue) {
      return;
    }

    const currentValues = this.addDoctorProfileForm.controls.languages.value;
    if (currentValues.includes(currentValue)) {
      await this.toastService.show('Languages already added.');
      this.addDoctorProfileForm.patchValue({
        tempLanguage: '',
      });
      return;
    }
    if (currentValues.length === 4) {
      await this.toastService.show('Only 4 languages can be added.');
      return;
    }
    const newValues = [...currentValues, currentValue];
    this.addDoctorProfileForm.patchValue({
      languages: newValues,
      tempLanguage: '',
    });
  }
  async removeLanguage(value: string) {
    const currentValues = this.addDoctorProfileForm.controls.languages.value;
    this.addDoctorProfileForm.patchValue({
      languages: currentValues.filter((item) => item !== value),
    });
  }

  async addSocialMedia() {
    const currentValue =
      this.addDoctorProfileForm.controls.tempSocialMedia.value;
    if (!currentValue) {
      return;
    }
    const currentValues = this.addDoctorProfileForm.controls.socialMedia.value;
    if (currentValues.includes(currentValue)) {
      await this.toastService.show('Social Media already added.');
      this.addDoctorProfileForm.patchValue({
        tempSocialMedia: '',
      });
      return;
    }
    if (currentValues.length === 4) {
      await this.toastService.show('Only 4 socialMedia can be added.');
      return;
    }
    const newValues = [...currentValues, currentValue];
    this.addDoctorProfileForm.patchValue({
      socialMedia: newValues,
      tempSocialMedia: '',
    });
  }
  async removeSocialMedia(value: string) {
    const currentValues = this.addDoctorProfileForm.controls.socialMedia.value;
    this.addDoctorProfileForm.patchValue({
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
    this.addDoctorProfileForm.patchValue({
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
    const transformedToDate = this.datePipe.transform(
      this.dateOfBirthValue,
      'dd/MM/yyyy'
    ) as string;
    const tempToDate = transformedToDate.split('/').map(Number);
    const fromDate = formatISO(
      endOfDay(
        set(new Date(), {
          date: tempToDate[0],
          month: tempToDate[1] - 1,
          year: tempToDate[2],
        })
      )
    );
  }

  submit() {
    if (this.addDoctorProfileForm.invalid) {
      this.addDoctorProfileForm.markAllAsTouched();
      return;
    }
  }

  ionViewWillEnter() {}
}
