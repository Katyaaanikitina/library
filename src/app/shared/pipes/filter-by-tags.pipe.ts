import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../interfaces';

@Pipe({
  name: 'filterByTags'
})
export class FilterByTagsPipe implements PipeTransform {

  transform(books: Book[], chosenTags: number[]): Book[] {
    if (!chosenTags || chosenTags.length === 0) return books;

    return books.reduce((acc, curr) => {

      chosenTags.forEach((tag) => {
        if (curr.tags.includes(tag) && !(acc.includes(curr))) acc.push(curr)
      })
      
      return acc
    }, [] as Book[])
  }
}
