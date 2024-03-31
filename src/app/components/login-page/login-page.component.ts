import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials, User } from '../../shared/interfaces';
import { Observable, Subscription, pipe, tap } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  notAuthorizedMessage!: string | null;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required])
    })

    if (!this.userService.isLogged()) this.router.navigate(['/login']);
  }

  submit() {
    if (this.form.invalid) {
      this.userService.setUser();
      this.router.navigate(['/library-user']);
      
    } else {
      const credentials: Credentials = {
        email: this.form.value.email,
        name: this.form.value.name,
        isDataProvided: true
      }

      this.userService.setUser(credentials);
      this.userService.getUser();
      this.router.navigate(['/library-admin']);
    }

    this.form.reset();
  }
}
