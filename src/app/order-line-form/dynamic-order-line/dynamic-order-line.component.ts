import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {MatDialog, MatSnackBar,} from '@angular/material';

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
  @ViewChild('dynamicForm') form;
  public orderline = new OrderLineModel();
  public isSkirtSelected = false;
  public isBeadSelected = false ;
  public orderlines: any[] = [];
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
      Object.assign(this.orderline,state.orderlineInProcess,this.orderline.product);
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

  public submitForm() {
    if(!this.checkFormValidation()) {
      alert("Ölçü alanlarını eksiksiz doldurduğunuzdan emin misiniz?");
      return;
    }
    // if store or zebra is selected
    if(this.orderlines.length>0){
      let updatedOrderlines = [];
      this.orderlines.forEach((orderline) => {
        updatedOrderlines.push({...this.orderline,...orderline})
      });
      this.postAndAddState(updatedOrderlines);}
    else
      this.postAndAddState([this.orderline]); // check method later
    }

  private postAndAddState(orderlines: OrderLineModel[]){
      orderlines.forEach((orderline,index) => {
        let orderlineClone = {...orderline, product:{...orderline.product},order: {...orderline.order}};
        this.orderlineService.add(orderlineClone as OrderLineModel).subscribe((response: OrderLineModel) => {
          response.order.id = orderlineClone.order.id; // get order id to send ngx store
          orderlineClone = {...orderlineClone,...response}; // merge orderlineClone and response after add DB
          this.ngRedux.dispatch({type:ADD_ORDER_LINE, orderline:orderlineClone});
            if(index === orderlines.length-1) {
              this.openSnackBar("Ölçüler eklendi","Tamam");
              this.clearOrderlineState();
              this.form.reset();
            }
        });
    });
  }

  private clearOrderlineState(){
    this.ngRedux.dispatch({type: RESET_ORDER_LINE, orderline:null});
    this.ngRedux.dispatch({type: UPDATE_ORDER_LINE_FORM, form:{isSubmit:true}});
    this.ngRedux.dispatch({type:UPDATE_ORDER_LINE_FORM, form:{isValid:false, isSubmit:false}});
    this.ngRedux.dispatch({type: SET_STEP, value:1});
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
        this.orderlines.push({propertyWidth: null, propertyHeight: null});
      }
    }
  }
}



