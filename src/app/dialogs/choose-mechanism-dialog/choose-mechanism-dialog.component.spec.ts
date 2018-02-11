import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMechanismDialogComponent } from './choose-mechanism-dialog.component';

describe('ChooseMechanismDialogComponent', () => {
  let component: ChooseMechanismDialogComponent;
  let fixture: ComponentFixture<ChooseMechanismDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseMechanismDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseMechanismDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
