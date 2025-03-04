import { inject } from '@angular/core';
import { UrlTree } from '@angular/router';
import { IonRouterOutlet, NavController } from '@ionic/angular/standalone';

export function ionGoBack() {
  const ionRouterOutlet = inject(IonRouterOutlet);
  const navController = inject(NavController);

  return function (defaultHref?: string | any[] | UrlTree) {
    const canGoBack = ionRouterOutlet.canGoBack();
    if (canGoBack) {
      return navController.pop();
    }
    if (defaultHref) {
      return navController.navigateBack(defaultHref);
    }
    return navController.navigateBack('/');
  };
}
