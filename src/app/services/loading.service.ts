import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private readonly loadingController: LoadingController) {}

  private loadingCount = 0;

  async show() {
    this.loadingCount += 1;
    if (this.loadingCount === 1) {
      const ionLoadingElement = await this.loadingController.create({
        message: 'Please Wait ...',
      });
      await ionLoadingElement.present();
    }
  }

  async hide() {
    this.loadingCount = Math.max(this.loadingCount - 1, 0);
    if (this.loadingCount === 0) {
      await this.dismiss();
      setTimeout(async () => {
        await this.dismiss();
      }, 0);
    }
  }

  async getTop() {
    return this.loadingController.getTop();
  }

  private async dismiss() {
    const ionLoadingElement = await this.loadingController.getTop();
    if (ionLoadingElement) await this.loadingController.dismiss();
  }
}
