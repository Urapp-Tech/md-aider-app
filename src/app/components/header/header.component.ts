import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular/standalone';
import { CapacitorStorageService } from 'src/app/services/capacitor-storage.service';
import { UserService } from 'src/app/services/user.service';
import { ionGoBack } from 'src/app/utilities/ion-go-back';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicSharedModule, CommonModule],
})
export class HeaderComponent {
  constructor(
    private readonly menuController: MenuController,
    private readonly userService: UserService,
    private readonly navController: NavController
  ) {
    this.userData = this.userService.userData;
  }

  @Input() defaultHref = '/dashboard';
  userData: any;
  showDropdown = false;

  goBack = ionGoBack();

  toggleMenu() {
    return this.menuController.toggle();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  viewProfile() {
    return this.navController.navigateRoot(['/doctor-profile']);
  }

  logout() {
    this.userService.logout();
  }
}
