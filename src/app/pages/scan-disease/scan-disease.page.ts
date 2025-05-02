import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { LoadingService } from 'src/app/services/loading.service';
import { ScanDiseaseService } from 'src/app/services/scan-disease.service';
import { ToastService } from 'src/app/services/toast.service';
import { imageAllowedTypes } from 'src/app/utilities/file-types';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-scan-disease',
  templateUrl: 'scan-disease.page.html',
  styleUrls: ['scan-disease.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    SharedModule,
    HeaderComponent,
    TabsComponent,
    CommonModule,
  ],
})
export class ScanDiseasePage {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly scanDiseaseService: ScanDiseaseService,
    private cameraService: CameraService
  ) {}

  uploadedImageUrl: string | null = null;
  uploadedImageFile: File | null = null;
  results?: { name: string; percentage: number };
  imageDataUrl: string | null = null;

  async openCamera() {
    const imageResult = await this.cameraService.takePhoto();
    if (!imageResult) return;

    console.log('imageResult', imageResult);

    this.uploadedImageFile = imageResult.file;
    this.uploadedImageUrl = imageResult.dataUrl;
  }

  handleImageUpload(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    if (!imageAllowedTypes.includes(file.type)) {
      this.toastService.show(
        'Invalid file type. Only JPG, JPEG, PNG allowed.',
        2000,
        'Error',
        'top'
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedImageUrl = reader.result as string;
    };
    this.uploadedImageFile = file;
    reader.readAsDataURL(file);
  }

  async scanDisease() {
    await this.loadingService.show();

    const formData = new FormData();
    formData.append('avatar', this.uploadedImageFile as File);
    if (this.uploadedImageFile)
      this.scanDiseaseService.create(formData).subscribe({
        next: async (response) => {
          await this.toastService.show(
            response.message,
            2000,
            'Success',
            'top'
          );
          await this.loadingService.hide();
          this.results = response.data.results;
        },
        error: async (err) => {
          await this.loadingService.hide();
          await this.toastService.show(err.error.message, 2000, 'Error', 'top');
          console.error('Service failed:', err);
        },
      });
  }
}
