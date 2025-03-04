import { Component } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { SubscriptionSink } from 'src/app/utilities/subscription-sink';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-splash',
  templateUrl: 'splash.page.html',
  styleUrls: ['splash.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule],
})
export class SplashPage {
  constructor(private readonly navController: NavController) {}

  subscriptions = new SubscriptionSink();

  // ionViewWillEnter() {
  //   this.subscriptions.sink = timer(
  //     durationToMilliseconds({ seconds: 3 })
  //   ).subscribe(async () => {
  //     await this.navController.navigateRoot('/onboarding');
  //   });
  // }

  ionViewWillLeave() {
    this.subscriptions.unsubscribe();
  }
}
