import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveOrderlineComponent } from './save-orderline.component';

describe('SaveOrderlineComponent', () => {
  let component: SaveOrderlineComponent;
  let fixture: ComponentFixture<SaveOrderlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveOrderlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveOrderlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
