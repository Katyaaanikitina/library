import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TagsComponent } from './components/tags/tags.component';
import { ShelvesComponent } from './components/shelves/shelves.component';
import { BookComponent } from './components/book/book.component';
import { BooksComponent } from './components/books/books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { LibraryComponent } from './components/library/library.component';
import { InputComponent } from './components/input/input.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AppRoutingModule } from './app-routing.module';
import { DetailBookComponent } from './components/detail-book/detail-book.component';
import { UnavailableComponent } from './components/unavailable/unavailable.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    InputComponent,
    TagsComponent,
    ShelvesComponent,
    BookComponent,
    BooksComponent,
    LibraryComponent,
    HomePageComponent,
    DetailBookComponent,
    UnavailableComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
