import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonDatetime, IonPopover } from '@ionic/angular/standalone';
import { endOfDay, format } from 'date-fns';
import { FieldErrorMessageComponent } from 'src/app/components/field-error-message/field-error-message.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { LoadingService } from 'src/app/services/loading.service';
import { PatientService } from 'src/app/services/patient.service';
import { ToastService } from 'src/app/services/toast.service';
import { imageAndDocsAllowedTypes } from 'src/app/utilities/file-types';
import { PATTERN } from 'src/app/utilities/form-patterns';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';
import { NavController } from '@ionic/angular/standalone';
import { BackHeaderComponent } from 'src/app/components/back-title-header/back-title-header.component';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-patient-visit-add',
  templateUrl: 'patient-visit-add.page.html',
  styleUrls: ['patient-visit-add.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    SharedModule,
    HeaderComponent,
    TabsComponent,
    CommonModule,
    FieldErrorMessageComponent,
    BackHeaderComponent,
  ],
})
export class PatientVisitAddPage implements OnInit {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService,
    private readonly patientService: PatientService,
    private readonly navController: NavController,
    private cameraService: CameraService
  ) {}

  @ViewChild('imageInput', { static: false })
  imageInputRef!: ElementRef<HTMLInputElement>;

  durationStartValue!: string;
  durationEndValue!: string;
  followUpValue!: string;
  pdurationStartValue!: string;
  pdurationEndValue!: string;
  patientId: string | null = null;
  patient: any;
  previousVisitList: any;
  prescriptions: any[] = [];
  selectedFiles: File[] = [];

  durationEndMinimumDate = new Date().toISOString();

  tab:
    | 'PRESENTING_COMPLAINTS'
    | 'PRESCRIPTION'
    | 'LAB_TEST'
    | 'SCAN'
    | 'PREVIOUS_VISITS' = 'PRESENTING_COMPLAINTS';

  addPatientVisitForm = this.formBuilder.group({
    presentingComplaints: this.formBuilder.group({
      medicalNote: [
        '',
        [
          Validators.required,
          Validators.pattern(PATTERN.CHAR_NUM_DASH),
          Validators.maxLength(250),
        ],
      ],
      chiefPresentingComplaints: [
        '',
        [
          Validators.required,
          Validators.pattern(PATTERN.CHAR_NUM_DASH),
          Validators.maxLength(100),
        ],
      ],
      typeOfComplaint: ['new', []],
      durationStart: ['', Validators.required],
      durationEnd: ['', Validators.required],
      followUp: ['', Validators.required],
      symptoms: [
        '',
        [
          Validators.required,
          Validators.pattern(PATTERN.CHAR_NUM_DASH),
          Validators.maxLength(100),
        ],
      ],
      diagnose: [
        '',
        [
          Validators.required,
          Validators.pattern(PATTERN.CHAR_NUM_DASH),
          Validators.maxLength(100),
        ],
      ],
      differentialDiagnosis: [
        '',
        [
          Validators.required,
          Validators.pattern(PATTERN.CHAR_NUM_DASH),
          Validators.maxLength(100),
        ],
      ],
    }),
    prescription: this.formBuilder.group({
      drugName: ['', []],
      dosageForm: ['', []],
      strength: ['', []],
      dose: ['', []],
      pdurationStart: ['', []],
      pdurationEnd: ['', []],
    }),
    labTest: this.formBuilder.group({
      cbc: [false, []],
      uce: [false, []],
      lft: [false, []],
      urineDr: [false, []],
      biopsy: [false, []],
      radiology: [false, []],
      otherLabsDesc: ['', []],
      labMedia: this.formBuilder.array([]),
    }),
    scan: this.formBuilder.group({
      scanMedia: this.formBuilder.array([]),
    }),
  });
  get labTestValues() {
    return this.addPatientVisitForm.get('labTest')?.value;
  }

  get scanMedia(): FormArray {
    return this.addPatientVisitForm.get('scan.scanMedia') as FormArray;
  }

  get medicalNoteControl(): FormControl {
    return this.addPatientVisitForm.get(
      'presentingComplaints.medicalNote'
    ) as FormControl;
  }
  get chiefPresentingComplaintsControl(): FormControl {
    return this.addPatientVisitForm.get(
      'presentingComplaints.chiefPresentingComplaints'
    ) as FormControl;
  }
  get symptomsControl(): FormControl {
    return this.addPatientVisitForm.get(
      'presentingComplaints.symptoms'
    ) as FormControl;
  }
  get diagnoseControl(): FormControl {
    return this.addPatientVisitForm.get(
      'presentingComplaints.diagnose'
    ) as FormControl;
  }
  get differentialDiagnosisControl(): FormControl {
    return this.addPatientVisitForm.get(
      'presentingComplaints.differentialDiagnosis'
    ) as FormControl;
  }
  get durationStartControl(): FormControl {
    return this.addPatientVisitForm.get(
      'presentingComplaints.durationStart'
    ) as FormControl;
  }
  get durationEndControl(): FormControl {
    return this.addPatientVisitForm.get(
      'presentingComplaints.durationEnd'
    ) as FormControl;
  }
  get followUpControl(): FormControl {
    return this.addPatientVisitForm.get(
      'presentingComplaints.followUp'
    ) as FormControl;
  }

  // for lab media
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      const files = Array.from(input.files);

      // Validate the file types
      const validFiles = files.filter((file) =>
        imageAndDocsAllowedTypes.includes(file.type)
      );
      if (validFiles.length !== files.length) {
        this.toastService.show(
          'Only PNG, JPG, and JPEG files are allowed.',
          2000,
          'Error',
          'top'
        );
        input.value = ''; // Reset the input field
        return; // Exit if some files are not valid
      }

      // Update selectedFiles array and form control
      this.selectedFiles = validFiles;
      const labMediaArray: any =
        this.addPatientVisitForm.get('labTest.labMedia');
      validFiles.forEach((file) => {
        labMediaArray.push(this.formBuilder.control(file));
      });
    }
  }

  // for scan media
  createFileUpload(file: File | null = null, preview: string = ''): FormGroup {
    return this.formBuilder.group({
      file: [file],
      preview: [preview],
      caption: [''],
    });
  }
  triggerImageUpload() {
    this.imageInputRef.nativeElement.click();
  }

  handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          this.scanMedia.push(this.createFileUpload(file, result));
        }
      };

      reader.readAsDataURL(file);
    }
    input.value = '';
  }

  removeScanMedia(index: number) {
    this.scanMedia.removeAt(index);
  }

  // scan camera capture
  async captureFromCamera() {
    if (this.scanMedia.length >= 3) {
      return this.toastService.show(
        'limit of 3 photos exceeded',
        2000,
        'Error',
        'top'
      );
    }
    const result = await this.cameraService.takePhoto();
    if (result) {
      const { file, dataUrl } = result;
      this.scanMedia.push(this.createFileUpload(file, dataUrl));
    }
  }

  // -- //

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

  async followUpChanged(
    ionPopoverRef: IonPopover,
    ionDatetimeRef: IonDatetime
  ) {
    this.followUpValue = ionDatetimeRef.value as string;
    await ionPopoverRef.dismiss();
  }

  async pdurationStartChanged(
    ionPopoverRef: IonPopover,
    ionDatetimeRef: IonDatetime
  ) {
    this.pdurationStartValue = ionDatetimeRef.value as string;
    await ionPopoverRef.dismiss();
  }

  async pdurationEndChanged(
    ionPopoverRef: IonPopover,
    ionDatetimeRef: IonDatetime
  ) {
    this.pdurationEndValue = ionDatetimeRef.value as string;
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

  backTab() {
    if (this.tab === 'PRESCRIPTION') {
      this.tab = 'PRESENTING_COMPLAINTS';
      return;
    }
    if (this.tab === 'LAB_TEST') {
      this.tab = 'PRESCRIPTION';
      return;
    }
    if (this.tab === 'SCAN') {
      this.tab = 'LAB_TEST';
      return;
    }
    if (this.tab === 'PREVIOUS_VISITS') {
      this.tab = 'SCAN';
      return;
    }
  }

  ngOnInit() {
    const navState = history.state;
    this.patientId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('PAPAPA', navState);

    if (navState && navState.patient) {
      this.patient = navState.patient;
      this.previousVisitList = navState.patientList;
      this.tab = 'PRESENTING_COMPLAINTS';
    }
  }

  async onAddPrescription() {
    const prescriptionFormGroup = this.addPatientVisitForm.get(
      'prescription'
    ) as FormGroup;

    if (prescriptionFormGroup.invalid) {
      await this.toastService.show(
        'Please fill all prescription fields',
        2000,
        'Error',
        'top'
      );
      prescriptionFormGroup.markAllAsTouched();
      return;
    }

    const prescriptionData = prescriptionFormGroup.value;

    // Optionally check that no field is empty (manual validation)
    const allFilled = Object.values(prescriptionData).every(
      (val) => val !== null && val !== ''
    );
    if (!allFilled) {
      await this.toastService.show(
        'All prescription fields must be filled',
        2000,
        'Error',
        'top'
      );
      return;
    }

    this.prescriptions.push({ ...prescriptionData });

    // Optionally reset the prescription form after adding
    prescriptionFormGroup.reset();
    this.addPatientVisitForm.get('prescription.pdurationStart')?.reset();
    this.pdurationStartValue = '';
    this.addPatientVisitForm.get('prescription.pdurationEnd')?.reset();
    this.pdurationEndValue = '';
    // prescriptionFormGroup.patchValue({
    //   pdurationStartValue: '',
    //   pdurationEndValue: '',
    // });

    console.log('Prescriptions Array:', this.prescriptions);
  }

  removePrescription(index: number) {
    this.prescriptions.splice(index, 1);
  }

  formatDate(date: string): string {
    return format(new Date(date), 'dd MM yyyy');
  }

  switchTab(
    tabName:
      | 'PRESENTING_COMPLAINTS'
      | 'PRESCRIPTION'
      | 'LAB_TEST'
      | 'SCAN'
      | 'PREVIOUS_VISITS'
  ) {
    this.tab = tabName;
  }

  markGroupTouched(group: FormGroup) {
    Object.values(group.controls).forEach((control) => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  }

  submit() {
    if (this.addPatientVisitForm.invalid) {
      this.addPatientVisitForm.markAllAsTouched();

      const tabControls = this.addPatientVisitForm.controls;
      if (tabControls['presentingComplaints'].invalid) {
        this.switchTab('PRESENTING_COMPLAINTS');
        this.markGroupTouched(tabControls['presentingComplaints'] as FormGroup);
      }
      return;
    }
    this.loadingService.show();

    const formValue = this.addPatientVisitForm.getRawValue();
    console.log('formValue', formValue);

    const formData = new FormData();
    formData.append('patient', this.patientId || '');
    formData.append('medicalNote', formValue.presentingComplaints.medicalNote);
    formData.append(
      'chiefComplaint',
      formValue.presentingComplaints.chiefPresentingComplaints
    );
    formData.append(
      'complaintType',
      formValue.presentingComplaints.typeOfComplaint
    );
    formData.append('symptoms', formValue.presentingComplaints.symptoms);
    formData.append('diagnose', formValue.presentingComplaints.diagnose);
    formData.append(
      'differentialDiagnose',
      formValue.presentingComplaints.differentialDiagnosis
    );
    formData.append(
      'complaintDurationStartTime',
      formValue.presentingComplaints.durationStart
        ? format(
            new Date(formValue.presentingComplaints.durationStart),
            'yyyy-MM-dd HH:mm:ss'
          )
        : ''
    );
    formData.append(
      'complaintDurationEndTime',
      formValue.presentingComplaints.durationEnd
        ? format(
            new Date(formValue.presentingComplaints.durationEnd),
            'yyyy-MM-dd HH:mm:ss'
          )
        : ''
    );
    formData.append(
      'complaintFollowUpTime',
      formValue.presentingComplaints.followUp
        ? format(
            new Date(formValue.presentingComplaints.followUp),
            'yyyy-MM-dd HH:mm:ss'
          )
        : ''
    );
    if (this.prescriptions)
      formData.append('prescriptions', JSON.stringify(this.prescriptions));
    formData.append('cbc', String(formValue.labTest.cbc || false));
    formData.append('uce', String(formValue.labTest.uce || false));
    formData.append('lft', String(formValue.labTest.lft || false));
    formData.append('urineDr', String(formValue.labTest.urineDr || false));
    formData.append('biopsy', String(formValue.labTest.biopsy || false));
    formData.append('radiology', String(formValue.labTest.radiology || false));
    formData.append('otherLabsDesc', formValue.labTest.otherLabsDesc || '');
    if (formValue.labTest?.labMedia) {
      formValue.labTest?.labMedia?.forEach((labfile: any) =>
        formData.append(`lab`, labfile)
      );
    }
    if (formValue?.scan?.scanMedia) {
      formValue.scan.scanMedia.forEach((item: any, index: number) => {
        if (item.file) {
          formData.append('avatar', item.file);
        }
        if (item.caption) {
          formData.append(`imgCaption${index + 1}`, item.caption);
        }
      });
    }

    this.patientService.createPatientVisit(formData).subscribe({
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

  ionViewWillEnter() {}
}
