import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuredDateComponent } from './measured-date.component';

describe('MeasuredDateComponent', () => {
  let component: MeasuredDateComponent;
  let fixture: ComponentFixture<MeasuredDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasuredDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuredDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
