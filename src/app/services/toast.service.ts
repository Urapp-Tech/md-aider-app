import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly toastController: ToastController) {}

  async show(
    message: string,
    duration = 2000,
    header = '',
    position: 'top' | 'bottom' | 'middle' | undefined = 'top'
  ) {
    const toastOptions: ToastOptions = {
      message,
      duration,
      header,
      position,
    };
    const toast = await this.toastController.create(toastOptions);
    await toast.present();
  }
}
