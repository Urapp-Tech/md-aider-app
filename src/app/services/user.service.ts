import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { BehaviorSubject } from 'rxjs';
import { UserData } from '../types/login.types';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private readonly storageService: StorageService,
    private readonly navController: NavController
  ) {}

  private _userData = this.storageService.getItem<UserData>('USER_DATA');

  private _userDataChanged = new BehaviorSubject(Date.now());

  get userDataChanged() {
    return this._userDataChanged.asObservable();
  }

  get userData() {
    if (!this._userData) return null;
    return { ...this._userData };
  }

  set userData(userData: UserData | null) {
    this._userData = userData;
    this.storageService.setItem('USER_DATA', userData);
    this._userDataChanged.next(Date.now());
  }

  logout() {
    this.userData = null;
    this.navController.navigateRoot('/login');
  }
}
