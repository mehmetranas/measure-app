import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMeasureComponent } from './add-new-measure.component';

describe('AddNewMeasureComponent', () => {
  let component: AddNewMeasureComponent;
  let fixture: ComponentFixture<AddNewMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
