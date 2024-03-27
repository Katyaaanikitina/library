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
  loginSub!: Subscription;
  isLoggedSub! : Subscription;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })

    this.isLoggedSub = this.userService.isLogged$.subscribe(isLogged => {
      if (!isLogged) this.router.navigate(['/login'])
    })    
  }

  submit() {
    if(this.form.invalid) {
      return;
    }

    const credentials: Credentials = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    const userData = this.userService.login(credentials)
    .pipe(
      tap((data) => {
        if (!(typeof data === 'string')) {
          this.userService.setCurrentUser(data);
          this.userService.setToken(data.token);
        } else {
          this.notAuthorizedMessage = data;
          setTimeout(() => this.notAuthorizedMessage = null ,4000)
        }
      })
    )

    this.loginSub = userData.subscribe((data: User | string) => {
      if (!(typeof data === 'string')) {
        switch (data.admin) {
          case true: this.router.navigate(['/library-admin'])
          break;
          case false: this.router.navigate(['/library-user'])
          break;
        }
        this.userService.isLogged$.next(true);
      }
    })

    setTimeout(() => {
       localStorage.removeItem('token');
       this.userService.isLogged$.next(false);
    }, 5 * 60 * 1000)

    this.form.reset();
  }

  ngOnDestroy() {
    this.isLoggedSub.unsubscribe();
    this.loginSub.unsubscribe();
  }
}
