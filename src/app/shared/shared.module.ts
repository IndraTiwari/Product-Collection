import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderValueComponent } from './slider-value/slider-value.component';
import { AlphabetsOnlyDirective } from './directives/alphabets-only.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { ShortValuePipe } from './pipes/short-value.pipe';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  declarations: [
    SliderValueComponent,
    NumbersOnlyDirective,
    AlphabetsOnlyDirective,
    ShortValuePipe],
  imports: [
    CommonModule,
    NgxSliderModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    QrCodeModule
  ],
  exports:[
    SliderValueComponent,
    NumbersOnlyDirective,
    AlphabetsOnlyDirective,
    ShortValuePipe
  ]
})
export class SharedModule { }
