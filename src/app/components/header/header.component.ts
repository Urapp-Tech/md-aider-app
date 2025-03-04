import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MenuController } from '@ionic/angular/standalone';
import { ionGoBack } from 'src/app/utilities/ion-go-back';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicSharedModule, TitleCasePipe],
})
export class HeaderComponent {
  constructor(private readonly menuController: MenuController) {}

  @Input() defaultHref = '/dashboard';

  goBack = ionGoBack();

  toggleMenu() {
    return this.menuController.toggle();
  }
}
