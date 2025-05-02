import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import {
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { provideCharts } from 'ng2-charts';
import { AppComponent } from './app/app.component';
import { AuthenticationInterceptor } from './app/interceptors/authentication.interceptor';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: 'md', scrollAssist: false }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    provideCharts({
      registerables: [BarController, BarElement, CategoryScale, LinearScale],
    }),
  ],
});
