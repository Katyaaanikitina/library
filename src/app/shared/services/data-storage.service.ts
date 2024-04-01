import { Injectable } from '@angular/core';
import { Tag, Book } from '../interfaces';
import { Observable, filter, from, map, of, tap, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  public tags: Tag[] = [
    { id: 1,  active: false, name: 'Жанр', timesUsed: 0 },
    { id: 2,  active: false, name: 'Автор', timesUsed: 0 },
    { id: 3,  active: false, name: 'Видавництво', timesUsed: 0 },
    { id: 4,  active: false, name: 'Рік видання', timesUsed: 0 },
    { id: 5,  active: false, name: 'Серія книг', timesUsed: 0 },
    { id: 6,  active: false, name: 'ISBN', timesUsed: 0 },
    { id: 7,  active: false, name: 'Ключові слова', timesUsed: 0 },
    { id: 8,  active: false, name: 'Опис', timesUsed: 0 },
    { id: 9,  active: false, name: 'Оцінка', timesUsed: 0 },
    { id: 10, active: false,  name: 'Рецензія', timesUsed: 0 },
    { id: 11, active: false,  name: 'Обкладинка', timesUsed: 0 },
    { id: 12, active: false,  name: 'Тип книги', timesUsed: 0 },
    { id: 13, active: false,  name: 'Мова', timesUsed: 0 },
    { id: 14, active: false,  name: 'Кількість сторінок', timesUsed: 0 },
    { id: 15, active: false,  name: 'Формат', timesUsed: 0 },
    { id: 16, active: false,  name: 'Країна походження', timesUsed: 0 },
    { id: 17, active: false,  name: 'Історична епоха', timesUsed: 0 },
    { id: 18, active: false,  name: 'Тематика', timesUsed: 0 },
    { id: 19, active: false,  name: 'Сюжет', timesUsed: 0 },
    { id: 20, active: false,  name: 'Персонажі', timesUsed: 0 },
    { id: 21, active: false,  name: 'Місце дії', timesUsed: 0 },
    { id: 22, active: false,  name: 'Діалоги', timesUsed: 0 },
    { id: 23, active: false,  name: 'Атмосфера', timesUsed: 0 },
    { id: 24, active: false,  name: 'Ілюстрації', timesUsed: 0 },
    { id: 25, active: false,  name: 'Рекомендації', timesUsed: 0 },
    { id: 26, active: false,  name: 'Підбірка', timesUsed: 0 },
    { id: 27, active: false,  name: 'Ціна', timesUsed: 0 },
    { id: 28, active: false,  name: 'Знижка', timesUsed: 0 },
    { id: 29, active: false,  name: 'Дата виходу', timesUsed: 0 },
    { id: 30, active: false,  name: 'Популярність', timesUsed: 0 }
  ];
    
  public readonly shelfsCollections = [
    { id: 1, tags: [2, 3, 6, 29, 25, 22], src: 'https://deadline.com/wp-content/uploads/2022/08/lord-of-the-rings-feature-image.jpg?w=1000', name: "The Lord of the Rings", favorite: true, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: true},
    { id: 2, tags: [6,4], src: 'https://m.media-amazon.com/images/I/61wOt39gY6L._AC_UF1000,1000_QL80_FMwebp_.jpg', name: "The Hunger Games", favorite: false, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: false},
    { id: 3, tags: [6,5], src: 'https://cdn.vox-cdn.com/thumbor/wknjWA1eDuRCKcOhtiFWMWXTcww=/0x0:1686x816/1200x800/filters:focal(668x248:936x516)/cdn.vox-cdn.com/uploads/chorus_image/image/61633721/narnia.0.jpg', name: "The Chronicles of Narnia", favorite: true, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: false},
    { id: 4, tags: [11, 23], src: 'https://m.media-amazon.com/images/I/91r0dvXhNGL._AC_UF1000,1000_QL80_FMwebp_.jpg', name: "Harry Potter", favorite: false, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: true},
    { id: 5, tags: [30, 6], src: 'https://m.media-amazon.com/images/I/91lFJOYspuL._AC_UF1000,1000_QL80_FMwebp_.jpg', name: "The Hitchhiker's Guide to the Galaxy", favorite: false, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: true},
    { id: 6, tags: [15, 13], src: 'https://m.media-amazon.com/images/I/91hPXkwnaeL._AC_UF1000,1000_QL80_FMwebp_.jpg', name: "Game of Thrones", favorite: false, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: false},
    { id: 7, tags: [18, 11], src: 'https://m.media-amazon.com/images/I/91AXiPhTuoL._AC_UF1000,1000_QL80_FMwebp_.jpg', name: "Percy Jackson and the Olympians", favorite: true, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: false},
    { id: 8, tags: [2, 3], src: 'https://m.media-amazon.com/images/I/715ViOMJmIL._AC_SX444_SY639_FMwebp_QL65_.jpg', name: "The Dark Tower", favorite: false, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: false},
    { id: 9, tags: [2, 3], src: 'https://m.media-amazon.com/images/I/51jQChB+fmL._AC_UF1000,1000_QL80_FMwebp_.jpg', name: "The Wheel of Time", favorite: true, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: true},
    { id: 10, tags: [1, 3], src: 'https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_FMwebp_.jpg', name: "Dune", favorite: true, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: false},
    { id: 11, tags: [4, 5], src: 'https://m.media-amazon.com/images/I/91VelHkK8yL._AC_UF1000,1000_QL80_FMwebp_.jpg', name: "The Mortal Instruments", favorite: false, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: false},
    { id: 12, tags: [5, 6], src: 'https://m.media-amazon.com/images/I/71IkcEies6L._AC_UF1000,1000_QL80_FMwebp_.jpg', name: "The Maze Runner", favorite: false, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: true}
  ];

  public readonly bookCollections = [
    { tags: [2], name: "The Godfather", favorite: false, src: "https://cdn.britannica.com/55/188355-050-D5E49258/Salvatore-Corsitto-The-Godfather-Marlon-Brando-Francis.jpg", id: 1, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: false},
    { tags: [3, 4, 5], name: "The Silence of the Lambs", favorite: false, src: "https://m.media-amazon.com/images/I/519n1y9Q9kL._SY344_BO1,204,203,200_QL70_ML2_.jpg", id: 2, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: true},
    { tags: [6, 23, 27, 2, 5], name: "The Shawshank Redemption", favorite: true, src: "https://m.media-amazon.com/images/I/51HX9XQ9HBL._SY344_BO1,204,203,200_QL70_ML2_.jpg", id: 3, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: true},
    { tags: [5, 6], name: "The Da Vinci Code", favorite: false, src: "https://flixable.b-cdn.net/hbo-max/large/us/the-da-vinci-code.jpg", id: 4, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: false},
    { tags: [1], name: "The Girl with the Dragon Tattoo", favorite: false, src: "https://m.media-amazon.com/images/I/41quWoJq+8L._SY344_BO1,204,203,200_.jpg", id: 5, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: false},
    { tags: [2], name: "To Kill a Mockingbird", favorite: true, src: "https://m.media-amazon.com/images/I/51cTCiLMNAL._SX339_BO1,204,203,200_.jpg", id: 6, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: false},
    { tags: [3], name: "One Hundred Years of Solitude", favorite: false, src: "https://m.media-amazon.com/images/I/51IfaP5qfoL._SY344_BO1,204,203,200_QL70_ML2_.jpg", id: 7, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: true},
    { tags: [4, 7], name: "The Great Gatsby", favorite: false, src: "https://m.media-amazon.com/images/I/41CPOyQP6xL._SX331_BO1,204,203,200_.jpg", id: 8, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: true},
    { tags: [8, 19], name: "Jurassic Park", favorite: true, src: "https://m.media-amazon.com/images/I/513qk1TGinL._SX323_BO1,204,203,200_.jpg", id: 9, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: false},
    { tags: [2, 3, 4, 5, 6], name: "The Shining", favorite: true, src: "https://m.media-amazon.com/images/I/51jSPyJ8v2L._SY344_BO1,204,203,200_QL70_ML2_.jpg", id: 10, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: false},
    { tags: [3], name: "The Martian", favorite: false, src: "https://m.media-amazon.com/images/I/51Bw27SCLDL._SY498_BO1,204,203,200_.jpg", id: 11, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: false},
    { tags: [4], name: "The Hobbit", favorite: false, src: "https://m.media-amazon.com/images/I/41DfP7NpIIL._SX327_BO1,204,203,200_.jpg", id: 12, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: true}
  ];

  constructor() {
    this.addPopular(this.shelfsCollections);
    this.addPopular(this.bookCollections);
    this.sortTags(this.tags);
   }

  addPopular(shelvesOrBooks: Book[]) :void {
    let tagsArray: any[] = [];
    shelvesOrBooks.forEach((shelf) => tagsArray.push(...shelf.tags));
    
    tagsArray.forEach((tagInArray) => {
      let neededTag = this.tags.find((tag) => tag.id === tagInArray);
      if (neededTag) neededTag.timesUsed++;
    })
  }

  sortTags(tags : Tag[]): void {
    tags.sort((a, b) => {
      return (a.timesUsed === b.timesUsed) ? a.name.localeCompare(b.name) : b.timesUsed - a.timesUsed;
    })
  }

  shelvesObs$ = from(this.shelfsCollections)
  .pipe(
    filter(book => book.id % 2 === 0),
    toArray()
  );

  booksObs$ = from(this.bookCollections)
  .pipe(
    filter(book => book.id % 2 === 0),
    toArray()
  );

  // makeObservable(booksArray: Book[]) :Observable<Book> {
  //   return from(booksArray);
  // }
}
