import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicOrderLineComponent } from './dynamic-order-line.component';

describe('DynamicOrderLineComponent', () => {
  let component: DynamicOrderLineComponent;
  let fixture: ComponentFixture<DynamicOrderLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicOrderLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicOrderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
