import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderValueComponent } from './slider-value.component';

describe('SliderValueComponent', () => {
  let component: SliderValueComponent;
  let fixture: ComponentFixture<SliderValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
