import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule, HeaderComponent],
})
export class HomePage {
  constructor() {}
}
