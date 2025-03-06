import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-patients-log',
  templateUrl: 'patients-log.page.html',
  styleUrls: ['patients-log.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule, HeaderComponent, TabsComponent],
})
export class PatientsLogPage {
  logs = [
    {
      id: 620,
      firstName: 'Keith',
      lastName: 'Howell',
      age: 33,
      gender: 'Female',
      phoneNumber: '0333-7654321',
      date: '15-03-2024',
    },
    {
      id: 619,
      firstName: 'Naomi',
      lastName: 'Wintheiser',
      age: 28,
      gender: 'Male',
      phoneNumber: '0345-9876543',
      date: '05-12-2023',
    },
    {
      id: 618,
      firstName: 'Eli',
      lastName: 'Schmeler',
      age: 42,
      gender: 'Female',
      phoneNumber: '0321-1122334',
      date: '21-08-2024',
    },
    {
      id: 617,
      firstName: 'Shea',
      lastName: 'Murphy',
      age: 25,
      gender: 'Male',
      phoneNumber: '0312-5544332',
      date: '03-06-2023',
    },
    {
      id: 616,
      firstName: 'Doug',
      lastName: 'Sauer',
      age: 39,
      gender: 'Female',
      phoneNumber: '0334-8877665',
      date: '18-10-2024',
    },
    {
      id: 615,
      firstName: 'Holly',
      lastName: 'Kautzer',
      age: 22,
      gender: 'Male',
      phoneNumber: '0313-2233445',
      date: '31-01-2024',
    },
    {
      id: 614,
      firstName: 'Zackary',
      lastName: 'Schmeler',
      age: 35,
      gender: 'Female',
      phoneNumber: '0346-6577889',
      date: '12-07-2023',
    },
    {
      id: 613,
      firstName: 'Makenzie',
      lastName: 'Kessler',
      age: 31,
      gender: 'Male',
      phoneNumber: '0320-4433221',
      date: '25-04-2024',
    },
    {
      id: 612,
      firstName: 'Jayson',
      lastName: 'Kuhn',
      age: 29,
      gender: 'Female',
      phoneNumber: '0311-9988776',
      date: '09-11-2023',
    },
    {
      id: 611,
      firstName: 'Gussie',
      lastName: 'Cronin',
      age: 45,
      gender: 'Male',
      phoneNumber: '0332-3322110',
      date: '17-02-2024',
    },
  ];
}
