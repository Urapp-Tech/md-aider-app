import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cameraOutline,
  imagesOutline,
  add,
  addCircle,
  arrowBack,
  arrowRedo,
  attach,
  barcodeOutline,
  build,
  calendarOutline,
  call,
  camera,
  chatboxEllipsesOutline,
  checkmark,
  checkmarkCircle,
  checkmarkCircleOutline,
  chevronDown,
  chevronForward,
  chevronBack,
  close,
  construct,
  createOutline,
  documentsOutline,
  documentTextOutline,
  download,
  ellipse,
  ellipsisHorizontalCircleOutline,
  ellipsisVertical,
  eye,
  eyeOff,
  eyeOffOutline,
  eyeOutline,
  gitBranchOutline,
  gridOutline,
  helpCircleOutline,
  home,
  idCardOutline,
  imageOutline,
  leaf,
  lockClosed,
  logoFacebook,
  logOutOutline,
  logoWhatsapp,
  mail,
  mailOutline,
  menu,
  openOutline,
  peopleOutline,
  person,
  personAddOutline,
  personCircle,
  personOutline,
  phonePortraitOutline,
  play,
  playSkipForward,
  playSkipForwardCircle,
  readerOutline,
  remove,
  search,
  send,
  settings,
  square,
  stopwatchOutline,
  timeOutline,
  timerOutline,
  trash,
  trashOutline,
  triangle,
  ellipseOutline,
  syncCircleOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      logOutOutline,
      personCircleOutline,
      syncCircleOutline,
      ellipseOutline,
      cameraOutline,
      imagesOutline,
      add,
      addCircle,
      arrowBack,
      arrowRedo,
      attach,
      barcodeOutline,
      build,
      calendarOutline,
      call,
      camera,
      chatboxEllipsesOutline,
      checkmark,
      checkmarkCircle,
      checkmarkCircleOutline,
      chevronDown,
      chevronForward,
      chevronBack,
      close,
      construct,
      createOutline,
      documentsOutline,
      documentTextOutline,
      download,
      ellipse,
      ellipsisHorizontalCircleOutline,
      ellipsisVertical,
      eye,
      eyeOff,
      eyeOffOutline,
      eyeOutline,
      gitBranchOutline,
      gridOutline,
      helpCircleOutline,
      home,
      idCardOutline,
      imageOutline,
      leaf,
      lockClosed,
      logoFacebook,
      logoWhatsapp,
      mail,
      mailOutline,
      menu,
      openOutline,
      peopleOutline,
      person,
      personAddOutline,
      personCircle,
      personOutline,
      phonePortraitOutline,
      play,
      playSkipForward,
      playSkipForwardCircle,
      readerOutline,
      remove,
      search,
      send,
      settings,
      square,
      stopwatchOutline,
      timeOutline,
      timerOutline,
      trash,
      trashOutline,
      triangle,
    });
  }
}
