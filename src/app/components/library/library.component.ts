import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.sass']
})
export class LibraryComponent implements OnInit {
  count$ = new BehaviorSubject<number>(0);
  searchValue!: string;
  chosenTags!: number[];

  constructor(public booksService: BooksService) {}
  
  ngOnInit(): void {
  }

  updateInputValue(inputValue: string): void {
    this.searchValue = inputValue;
  }

  updateTagsValue(chosenTags: number[]) {
   this.chosenTags = chosenTags;
  }

  componentAdded(event: any) {
    console.log(event);
 }

 increase() {
  let count = this.count$.getValue() + 1;
  this.count$.next(count);
 }
}
