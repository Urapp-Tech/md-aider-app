import { Component } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { timer } from 'rxjs';
import { durationToMilliseconds } from 'src/app/utilities/duration-to-milliseconds';
import { SubscriptionSink } from 'src/app/utilities/subscription-sink';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';
import { UserService } from 'src/app/services/user.service';
import { CapacitorStorageService } from 'src/app/services/capacitor-storage.service';

@Component({
  selector: 'app-splash',
  templateUrl: 'splash.page.html',
  styleUrls: ['splash.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule],
})
export class SplashPage {
  constructor(
    private readonly navController: NavController,
    private readonly userService: UserService,
    private readonly capacitorStorageService: CapacitorStorageService
  ) {}

  subscriptions = new SubscriptionSink();

  ionViewWillEnter() {
    this.subscriptions.sink = timer(
      durationToMilliseconds({ seconds: 3 })
    ).subscribe(async () => {
      const token = await this.capacitorStorageService.getItem('USER_DATA');
      const activeUser = this.userService.userData;

      console.log('token', token, activeUser);
      if (token || activeUser) {
        await this.navController.navigateRoot('/home', { replaceUrl: true });
        return;
      }
      await this.navController.navigateRoot('/sign-in', { replaceUrl: true });
    });
  }

  ionViewWillLeave() {
    this.subscriptions.unsubscribe();
  }
}
