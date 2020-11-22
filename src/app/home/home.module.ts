import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './subcomponents/header/header.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { PercentagePipe } from '../shared/pipes/percentage.pipe';
import { IsPositivePipe } from '../shared/pipes/isPositive.pipe';
import {SplitButtonModule} from 'primeng/splitbutton';
const PrimeNGModules = [
  TableModule,
  ButtonModule,
  SelectButtonModule,
  DropdownModule,
  ReactiveFormsModule,
  ToggleButtonModule,
  MultiSelectModule,
  SplitButtonModule
];

@NgModule({
  declarations: [HomeComponent, HeaderComponent, PercentagePipe,IsPositivePipe],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    ...PrimeNGModules
  ]
})
export class HomeModule { }
