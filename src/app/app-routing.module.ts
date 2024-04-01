import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { LibraryComponent } from "./components/library/library.component";
import { DetailBookComponent } from "./components/detail-book/detail-book.component";
import { UnavailableComponent } from "./components/unavailable/unavailable.component";
import { IsRequireLoginGuard } from "./shared/guards/isAdult.guard";
import { ShelvesComponent } from "./components/shelves/shelves.component";
import { BooksComponent } from "./components/books/books.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { IsLogged } from "./shared/guards/isLogged.guard";

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},///???????
    {path: 'home', component: HomePageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'library', component: LibraryComponent, canActivate: [IsLogged]},
    {path: 'library-admin', component: LibraryComponent, canActivate: [IsLogged]},
    {path: 'library-user', component: LibraryComponent, canActivate: [IsLogged]},
    {path: 'library/shelves/:id', 
    component: DetailBookComponent, 
    data: {isBooskOrShelves: 'shelves'}, 
    canActivate: [IsRequireLoginGuard]},

    {path: 'library/books/:id', 
    component: DetailBookComponent, 
    data: {isBooskOrShelves: 'books'},
    canActivate: [IsRequireLoginGuard]},

    {path: 'library/unavailable', component: UnavailableComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {

}