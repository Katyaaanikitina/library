import { Injectable } from '@angular/core';
import { Book, Tag } from '../interfaces';
import { DataStorageService } from './data-storage.service';
import { BehaviorSubject, Observable, Subject, find, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  shelves!: Book[];
  shelvesCopy!: Book[];
  books!: Book[];
  booksCopy!: Book[];
  tags!: Tag[];

  private _shelvesSub!: BehaviorSubject<Book[]>;
  shelvesObs$!: Observable<Book[]>;

  private _booksSub!: BehaviorSubject<Book[]>;
  booksObs$!: Observable<Book[]>;

  constructor(private readonly dataStorageService: DataStorageService) { 

    this.dataStorageService.shelvesObs$.subscribe(shelves => {
      this.shelves = this.shelvesCopy = shelves;
      this._shelvesSub = new BehaviorSubject<Book[]>(this.shelves);
      this.shelvesObs$ = this._shelvesSub.asObservable();
    })

    this.dataStorageService.booksObs$.subscribe(books => {
      this.books = this.booksCopy = books;
      this._booksSub = new BehaviorSubject<Book[]>(this.books);
      this.booksObs$ = this._booksSub.asObservable();
    })

    this.tags = this.dataStorageService.tags;
  }

  updateFavorites(id: number, booksSet: Book[]): void {
    booksSet.map((book) => {
      if (book.id === id) book.favorite = !book.favorite;
    })
  }

  updateBooks(id: number, booksSet: Book[], booksCopy: Book[]): void {
    let bookEl = booksSet.find((book) => book.id === id) //findIndexOf!!!
    let bookIndex = booksSet.indexOf(bookEl as Book)
    booksSet.splice(bookIndex, 1);
    booksCopy.splice(bookIndex, 1);
  }

  genereteRandomPrice(): number {
    return  Math.floor(Math.random() * 21) + 10;
  }

  getBookById(shelvesOrBooks: string, id: number): any {
    if (shelvesOrBooks === 'shelves') return this.shelves.find(book => book.id === id);
    else if (shelvesOrBooks === 'books') return this.books.find(book => book.id === id);
  }

  getTagsNamesByIds(idArray: number[]) :string[] {
    const neededTagsNames = this.tags.reduce((acc: any, curr: any) => {
      if (idArray.includes(curr.id)) acc.push(curr.name);
      return acc
    }, [])
    
    return neededTagsNames;
  }

  showFavorites(isOnlyFavorite: boolean, booksOrShelves: 'books' | 'shelves') {

    const shelvesOrBooksCopy = (booksOrShelves === 'shelves') ? this.shelvesCopy : this.booksCopy;
    const shelvesOrBooksSub = (booksOrShelves === 'shelves') ? this._shelvesSub : this._booksSub;
    
    let favoriteBooksArray = shelvesOrBooksCopy.filter((book) => (book.favorite === true));
    (isOnlyFavorite) 
      ? shelvesOrBooksSub.next(favoriteBooksArray) 
      : shelvesOrBooksSub.next(shelvesOrBooksCopy);
  }
}
