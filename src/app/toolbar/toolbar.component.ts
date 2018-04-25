import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {AuthService} from '../auth/services/login.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {MessagingService} from "../messaging.service";
import "rxjs/add/operator/do";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() toggleSidenav: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleNotifies: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("notify") el:any;
  public newMessage: boolean = false;
  private subscription: Subscription = new Subscription();
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width:${720}px)`);
  constructor(private router: Router,
              public messageService:MessagingService,
              private renderer:Renderer2,
              public authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.messageService.currentMessage
      .subscribe((data) => {
        if(data){
          this.newMessage = true;
        }
      });
  }

  ngAfterViewInit(){
    ["animationend","oAnimationEnd","mozAnimationEnd","webkitAnimationEnd"]
      .forEach((event) => {
        this.renderer.listen(
          this.el._elementRef.nativeElement,
          event,
          (event) => this.newMessage = false);
      })

  }

  public ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public isLogged() {
     return localStorage.getItem('xAuthToken') == null;
  }

  public logout( ){
    this.authService.logout()
      .take(1)
      .subscribe(() => {
      this.router.navigate(['auth']);
      console.log('Logout is successfully.');
    });
  }
}
