import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-scan-disease',
  templateUrl: 'scan-disease.page.html',
  styleUrls: ['scan-disease.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule, HeaderComponent, TabsComponent],
})
export class ScanDiseasePage {
  constructor() {}
}
