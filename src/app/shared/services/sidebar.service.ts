import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  private _oppend = new BehaviorSubject<boolean>(false);
  private _onData = new Subject<any[]>();
  private _onMetaData = new Subject<any[]>();
  private _onCurrency = new Subject<any>();

  get oppend() {
    return this._oppend;
  }
  get onData() {
    return this._onData;
  }

  get onMetaData() {
    return this._onMetaData;
  }

  get onCurrencyChanged() {
    return this._onCurrency;
  }
}
