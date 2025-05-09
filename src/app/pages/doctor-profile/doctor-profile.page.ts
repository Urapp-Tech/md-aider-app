import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class DoctorProfilePage implements OnInit {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly navController: NavController,
    private readonly userService: UserService
  ) {
    this.userData = this.userService.userData;
    console.log('userData', this.userData);
  }

  userData: any;

  socialIconMap: any = {
    facebook: 'assets/icons/icon-facebook.svg',
    instagram: 'assets/icons/icon-instagram.svg',
    linkedin: 'assets/icons/icon-linkedin.svg',
    whatsapp: 'assets/icons/icon-whatsapp.svg',
  };

  parsedSocialLinks: { platform: string; icon: string; url: string }[] = [];

  getParsedSocialLinks(): { platform: string; icon: string; url: string }[] {
    const urls = this.userData?.socialMedia || [];

    return urls
      .map((url: string) => {
        if (url.includes('facebook.com')) {
          return {
            platform: 'facebook',
            icon: this.socialIconMap.facebook,
            url,
          };
        } else if (url.includes('instagram.com')) {
          return {
            platform: 'instagram',
            icon: this.socialIconMap.instagram,
            url,
          };
        } else if (url.includes('linkedin.com')) {
          return {
            platform: 'linkedin',
            icon: this.socialIconMap.linkedin,
            url,
          };
        } else if (url.includes('whatsapp.com') || url.includes('wa.me')) {
          return {
            platform: 'whatsapp',
            icon: this.socialIconMap.whatsapp,
            url,
          };
        }
        return null;
      })
      .filter((entry: any) => entry !== null) as {
      platform: string;
      icon: string;
      url: string;
    }[];
  }

  ngOnInit() {
    this.parsedSocialLinks = this.getParsedSocialLinks();
  }
  navigateToDocProfileEdit() {
    return this.navController.navigateRoot(['/doctor-profile-edit']);
  }
}
