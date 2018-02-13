import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  ADD_ORDER_LINE, RESET_ORDER_LINE, SET_STEP, UPDATE_ORDER_LINE_FORM,
  UPDATE_STEP
} from '../../redux/redux.actions';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../redux/stores/app.store';
import {OrderLineModel} from '../../models/order-line.model';
import {Subscription} from 'rxjs/Subscription';
import {IPanelsState} from '../../redux/stores/panels.store';
import {OrderlineService} from '../orderline.service';
import {tassign} from 'tassign';
import {MatDialog, MatSnackBar,} from '@angular/material';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-dynamic-order-line',
  templateUrl: './dynamic-order-line.component.html',
  styleUrls: ['./dynamic-order-line.component.css']
})
export class DynamicOrderLineComponent implements OnInit, OnDestroy {
  @Input() locationTypeByProperties: any = {};
  @select((state:IAppState) =>
  {return {orderlineInProcess:state.orderlineInProcess, orderlineForm:state.orderlineForm}}) orderlineAndForm$;
  @select((state: IAppState) => state.panels) panels$;
  public orderline = new OrderLineModel();
  public isSkirtSelected = false;
  public isBeadSelected = false ;
  public orderlines: OrderLineModel[] = [];
  private subscriptions: Subscription[] = [];
  public piles = [
    {value:'Amerikan Pile', viewValue:'Amerikan Pile'},
    {value:'Kanun Pile', viewValue:'Kanun Pile'},
    {value:'Yan Pile', viewValue:'Yan Pile'},
    {value:'Diğer', viewValue:'Diğer'}
  ];
  private orderlineFormValid: boolean;

  constructor(private ngRedux: NgRedux<IAppState>,
              private orderlineService: OrderlineService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const subscriptionPanel = this.panels$.subscribe((panel: IPanelsState) => {
      if(panel.statusOfClosed.panelMeasure)
        this.setOrderlinePieces();
    });
    this.subscriptions.push(subscriptionPanel);
    const subscriptionOrderline = this.orderlineAndForm$.subscribe((state: any) => {
      Object.assign(this.orderline,state.orderlineInProcess);
      this.orderlineFormValid = state.orderlineForm.isValid;
    });
    this.subscriptions.push(subscriptionOrderline);
  }

  ngOnDestroy(){
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public updateStep(value) {
    this.ngRedux.dispatch({type: UPDATE_STEP, value: value})
  }

  public submitForm(form: NgForm) {
    if(!this.checkFormValidation()) {
      alert("Adam gibi Doldur hacı");
      return;
    }

    if(this.orderlines.length>0){
      for(let orderline of this.orderlines){
        orderline = tassign(orderline,this.orderline);
        this.orderlineService.add(orderline).subscribe(s => console.log(s))
      }
    }else{
      this.orderlineService.add(tassign(this.orderline))
        .subscribe((s: OrderLineModel) => {
          s.order.id = this.orderline.order.id; // get order id to send ngx store
          this.orderline = tassign(this.orderline,s); // create new object to send ngx store
          this.ngRedux.dispatch({type:ADD_ORDER_LINE, orderline:this.orderline});
          this.ngRedux.dispatch({type: RESET_ORDER_LINE, orderline:null});
          this.ngRedux.dispatch({type: UPDATE_ORDER_LINE_FORM, form:{isSubmit:true}});
          this.ngRedux.dispatch({type:UPDATE_ORDER_LINE_FORM, form:{isValid:false, isSubmit:false}});
          this.ngRedux.dispatch({type: SET_STEP, value:1});
          this.openSnackBar("Ölçü eklendi","Tamam");
          form.reset();
      });
    }
  }

  private checkFormValidation(): boolean {
    return this.orderlineFormValid;
  }

  private openSnackBar(message: string, action: string){
    this.snackBar.open(message,action,{
      duration: 2000,
    })
  }

  private setOrderlinePieces(){
    this.orderlines = [];
    if(this.locationTypeByProperties.piecesCount){
      for(let i=0; i<this.locationTypeByProperties.piecesCount; i++){
        this.orderlines.push(new OrderLineModel());
      }
    }
  }
}



