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
  user!: User;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    console.log(this.user);
    
  }
}
