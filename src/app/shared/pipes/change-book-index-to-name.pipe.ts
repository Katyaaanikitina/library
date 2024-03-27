import { Pipe, PipeTransform } from '@angular/core';
import { BooksService } from '../services/books.service';

@Pipe({
  name: 'changeBookIndexToName'
})
export class ChangeBookIndexToNamePipe implements PipeTransform {

  constructor (private booksService: BooksService) {}

  transform(route: string, isShelvesOrBooks: string): string {
    if (Number.isFinite(+route)) {

      if (isShelvesOrBooks === 'shelves') {
        let book = this.booksService.getBookById('shelves', +route);
        return route = book.name;
        
      } else {
        let book = this.booksService.getBookById('books', +route);
        return route = book.name;
      }
    } else return route;
  }

}
