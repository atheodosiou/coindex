import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../shared/services/rest.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  tickerSubscription: Subscription;
  currencies: any[] = [];
  form: FormGroup;
  perpage: number = 25;
  page: number = 1;

  coinmeta: any[];
  coinIds: { id: string, name: string, logo_url: string }[];
  initialFormValue: any;

  intervals: any[] = [
    { label: '1H', value: '1h' },
    { label: '1D', value: '1d' },
    { label: '1W', value: '7d' },
    { label: '1M', value: '30d' },
    { label: '1Y', value: '365d' },
    { label: 'YTD', value: 'ytd' },
  ];

  status: any[] = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Dead', value: 'dead' },
  ];

  fiatCurrencies: any[] = [
    { flag: 'assets/icons/fiat-currencies/us.svg', code: 'USD', label: 'Unated States Dollar' },
    { flag: 'assets/icons/fiat-currencies/eu.svg', code: 'EUR', label: 'Euro' },
    { flag: 'assets/icons/fiat-currencies/cn.svg', code: 'CNY', label: 'Chinese Yuan' },
    { flag: 'assets/icons/fiat-currencies/jp.svg', code: 'JPY', label: 'Japanese Yen' },
  ];

  selectedIds: string;
  disableNextBtn: boolean = false;
  disablePrevBtn: boolean = true;

  cols: { header: string, field: string, style?: any }[] = [
    { header: '#', field: 'rank', style: { width: '50px', 'text-align': 'center' } },
    { header: 'Name', field: 'name' },
    { header: 'Market Cap', field: 'market_cap' },
    { header: 'M.C. Change', field: 'market_cap_change' },
    { header: 'M.C. Change %', field: 'market_cap_change_pct', style: { width: '120px' } },
    { header: 'Volume', field: 'volume' },
    { header: 'V. Change', field: 'volume_change' },
    { header: 'V. Volume %', field: 'volume_change_pct', style: { width: '100px' } },
    { header: 'Price', field: 'price', style: { width: '100px' } },
    { header: 'P. Change', field: 'price_change', style: { width: '100px' } },
    { header: 'P. Change %', field: 'price_change_pct', style: { width: '100px' } },
    { header: 'Price Date', field: 'price_timestamp', style: { width: '90px' } }
  ];

  constructor(private router: Router, private restService: RestService, private fb: FormBuilder) {
    this.form = this.fb.group({
      interval: [this.intervals[1].value],
      status: [this.status[0].value],
      currency: [this.fiatCurrencies[1]],
      filter: [false],
      ids: [{ value: [], disabled: true }]
    });
    this.form.valueChanges.subscribe(res => {
      this.selectedIds = (res.ids as any[]).map(x => x.id).join(',');
      this.fetchData();
    })
  }

  ngOnInit(): void {
    this.fetchData();
    if (!this.coinmeta || this.coinmeta.length === 0) {
      this.restService.getCurrenciesMetadata().subscribe(res => {
        this.coinmeta = res;
        this.coinIds = res.map(x => { return { id: x.id, name: x.name, logo_url: x.logo_url } });
        this.form.controls['ids'].enable();
        console.log(this.coinIds);
      })
    }

  }

  clearFilters() {
    this.page = 1;
    this.form.patchValue({
      interval: this.intervals[1].value,
      status: this.status[0].value,
      currency: this.fiatCurrencies[1],
      filter: false,
      ids: []
    });
  }

  prev() {
    if (this.page > 1) {
      this.page -= 1;
      this.fetchData();
    } else {
      this.disablePrevBtn = true;
    }
  }

  next() {
    this.page += 1;
    if (this.disablePrevBtn === true) {
      this.disablePrevBtn = false;
    }
    this.fetchData();
  }

  private fetchData() {

    if (this.tickerSubscription) this.tickerSubscription.unsubscribe();
    this.tickerSubscription = this.restService.getCurrencies(
      10000,
      this.selectedIds,
      this.form.get('interval').value,
      this.form.get('currency').value.code,
      this.form.get('status').value,
      this.perpage.toString(),
      this.page.toString(),
      this.form.get('filter').value
    ).subscribe((currencies: any[]) => {
      if (currencies.length === 0) {
        this.disableNextBtn = true;
      }
      if (this.page === 1 && this.disablePrevBtn === false) {
        this.disablePrevBtn = true;
      }
      // this.currencies = currencies;
      this.currencies = currencies.map(x => {
        if (x['1h']) {
          x = this.flattenObject(x, '1h')
        }
        if (x['1d']) {
          x = this.flattenObject(x, '1d')
        }
        if (x['7d']) {
          x = this.flattenObject(x, '7d')
        }
        if (x['30d']) {
          x = this.flattenObject(x, '30d')
        }
        if (x['365d']) {
          x = this.flattenObject(x, '365d')
        }
        if (x['ytd']) {
          x = this.flattenObject(x, 'ytd')
        }
        return x;
      });
    }, error => {
      console.error(error);
    });

    // const notification = new Notification('Test Notification');

  }

  private flattenObject(obj, key): any {
    Object.keys(obj[key]).forEach(k => {
      obj[k] = obj[key][k];
    })
    return obj;
  }

  ngOnDestroy() {
    this.tickerSubscription.unsubscribe();
  }
}
