import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFinalProcessComponent } from './order-final-process.component';

describe('OrderFinalProcessComponent', () => {
  let component: OrderFinalProcessComponent;
  let fixture: ComponentFixture<OrderFinalProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFinalProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFinalProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
