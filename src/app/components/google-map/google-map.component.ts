import { Component, AfterViewInit, Input } from '@angular/core';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';

declare const google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
  standalone: true,
  imports: [IonicSharedModule],
})
export class GoogleMapComponent implements AfterViewInit {
  @Input() address: string | null = null;

  defaultLatLng = { lat: 30.3753, lng: 69.3451 }; // Pakistan

  ngAfterViewInit() {
    if (this.address) {
      this.geocodeAddress(this.address);
    } else {
      this.initMap(this.defaultLatLng);
    }
  }

  geocodeAddress(address: string) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        this.initMap({ lat: location.lat(), lng: location.lng() });
      } else {
        console.warn('Geocoding failed, defaulting to Pakistan.');
        this.initMap(this.defaultLatLng);
      }
    });
  }

  initMap(latlng: { lat: number; lng: number }) {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: latlng,
      zoom: 12,
    });

    new google.maps.Marker({
      position: latlng,
      map,
    });
  }
}
