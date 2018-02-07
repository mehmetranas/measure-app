import {Component, EventEmitter, Inject, OnDestroy, OnInit, Output} from '@angular/core';
import {LocationService} from '../../order-form/location.service';
import {ProductService} from '../../order-form/product.service';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../redux/stores/app.store';
import {OrderModel} from '../../models/order.model';
import {Subscription} from 'rxjs/Subscription';
import {OrderLineModel} from '../../models/order-line.model';
import {UPDATE_ORDER_LINE, UPDATE_STEP} from '../../redux/redux.actions';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSelectChange} from '@angular/material';
import {OrderlinePropertyService} from '../orderline-property.service';

@Component({
  selector: 'app-measure-form',
  templateUrl: './measure-form.component.html',
  styleUrls: ['./measure-form.component.css']
})
export class MeasureFormComponent implements OnInit, OnDestroy {
  @Output() locationType: EventEmitter<any> = new EventEmitter<any>();
  @select((s: IAppState) => s.order) order$;
  public locations = [];
  public products = [];
  public orderline: OrderLineModel= new OrderLineModel();
  private subscriptions: Subscription[] = [];
  public locationTypeCode1: string; // set locationType
  public locationTypeCode2: string; // set locationType
  private orderLineProperties;

  constructor(private locationService: LocationService,
              private productService: ProductService,
              private ngRedux: NgRedux<IAppState>,
              private orderlinePropertiesService: OrderlinePropertyService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.locations = this.locationService.get();
    this.products = this.productService.get();
    const subscription = this.order$.subscribe((order: OrderModel) => this.orderline.order.id = order.id);
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public updateStep(value) {
    this.setAndUpdateOrderline();
    this.ngRedux.dispatch({type: UPDATE_STEP, value: value})
  }

  private setAndUpdateOrderline() {
    this.orderline.locationType = this.locationTypeCode1 + " " + this.locationTypeCode2;
    if(!this.orderLineProperties.mechanismStatusAndPieceCount)
    {
      this.orderline.piecesCount = 0;
      this.orderline.mechanismStatus = 0;
    }
    this.ngRedux.dispatch({type: UPDATE_ORDER_LINE, orderline: this.orderline});
    this.ngRedux.dispatch({type: UPDATE_ORDER_LINE, orderline: this.orderline});
  }

  locationTypeChanged($event: MatSelectChange) {
    this.orderLineProperties = this.orderlinePropertiesService.getProductOption($event.value);
    if(this.orderLineProperties.mechanismStatusAndPieceCount) this.openDialog(this.orderLineProperties.name);
    this.locationType.emit(this.orderLineProperties)
  }

  public openDialog(name){
    const dialogRef = this.dialog.open(ChooseMechanismDialogComponent, {
      data: name
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!result || (result && !result.answer)) this.orderline.product.productValue = null;
      else{
        Object.assign(this.orderline,result.data);
      }
    })
  }

  resetSelectedProduct() {
    this.orderline.product.productValue=null;
  }
}

@Component({
  selector: 'app-dialog-chooseMechanism',
  template: `
      <h2 mat-dialog-title>{{ data }} perde için mekanizma türünü seçerek devam edebilirsiniz.</h2>
    <mat-dialog-content>
      <form #form="ngForm">
        <mat-radio-group required [(ngModel)]="mechanismStatus" name="mechanismAndPeace">
          <mat-radio-button value="0">Tek Kasa</mat-radio-button>
          <mat-radio-button value="1">Parçalı</mat-radio-button>
          <mat-radio-button value="2">Tek Kasa + Çoklu Mekanizma</mat-radio-button>
        </mat-radio-group>
        <br>
        <mat-form-field *ngIf="mechanismStatus==1 || mechanismStatus==2">
          <input type="number" name="mechanismPeace" [(ngModel)]="piecesCount" matInput required placeholder="Parça Sayısı">
        </mat-form-field>
      </form>
    </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-raised-button 
                type="button" 
                class="add-button-row" 
                color="accent" 
                (click)="closeDialog(false)">Vazgeç</button>
        <button mat-raised-button 
                type="button"
                class="add-button-row"
                color="warn"
                (click)="closeDialog(true)" 
                [disabled]="form.invalid">Tamam</button>
      </mat-dialog-actions>
  `,
  styles: [ `
    .add-button-row {
      align-items: center;
      justify-content: space-around;
    }
  `]
})
export class ChooseMechanismDialogComponent {
  public mechanismStatus: number;
  public piecesCount: number;
  constructor(
    public dialogRef: MatDialogRef<ChooseMechanismDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(answer=false): void {
    this.dialogRef.close({
      answer:answer,
      data:{
        mechanismStatus:this.mechanismStatus,
        piecesCount:this.piecesCount
      }
    });
  }
}

