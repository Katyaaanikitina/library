import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit, OnDestroy {
  isBooksOrShelves!: string;
  currentPage!: string;
  currentRouteUrlArray!: string[];
  routeSub!: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public userService: UserService) { }

  ngOnInit(): void {
    this.routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.currentRouteUrlArray = event.url.split('/').filter(n => {
          return n != '' && n != 'home' && n != 'unavailable?isAdult=false'
        });
        this.getCurrentPage();
      }
      else if (event instanceof NavigationEnd) {
        const currentRoute = this.route.firstChild?.snapshot;
        this.isBooksOrShelves = currentRoute?.data['isBooskOrShelves'];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) this.routeSub.unsubscribe();
  }

  getCurrentPage(): void {
    if (this.currentRouteUrlArray.length) {
      this.currentPage = this.currentRouteUrlArray[this.currentRouteUrlArray.length - 1];
    } else this.currentPage = 'Home';
  }

  getClickedRoute(route: string) {
    const indexOfRoute = this.currentRouteUrlArray.indexOf(route);
    const neededRouterLinkArray = this.currentRouteUrlArray.slice(0, indexOfRoute + 1);
    return `/${neededRouterLinkArray.join('/')}`; 
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isDataProvided');
    this.router.navigate(['/login']);
  }
}
