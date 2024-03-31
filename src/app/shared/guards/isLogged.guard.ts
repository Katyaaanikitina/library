import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable({providedIn: 'root'})
export class IsLogged implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean {
        if (localStorage.getItem('user')) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false
        }
    }   
}