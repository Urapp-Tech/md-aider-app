// src/app/services/camera.service.ts
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  constructor() {}

  async takePhoto(): Promise<{ file: File; dataUrl: string } | null> {
    try {
      const image: any = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      const dataUrl = image.dataUrl;
      const blob = await fetch(dataUrl).then((res) => res.blob());
      const file = new File([blob], 'camera-image.jpg', { type: blob.type });
      return { file, dataUrl };
    } catch (error) {
      console.error('Camera error:', error);
      return null;
    }
  }
}
