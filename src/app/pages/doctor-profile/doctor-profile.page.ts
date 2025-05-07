import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { GoogleMapComponent } from 'src/app/components/google-map/google-map.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { UserService } from 'src/app/services/user.service';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

const TEMP_IMAGE: File | null = null;
const TEMP_STRING_ARRAY: Array<string> = [];

@Component({
  selector: 'app-doctor-profile',
  templateUrl: 'doctor-profile.page.html',
  styleUrls: ['doctor-profile.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    SharedModule,
    HeaderComponent,
    TabsComponent,
    CommonModule,
    GoogleMapComponent,
  ],
})
export class DoctorProfilePage {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly navController: NavController,
    private readonly userService: UserService
  ) {
    this.userData = this.userService.userData;
    console.log('userData', this.userData);
  }

  userData: any;

  navigateToDocProfileEdit() {
    return this.navController.navigateRoot(['/doctor-profile-edit']);
  }
}
