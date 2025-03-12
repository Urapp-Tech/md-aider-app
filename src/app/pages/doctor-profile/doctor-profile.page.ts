import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

const TEMP_IMAGE: File | null = null;
const TEMP_STRING_ARRAY: Array<string> = [];

@Component({
  selector: 'app-doctor-profile',
  templateUrl: 'doctor-profile.page.html',
  styleUrls: ['doctor-profile.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule, HeaderComponent, TabsComponent],
})
export class DoctorProfilePage {
  ionViewWillEnter() {}
}
