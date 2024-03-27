import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeSecondWordToStars'
})
export class ChangeSecondWordToStarsPipe implements PipeTransform {

  transform(text: string): string {

    const changedWordsArray = text.split(' ').map((word, index) => {
      if (!(index % 2 === 0)) return word.split('').map(letter => letter = '*').join('');
      else return word;
    });

    return changedWordsArray.join(' ');
  }

}
