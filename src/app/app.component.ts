import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BooksService } from './shared/services/books.service';
import { DetailBookComponent } from './components/detail-book/detail-book.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }

}
