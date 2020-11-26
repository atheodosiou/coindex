import { Component, OnDestroy } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { PrimeNGConfig } from 'primeng/api';
import { SidebarService } from './shared/services/sidebar.service';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  visible: Boolean = true;
  notifications: any[] = [];
  private $onMedaDataSubscription: Subscription;
  private $onDataSubscription: Subscription;
  private $onCurrencySubscription: Subscription;
  showAlertDialog:boolean=false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private sidebarService: SidebarService
  ) {
    //Ripple 
    this.primengConfig.ripple = true;

    this.sidebarService.oppend.subscribe(res => {
      this.visible = res;
    });

    this.$onMedaDataSubscription = this.sidebarService.onMetaData.subscribe(res => {
      const btc = res.find(x => x.id === 'BTC');
      for (let i = 0; i < 5; i++) {
        this.notifications.push(btc);
      }
      console.log('BTC', this.notifications)
      console.log('onMetaData', res);
    });
    this.$onDataSubscription = this.sidebarService.onData.subscribe(res => {
      console.log('onData', res);
    });
    this.$onCurrencySubscription = this.sidebarService.onCurrencyChanged.subscribe(res => {
      console.log('onCurrency', res)
    });
  }

  markAsRead(notification: any) {
    console.log(notification);
  }

  createAlert(){
    console.log('New alert created!');
  }

  ngOnDestroy() {
    this.$onDataSubscription.unsubscribe();
    this.$onMedaDataSubscription.unsubscribe();
    this.$onCurrencySubscription.unsubscribe();
  }
}
