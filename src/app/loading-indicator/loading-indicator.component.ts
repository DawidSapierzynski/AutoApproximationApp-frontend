import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event, NavigationError, NavigationCancel } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit {
  showLoadingIndicatordBS = new BehaviorSubject<boolean>(false);
  private showLoadingIndicator = true;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel) {
        this.showLoadingIndicator = false;
      }
    });
  }

}
