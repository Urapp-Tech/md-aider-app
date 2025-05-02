import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';

@Component({
  selector: 'app-back-header',
  templateUrl: './back-title-header.component.html',
  styleUrls: ['./back-title-header.component.scss'],
  standalone: true,
  imports: [IonicSharedModule],
})
export class BackHeaderComponent {
  constructor(private location: Location) {}

  @Input() title: string = 'Title';

  goBack() {
    this.location.back();
  }
}
