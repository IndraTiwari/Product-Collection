import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-value',
  templateUrl: './slider-value.component.html',
  styleUrls: ['./slider-value.component.css']
})
export class SliderValueComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 50,
    step: 5,
    showTicks: true,
    showTicksValues: true,
    enforceStep: false,
    enforceRange: false,
    showSelectionBar: true,
  };

  onChange(value) {
    this.value = Math.round(value / 5) * 5;
    console.log('val 2', this.value);
  }
}
