import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unavailable',
  templateUrl: './unavailable.component.html',
  styleUrls: ['./unavailable.component.sass']
})
export class UnavailableComponent implements OnInit {
  previousRouteUrl!: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPreviousRouteUrl();
  }

  getPreviousRouteUrl() {
    const currentRouteUrlArray = this.route.snapshot.url;
    currentRouteUrlArray.pop();
    this.previousRouteUrl = `/${currentRouteUrlArray.join('/')}`;
  }
}
