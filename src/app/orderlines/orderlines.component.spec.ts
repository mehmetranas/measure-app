import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlinesComponent } from './orderlines.component';

describe('OrderlinesComponent', () => {
  let component: OrderlinesComponent;
  let fixture: ComponentFixture<OrderlinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderlinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
