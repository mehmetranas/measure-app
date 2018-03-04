import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMeasureComponent } from './dynamic-measure.component';

describe('DynamicMeasureComponent', () => {
  let component: DynamicMeasureComponent;
  let fixture: ComponentFixture<DynamicMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
