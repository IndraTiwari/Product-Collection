import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrDataComponent } from './qr-data.component';

describe('QrDataComponent', () => {
  let component: QrDataComponent;
  let fixture: ComponentFixture<QrDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
