import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderValueComponent } from './slider-value/slider-value.component';
import { AlphabetsOnlyDirective } from './directives/alphabets-only.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { ShortValuePipe } from './pipes/short-value.pipe';



@NgModule({
  declarations: [SliderValueComponent, AlphabetsOnlyDirective, NumbersOnlyDirective, ShortValuePipe],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
