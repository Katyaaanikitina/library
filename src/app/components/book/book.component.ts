import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { Book } from '../../shared/interfaces';
import { BooksService } from '../../shared/services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {
  @ViewChild('tagsContainerTpl')
  _tagsContainerTpl!: ElementRef<any>;

  @ViewChildren('tags')
  _tags!: QueryList<ElementRef>;

  @ViewChild('bookContainer')
  bookContainer!: ElementRef<any>;

  @Input() book!: Book;

  @Output() onFavorite: EventEmitter<number> = new EventEmitter<number>();
  @Output() onDeleteBook: EventEmitter<number> = new EventEmitter<number>();

  shelfTagsIds!: number[]; 
  shelfTagsNames!: string[];

  isTagsInMultiRow!: boolean;
  isTagsClosed = true;
  tagsWidth = 0;
  tagsContainerWidth!: number;
  tagsNumber!: number;
  price: number = this.booksService.genereteRandomPrice();
  bookDescription: string = 'Lorem ipsum dolor sit amet cons adipisicing elit. Recusandae, nobis!'

  constructor(private readonly booksService: BooksService,
              private readonly _changeDetectorRef: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.shelfTagsIds = this.book.tags;
    this.shelfTagsNames = this.booksService.getTagsNamesByIds(this.shelfTagsIds);
    this.tagsNumber = this.book.tags.length
  }

  ngAfterViewInit(): void {
    this.getAllTagsWidth();
    this.tagsContainerWidth = this._tagsContainerTpl.nativeElement.offsetWidth;
    this.isTagsInMultiRow = this.tagsContainerWidth < (this.tagsWidth);
    this._changeDetectorRef.detectChanges();
  }

  getAllTagsWidth(): void {
    this._tags.forEach((tag) => this.tagsWidth += tag.nativeElement.offsetWidth);
  }

  makeFavorite(event: any): void {
    this.onFavorite.emit(this.book.id);
    event.stopPropagation();
  }

  deleteBook(event: any): void {
    this.onDeleteBook.emit(this.book.id);
    event.stopPropagation();
  }

  openTags(event: any): void {
    this.isTagsClosed = !this.isTagsClosed;
    event.stopPropagation();
  }
}
