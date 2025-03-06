import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-patient-profile',
  templateUrl: 'patient-profile.page.html',
  styleUrls: ['patient-profile.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule, HeaderComponent, TabsComponent],
})
export class PatientProfilePage {}
