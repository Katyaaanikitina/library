import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../interfaces';
import { Observable, filter } from 'rxjs';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(books: Book[] | null, search: string = ''): Book[] {
    if (!books) return [];
    if (!search.trim()) return books;

    return books?.filter((book: { name: string; }) => {
      return book.name.toLowerCase().includes(search.toLocaleLowerCase())
    });
  }
}
