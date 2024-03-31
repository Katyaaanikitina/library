import { IsLogged } from './../../shared/guards/isLogged.guard';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  user!: User | null;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser();
    this.userService.user$.subscribe((user) => this.user = user);
  }
}