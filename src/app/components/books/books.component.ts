import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Book } from '../../shared/interfaces';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { BooksService } from '../../shared/services/books.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {
  @Input() count!: BehaviorSubject<number>;
  @Input() searchValue!: string;
  @Input() chosenTagsArray!: number[];
  @Input() books!: Book[];

  book: any;
  bookHeight!: number;
  bookMargin!: number;
  booksContainerHeight!: number;
  isBooksInMultipleRow!: boolean;
  isOnlyFavorite: boolean = false;

  buttonText = 'SHOW MORE';

  @ViewChild('booksContainer')
  booksContainer!: ElementRef<any>;

  constructor(public booksService: BooksService,
              private readonly _changeDetectorRef: ChangeDetectorRef,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.booksContainerHeight = this.booksContainer.nativeElement.offsetHeight;
    this.book = document.getElementById("book");
    this.bookMargin = parseFloat(window.getComputedStyle(this.book).marginBottom);
    this.bookHeight = Math.ceil(parseFloat(window.getComputedStyle(this.book).height)) +  this.bookMargin;
    this.isBooksInMultipleRow = this.booksContainerHeight > this.bookHeight;
    this._changeDetectorRef.detectChanges();
  }

  openOrCloseBooks() : void {
    (this.isBooksInMultipleRow) ? this.buttonText = 'SHOW LESS' : this.buttonText = 'SHOW MORE';
    this.isBooksInMultipleRow = !this.isBooksInMultipleRow;
  }

  showFavorites() {
    this.isOnlyFavorite = !this.isOnlyFavorite;
    this.booksService.showFavorites(this.isOnlyFavorite, 'books');
  }

  openBook(id: number) {
    this.router.navigate(['/library/books', id]);
  }
}
