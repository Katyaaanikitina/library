import { Injectable } from '@angular/core';
import { Tag, Book } from '../interfaces';
import { Observable, filter, from, map, of, tap, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  public tags: Tag[] = [
    { id: 1,  active: false, name: 'Comedy', timesUsed: 0 },
    { id: 2,  active: false, name: 'Horror', timesUsed: 0 },
    { id: 3,  active: false, name: 'Drama', timesUsed: 0 },
    { id: 4,  active: false, name: 'Documentary', timesUsed: 0 },
    { id: 5,  active: false, name: 'Adventure', timesUsed: 0 },
    { id: 6,  active: false, name: 'Western', timesUsed: 0 },
    { id: 7,  active: false, name: 'Animation', timesUsed: 0 },
    { id: 8,  active: false, name: 'Narrative', timesUsed: 0 },
    { id: 9,  active: false, name: 'Fiction', timesUsed: 0 },
    { id: 10, active: false,  name: 'Musical genre', timesUsed: 0 },
    { id: 11, active: false,  name: 'Epic', timesUsed: 0 },
    { id: 12, active: false,  name: 'Disaster', timesUsed: 0 },
    { id: 13, active: false,  name: 'Martial Arts', timesUsed: 0 },
    { id: 14, active: false,  name: 'Buddy', timesUsed: 0 },
    { id: 15, active: false,  name: 'Action', timesUsed: 0 },
    { id: 16, active: false,  name: 'Thriller', timesUsed: 0 },
    { id: 17, active: false,  name: 'Romance', timesUsed: 0 },
    { id: 18, active: false,  name: 'Noir', timesUsed: 0 },
    { id: 19, active: false,  name: 'Fantasy', timesUsed: 0 },
    { id: 20, active: false,  name: 'Magical Realism', timesUsed: 0 },
    { id: 21, active: false,  name: 'Musical', timesUsed: 0 },
    { id: 22, active: false,  name: 'Abstract animation film', timesUsed: 0 },
    { id: 23, active: false,  name: 'Historical film', timesUsed: 0 },
    { id: 24, active: false,  name: 'Mystery', timesUsed: 0 },
    { id: 25, active: false,  name: 'Historical Fiction', timesUsed: 0 },
    { id: 26, active: false,  name: 'Children\'s', timesUsed: 0 },
    { id: 27, active: false,  name: 'Dance film', timesUsed: 0 },
    { id: 28, active: false,  name: 'Biographical', timesUsed: 0 },
    { id: 29, active: false,  name: 'Teen', timesUsed: 0 },
    { id: 30, active: false,  name: 'Experimental', timesUsed: 0 },
    { id: 31, active: false,  name: 'Science fiction', timesUsed: 0 },
    { id: 32, active: false,  name: 'Crime film', timesUsed: 0 }
  ];
    
  public readonly moviesCollections = [
    { id: 1, 
      tags: [23, 28, 25, 15, 3], name: "Napoleon", favorite: true, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: true, 
      src: 'https://is1-ssl.mzstatic.com/image/thumb/ACrYlS8B3FETrth5h1h7eA/670x377.webp', 
      link:'https://tv.apple.com/pl/movie/napoleon/umc.cmc.25k80oxl3vo69c8rimk8v81s1',
      description: 'A personal look at the French military leader’s origins and swift, ruthless climb to emperor. The story is viewed through the prism of Napoleon\’s addictive, volatile relationship with his wife and one true love, Josephine.'},
    { id: 2, tags: [32, 15], name: "Killers of the Flower Moon", favorite: false, date: '2023-04-14 11:54:25.843 +0000', isRequireLogin: false, 
      src: 'https://is1-ssl.mzstatic.com/image/thumb/rss8pF-klNy76S-NWFue-A/670x377.webp', 
      link:'https://tv.apple.com/pl/movie/killers-of-the-flower-moon/umc.cmc.5x1fg9vferlfeutzpq6rra1zf',
      description: 'When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one—until the FBI steps in to unravel the mystery.'
    },
    { id: 3, tags: [1], name: "The Family Plan", favorite: true, date: '2023-05-14 11:54:25.843 +0000', isRequireLogin: true, 
      src: 'https://is1-ssl.mzstatic.com/image/thumb/tPJwMGtsAr_psAVlyf2Rzg/670x377.webp', 
      link:'https://tv.apple.com/pl/movie/the-family-plan/umc.cmc.6o6y3wel2lez2tkdu2cv8dzd1',
      description: 'Dan Morgan is many things: a devoted husband, a loving father, a celebrated car salesman. He’s also a former assassin. And when his past catches up to his present, he\’s forced to take his unsuspecting family on a road trip unlike any other.'},
    { id: 4, tags: [26, 22, 7, 5], name: "Luck", favorite: false, date: '2023-06-14 11:54:25.843 +0000', isRequireLogin: true, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/gHMoyFnOUJLH6d0rSgyIbg/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/luck/umc.cmc.5w6fq1u39v7ozsdv3jkx0nrfs',
    description: 'From Skydance Animation comes the story of Sam Greenfield, the unluckiest person in the world! Suddenly finding herself in the never-before-seen Land of Luck, she must unite with the magical creatures there to turn her luck around.'},
    { id: 5, tags: [3, 4], name: "The Bloody Hundredth", favorite: false, date: '2022-03-14 11:54:25.843 +0000', isRequireLogin: false, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/DwR3ldPe-AAH2-2Lk5dJyw/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/the-bloody-hundredth/umc.cmc.17tiu47xvxo1p9k0tqfvhf29r',
    description: 'Meet the real-life airmen who inspired Masters of the Air as they share the harrowing and transformative events of the 100th Bomb Group. Narrated by Tom Hanks and featuring Steven Spielberg.'},
    { id: 6, tags: [15], name: "Greyhound", favorite: false, date: '2021-03-14 11:54:25.843 +0000', isRequireLogin: true, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/ulVKyc80cSETkD7oXp57lQ/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/greyhound/umc.cmc.o5z5ztufuu3uv8lx7m0jcega',
    description: '2021 Oscar® nominee. In a thrilling WWII story inspired by actual events, Captain Ernest Krause (Tom Hanks) leads an international convoy of 37 ships on a treacherous mission across the Atlantic to deliver soldiers and supplies to Allied forces.'},
    { id: 7, tags: [3, 15], name: "Emancipation", favorite: false, date: '2020-03-14 11:54:25.843 +0000', isRequireLogin: false, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/lgskq6n1xkUI5DOyA5tWWQ/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/emancipation/umc.cmc.1j6fdxookwtqml3bd8ivvcbbv',
    description: 'Inspired by the gripping true story of a man who would do anything for his family—and for freedom. When Peter, an enslaved man, risks his life to escape and return to his family, he embarks on a perilous journey of love and endurance.'},
    { id: 8, tags: [1, 5, 19, 26], name: "Finch", favorite: false, date: '2010-03-14 11:54:25.843 +0000', isRequireLogin: true,
    src: 'https://is1-ssl.mzstatic.com/image/thumb/xwiVfxV1l5Tfy6-1uQ25_Q/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/finch/umc.cmc.47dkj9f2ho3h8dwxixflz65q5',
    description: 'Tom Hanks is Finch, a man who embarks on a moving and powerful journey to find a new home for his unlikely family—his beloved dog and a newly created robot—in a dangerous and ravaged world.'},
    { id: 9, tags: [15, 17], name: "Ghosted", favorite: true, date: '2011-03-14 11:54:25.843 +0000', isRequireLogin: true, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/Ze8uZ-TWJ2JMbqmtcz8_BA/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/ghosted/umc.cmc.6nodv9rf3ltfk2ar3pfc8hced',
    description: 'Salt-of-the-earth Cole falls head over heels for enigmatic Sadie—but then makes the shocking discovery that she’s a secret agent. Before they can decide on a second date, Cole and Sadie are swept away on an international adventure to save the world.'},
    { id: 10, tags: [16, 32], name: "Sharper", favorite: false, date: '2012-03-14 11:54:25.843 +0000', isRequireLogin: false, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/l1GWYR-J4UvmK7849F472A/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/sharper/umc.cmc.5ud0ivpwgqw2st0u4z73gwpar',
    description: 'No one is who they seem in this neo-noir New York City thriller of ruthless manipulations and high-stakes power games.'},
    { id: 11, tags: [16, 20, 13], name: "Tetris", favorite: true, date: '2013-03-14 11:54:25.843 +0000', isRequireLogin: false, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/yj6AjgIcNlSHzmA0A6GOEA/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/tetris/umc.cmc.4evmgcam356pzgxs2l7a18d7b',
    description: 'Based on the true story of American video game salesman Henk Rogers (Taron Egerton) and his discovery of Tetris in 1988. When he sets out to bring the game to the world, he enters a dangerous web of lies and corruption behind the Iron Curtain.'},
    { id: 12, tags: [3], name: "CODA", favorite: true, date: '2023-06-14 11:54:25.843 +0000', isRequireLogin: true, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/zRCSBlp0LjwClRXsjyDNYQ/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/coda/umc.cmc.3eh9r5iz32ggdm4ccvw5igiir',
    description: 'Winner of 3 Oscars®, including Best Picture and Best Supporting Actor. As a CODA (child of deaf adults), Ruby is the only hearing person in her home. When she discovers a passion for singing, Ruby must choose between family obligations and her dreams.'},
    { id: 13, tags: [3], name: "Palmer", favorite: false, date: '2023-08-14 11:54:25.843 +0000', isRequireLogin: false, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/DCj5c2CndQsWCj9zkGGa5Q/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/palmer/umc.cmc.40qrv09i2yfh8iilyi4s8vfi',
    description: 'After 12 years in prison, former high school football star Eddie Palmer returns home to put his life back together—and forms an unlikely bond with Sam, an outcast boy from a troubled home. But Eddie\s past threatens to ruin his new life and family.'},
    { id: 14, tags: [1], name: "On The Rocks", favorite: true, date: '2023-09-14 11:54:25.843 +0000', isRequireLogin: true, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/gT58GYMl6cHNMAPVKgsXYA/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/on-the-rocks/umc.cmc.1mydlea6wicrm013138speg6m',
    description: 'Faced with sudden doubts about her marriage, a young New York mother (Rashida Jones) teams up with her larger-than-life playboy father (Bill Murray) to tail her husband (Marlon Wayans) in a bittersweet comedy written and directed by Sofia Coppola.'},
    { id: 15, tags: [3], name: "The Banker", favorite: false, date: '2023-04-14 11:54:25.843 +0000', isRequireLogin: true, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/gd09rRl37B3sBsnfxmhfFg/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/the-banker/umc.cmc.2f8qhsa039voq5x0iwn1eixj1',
    description: 'In the 1960s, two entrepreneurs (Anthony Mackie and Samuel L. Jackson) hatch an ingenious business plan to fight for housing integration—and equal access to the American Dream. Nicholas Hoult and Nia Long co-star in this drama inspired by true events.'},
    { id: 16, tags: [3, 17], name: "Swan Song", favorite: true, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: false, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/k-4X4dDwJrtXlsgr1VI_0w/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/swan-song/umc.cmc.2u5ulzjcxh7e50uhichjjlsv6',
    description: 'In the near future, Cameron Turner is diagnosed with a terminal illness. Presented with an experimental solution to shield his wife and son from grief, he grapples with altering their fate in this thought-provoking exploration of love, loss, and sacrifice.'},
    { id: 17, tags: [3, 5], name: "The Greatest Beer Run Ever", favorite: false, date: '2023-08-14 11:54:25.843 +0000', isRequireLogin: true, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/-3oatvZH3fTAWNtggsbGGw/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/the-greatest-beer-run-ever/umc.cmc.54tpvwt1vapino8t6kulcf2d1',
    description: 'Chickie (Zac Efron) wants to support his friends fighting in Vietnam by doing something wild—personally bringing them American beer. What starts as a well-meaning journey quickly changes Chickie’s life and perspective. Based on a true story.'},
    { id: 18, tags: [3, 17, 16], name: "Causeway", favorite: true, date: '2023-03-24 11:54:25.843 +0000', isRequireLogin: true, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/06gcEVaDHOVnGqmfLk7tnw/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/causeway/umc.cmc.30p2zn6vd14159dorn1vo68el',
    description: 'Jennifer Lawrence stars as Lynsey, a soldier struggling to adjust back home in New Orleans following a traumatic injury. When she meets local mechanic James (Brian Tyree Henry), the pair begin to forge an unexpected bond.'},
    { id: 19, tags: [7, 22, 26], name: "It's the Easter Beagle, Charlie Brown!", favorite: false, date: '2023-03-11 11:54:25.843 +0000', isRequireLogin: false, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/4-mVBKfRd-dGaDbziyHPVw/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/its-the-easter-beagle-charlie-brown/umc.cmc.17y48i5ko6gft5ieh148nzqzn',
    description: 'Linus is certain that the Easter Beagle will bring eggs for everyone this year, but the rest of the gang is skeptical. Taking matters into their own hands, Peppermint Patty and Marcie try to make Easter eggs, while Lucy throws a private egg hunt.'},
    { id: 20, tags: [7, 22, 26], name: "The Boy, the Mole, the Fox and the Horse", favorite: true, date: '2023-03-12 11:54:25.843 +0000', isRequireLogin: true, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/QgCWMDxSbgEZGHw-VAibWA/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/the-boy-the-mole-the-fox-and-the-horse/umc.cmc.2aenzye90tqkj7iy0131oom9x',
    description: '2023 Oscar® winner: Best Animated Short Film. Charlie Mackesy’s bestseller comes to life in this beautifully animated film from NoneMore and Bad Robot Productions. Follow the unlikely bond between four friends on their journey to find home.'},
    { id: 21, tags: [4, 28], name: "Selena Gomez: My Mind & Me", favorite: false, date: '2023-03-13 11:54:25.843 +0000', isRequireLogin: false, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/CXnyehPcDHEauavhg0D79Q/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/selena-gomez-my-mind--me/umc.cmc.39yw4dp13gshxq5bt9fsl0o5y',
    description: 'After years in the limelight, Selena Gomez achieves unimaginable stardom. But just as she reaches a new peak, an unexpected turn pulls her into darkness. This uniquely raw and intimate documentary spans her six-year journey into a new light.'},
    { id: 22, tags: [4], name: "The Year Earth Changed", favorite: true, date: '2023-03-16 11:54:25.843 +0000', isRequireLogin: true, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/OeXxg-R9Hcn9LjMDvDWrwQ/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/the-year-earth-changed/umc.cmc.3fob3t7nfhehpb3ilgynzxmnu',
    description: 'Narrated by David Attenborough, never-before-seen footage shows how our living in lockdown opened the door for nature to bounce back and thrive. Across the seas, skies, and lands, Earth found its rhythm when we came to a stop.'},
    { id: 23, tags: [3, 17, 32], name: "Cherry", favorite: false, date: '2023-03-17 11:54:25.843 +0000', isRequireLogin: true, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/KdlcNbBUOtf7sUXH5z9N8A/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/cherry/umc.cmc.40gvwq6hnbilmnxuutvmejx4r',
    description: 'Cherry (Tom Holland) drifts from college dropout to army medic in Iraq—anchored only by his one true love, Emily (Ciara Bravo). But after returning from the war with PTSD, his life spirals into drugs and crime as he struggles to find his place in the world.'},
    { id: 24, tags: [4, 28], name: "Billie Eilish: The World’s A Little Blurry", favorite: true, date: '2023-03-10 11:54:25.843 +0000', isRequireLogin: false, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/t2SnaZ_kLZ6ABm8brw5doA/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/billie-eilish-the-worlds-a-little-blurry/umc.cmc.5waz3hfo9r1133t8arap8b6nq',
    description: 'Take a deeply personal look at extraordinary teenager Billie Eilish. Award-winning filmmaker R.J. Cutler follows her journey on the road, onstage, and at home with her family as the writing and recording of her debut album changes her life.'},
    { id: 25, tags: [4, 28], name: "Stephen Curry: Underrated", favorite: false, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: true, 
    src: 'https://is1-ssl.mzstatic.com/image/thumb/Io9kiHy63rDn0lXJuTK4gA/670x377.webp', 
    link:'https://tv.apple.com/pl/movie/stephen-curry-underrated/umc.cmc.23v0wxaiwz60bjy1w4vg7npun',
    description: 'The remarkable coming-of-age story of Stephen Curry—one of the most influential, dynamic, and unexpected players in basketball history—and his rise from an undersized college player to a four-time NBA champion.'},
  ];

  public readonly bookCollections = [
    { tags: [6, 11, 15, 32], name: "The Godfather", favorite: false, id: 1, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: false, 
    description: 'The Godfather is set in the 1940s and takes place entirely within the world of the Corleones, a fictional New York Mafia family. It opens inside the dark office of the family patriarch, Don Vito Corleone (also known as the Godfather and played by Brando), on the wedding day of his daughter, Connie (Talia Shire).',
    src: "https://cdn.britannica.com/55/188355-050-D5E49258/Salvatore-Corsitto-The-Godfather-Marlon-Brando-Francis.jpg", link: "https://www.amazon.pl/godfather-Mario-Puzo/dp/0099528126/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1IYF5UQE26S5J&dib=eyJ2IjoiMSJ9.ECF5xrFICYoMrpJzukFKCsPgCfmCiG36bP0YY01N9uxTZVetEZ2mqgtFIyYgREiQXRSa08jCqveONFZaodIVXm9NSoKH_Ynaj27MtPXwVD9wPLG-YqId5YBB3sld8b4zXT1acLM1FEmYPzxKywQ3KqseHIrfvJPNMSfohw-1YI8poQISiQa9XBpsitRQe6nub93bcq0w3xkzWzVr8OfPnezusY7Uo6z-gHhbHd-26dJYYW1gIO5gQMA7hwCmk8u2OuKyASWw7RWPHhSe98G0X852B_418MtVSl0kfBibTwE.nQDGQHF1VgMHtynZquoIOxHfkXf4tcvsqguHgPkiIz4&dib_tag=se&keywords=godfather+book&qid=1711954704&sprefix=god+father+book%2Caps%2C106&sr=8-1"},
    { tags: [16, 32, 2], name: "The Silence of the Lambs", favorite: false, id: 2, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: true, 
    description: 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.',
    src: "https://m.media-amazon.com/images/I/519n1y9Q9kL._SY344_BO1,204,203,200_QL70_ML2_.jpg", link:'https://www.amazon.pl/silence-lambs-Thomas-Harris/dp/0099532921/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2APFZGJ1BPQA3&dib=eyJ2IjoiMSJ9.8Klk_1MneSgsK3jE8ciylMsGDZsW1ydYL3EBozNbWdIwtz8lEAWOQo89YISjTZxK84X0OgB9YuTJkl1AkLFNFr2tqzGiJA-jNSXwLccAehAjec8Lo-ndq8TCtv-DkDMPB2HSgJ-9Nev7Gz05SAcMDftbSlvfL1olObCczAijezd0XT_mzL-xZkCKmKcRjVbxGjwrvHzZRgyGWJFw54xK_QpZ69W7ZWJ57MQCqRwI3kINoixYizll4WwZL-WFyS4_En6Z96c_CkASsCLFOAPlWJ6P9IjrSZAIkx2a1sKmYso.hxEIX4f6BwazMsACEyfcZLFk8s7sdhqpUcJRHSWXr7w&dib_tag=se&keywords=The+Silence+of+the+Lambs+book&qid=1711954919&sprefix=the+silence+of+the+lambs+book%2Caps%2C187&sr=8-1'},
    { tags: [5, 9, 15], name: "The Shawshank Redemption", favorite: true, id: 3, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: true, 
    description: 'In 1947, Andy Dufresne (Tim Robbins), a banker in Maine, is convicted of murdering his wife and her lover, a golf pro. Since the state of Maine has no death penalty, he is given two consecutive life sentences and sent to the notoriously harsh Shawshank Prison.',
    src: "https://m.media-amazon.com/images/I/51HX9XQ9HBL._SY344_BO1,204,203,200_QL70_ML2_.jpg", link:'https://www.amazon.pl/Rita-Hayworth-Shawshank-Redemption-Stephen/dp/1529363497/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3DG3NGD4ELUXK&dib=eyJ2IjoiMSJ9.VRQyq-YYNwZFfuyDkIOQuwKy9io69DZ-3rHViAXHxN2RycS_3aPe6MMqrzY24B3WeFeig9UDCYK21a4mNU5waAvLu0icVsQ2RtmFtEAvKfoUJRY47oF51_1rVXU3FQYx2VKGCoDElx1nOpvK8jEV04CJs7G5m-zargqO4bACaNjs-gpDuHn8mEANrYaDi9Otnb4HI8dmsXm8NVDMkF3PPPu8fL2NC9JSgeJ5kad5Ln5Ss66YT48bHj_oVpoPK0yLSQedSGnTMj1AkeQF2P-eqnKCVfB6k7-WOJ8UgL8jCRI.Hgg1IMsmi-I0mx-6avrBGkuOUze4RaGb520pmJ37xIk&dib_tag=se&keywords=The+Shawshank+Redemption+book&qid=1711955145&sprefix=the+shawshank+redemption+book%2Caps%2C108&sr=8-1'},
    { tags: [5, 24, 32], name: "The Da Vinci Code", favorite: false, id: 4, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: false,
    description: 'The Da Vinci Code follows symbologist Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris causes them to become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ and Mary Magdalene having had a child together.', 
    src: "https://flixable.b-cdn.net/hbo-max/large/us/the-da-vinci-code.jpg", link:'https://www.amazon.pl/Vinci-code-Robert-Langdon-Book/dp/0552159719/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2JW4JREQ4Y60K&dib=eyJ2IjoiMSJ9.HUVrp_v3tVgcdLYV5Kh4HYtJx2CBpxv8VP3Bj1lBNw0oU3CWHfFHD-ggklY3HAV-EpGWT5unS6f14AYBiDDQBYb5hdTzfCQDhAm-LLDDD0uUYhzQAAPqgCju1MI0KDfLCEPREpAuUa89Z4oeLBVhlP34vb8xjAJ3LpM5j9MkB_KfX9eZBMxv4jKkHZZmOkgvXfL7lwqEj_xrXbbqr_2N--FY4Ty390PXdtx2z5B95FRb-XCwZMefeLt3IUjB6pmOp85koKFrntJtdsBcPEhxYRgjJ3xBDaUlMOYTIiDrrPc.m7BYUIQqp3ExldrHKHn875o6wyKLCKGNANuGnOSibIg&dib_tag=se&keywords=The+Da+Vinci+Code+book&qid=1711955174&sprefix=the+da+vinci+code+book%2Caps%2C108&sr=8-1'},
    { tags: [32, 16, 15], name: "The Girl with the Dragon Tattoo", favorite: false, id: 5, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: false,
    description: 'On the surface, The Girl With The Dragon Tattoo is a simple mystery thriller, but on a deeper level, the book is an examination of the violent abuse of women in Sweden, focusing particularly on the warped philosophies and governmental failures that permit such acts.', 
    src: "https://m.media-amazon.com/images/I/41quWoJq+8L._SY344_BO1,204,203,200_.jpg", link:'https://www.amazon.pl/Girl-Dragon-Tattoo-genre-defining-introduced/dp/0857054031/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=15N3M6OFSIALN&dib=eyJ2IjoiMSJ9.h04eNPO-2osxZPUYXvJcKCJJ_SpHsfNmYYSawDhjLU9i9k-m6d2_5hIwnY7CTUyfVaqukTL3MyHZxKtn_DlYEnI6eLCSp979A0qxXP3kkOXOP5JGlSyoKDdp-9vCvbvBR_w-ndNSjUM-3WzzsTGVpo7k-OkE3hRpKqTjfX435YP59mMjxFX8LoF_IpmBVQP1mbAOcJLRr9hwc8_k3Gf78xCnbFNSLeLDlYrOGGYciJfseKYFP_EGgW_mcKoH3UY3T2rEm31JKc2RHn3KLhe2qqnVbuDmBvjvhHg38ITVQco.P4u5NJEOeAetth02dDDgFxeq73WeELWLvphjPHdbLWM&dib_tag=se&keywords=The+Girl+with+the+Dragon+Tattoo+book&qid=1711955199&sprefix=the+girl+with+the+dragon+tattoo+book%2Caps%2C188&sr=8-1'},
    { tags: [3], name: "To Kill a Mockingbird", favorite: true, id: 6, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: false, 
    description: 'Set in small-town Alabama, the novel is a bildungsroman, or coming-of-age story, and chronicles the childhood of Scout and Jem Finch as their father Atticus defends a Black man falsely accused of rape. Scout and Jem are mocked by classmates for this.',
    src: "https://m.media-amazon.com/images/I/51cTCiLMNAL._SX339_BO1,204,203,200_.jpg", link:'https://www.amazon.pl/Kill-Mockingbird-Harper-Lee/dp/B01M1OAGS7/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2V7L15R44QHUB&dib=eyJ2IjoiMSJ9.qJ0K3DHnYmmz8Kst62QijCZfTnzUQy0UgDq-L0EV2zei4FTUFcND3QoHso0-e5xpfhEGe2yb1nNtsnfiOuQL0rEPbHUiMwrURMyelhvIsgVQFwlJhRTPDDxNX1Pu5JtGot_TIXAvffE1UMGpkcdhNGs2kFUNKAHxkWNuJgMJAF_AwngVDyrUi2fKL_VEfaQVEPDQGBZNOHLWCqTO-gUS0KPGs5nNE3QO3WDQFRmI7UHMKYrKAJMIaz69shj0_wurMOa2usK8ipSa6CfiKWVn5qphA0SOJq_0fV5afBl3EYg.OpN9PN-n19U9uqAjDLeC4Xsshxqs3Ovf11OMXeU3Ftk&dib_tag=se&keywords=To+Kill+a+Mockingbird+book&qid=1711955225&sprefix=to+kill+a+mockingbird+book%2Caps%2C173&sr=8-1'},
    { tags: [3, 17], name: "One Hundred Years of Solitude", favorite: false, id: 7, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: true, 
    description: 'One Hundred Years of Solitude is the history of the isolated town of Macondo and of the family who founds it, the Buendías. For years, the town has no contact with the outside world, except for gypsies who occasionally visit, peddling technologies like ice and telescopes.',
    src: "https://m.media-amazon.com/images/I/51IfaP5qfoL._SY344_BO1,204,203,200_QL70_ML2_.jpg", link:'https://www.amazon.pl/One-Hundred-Years-Solitude-Gabriel/dp/0241971829/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=Y6KNBNCX5E7X&dib=eyJ2IjoiMSJ9.CAEDd-JPQ_PrOVLKhMxBt34IB1C2wNg9yjwid3_SfTasA3xfi3Vd6fRBaWyUsJk_9W7zqnlnimnyRVcsND-wlVE_UR-67mAkeWrnQ8MsI_4MBuNZm9pzukxYTHlVwwjm7oFHMFBAoLWxFwcO5pZLUAjE9D_X3S4Z59s-KM_E7eCwr0sC_6lcfKbPPFh3_yQvZxIb9rsQLqXFUO92X0IbYfxZy1PZmF5cAw3tA-ZwWwfu7SFb4MkNRX7wLBQ4qA4IJWtJ8OvGEJce7LA7JnMuH0WOQ7VzdD3R8zVBsjePM4E.WaEDXv9VEKbr2U4JyFgp77SuLnTPcHT6EgdMYyqmROE&dib_tag=se&keywords=One+Hundred+Years+of+Solitude+book&qid=1711955249&sprefix=one+hundred+years+of+solitude+book%2Caps%2C142&sr=8-1'},
    { tags: [3, 17], name: "The Great Gatsby", favorite: false, id: 8, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: true, 
    description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
    src: "https://m.media-amazon.com/images/I/41CPOyQP6xL._SX331_BO1,204,203,200_.jpg", link:'https://www.amazon.pl/Great-Gatsby-Francis-Scott-Fitzgerald/dp/9083127036/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3FS4BYYRC30LA&dib=eyJ2IjoiMSJ9.V7hZhvo70ynjtdx-rMhCRqVKsVZSEz38FO4Sdi4md6hXFnTs9O-4clh2E20jZzHI8UGa6m3MWo0IjzwrDDgc-Cm8iYmfjFuyV2cwjJ6m4QE6Nf9d9m_E_VAjopQpVX37Ep21j7S6oGsdR8WeQ9myzBid4ikGY0ZSDMH_1JeyR7D9PNU0xHNafMFbhogAu8kNaml6F-t9RM4ndTT5ADF1fL__o6doBZOusnWHCmHFnjewMs8enoRWPLVjAVHDxGPfdANtwmoOXCtO18eIk4SSgG4Q7PzLdt5J1sbNfH3Li1Q.eruBUtVaXba21vH24UlKi91l8xxZ3JPu8knJTBd8_Mk&dib_tag=se&keywords=The+Great+Gatsby+book&qid=1711955275&sprefix=the+great+gatsby+book%2Caps%2C135&sr=8-1'},
    { tags: [31, 26, 19, 15, 12, 1, 5], name: "Jurassic Park", favorite: true, id: 9, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: false, 
    description: 'A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park\'s cloned dinosaurs to run loose.',
    src: "https://m.media-amazon.com/images/I/513qk1TGinL._SX323_BO1,204,203,200_.jpg", link:'https://www.amazon.pl/Jurassic-Park-multimillion-bestselling-thriller/dp/1784752223/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=10SJXT7D3QT6Y&dib=eyJ2IjoiMSJ9.9Nh_4AwcsfHBTVgd2aL0lGJmLYDSrsbKqV0EzQuioj2CTY5xo2eJnzqISwM73D1nYfsOgY8j7I_-3X0rcakYKrXTNLL9AzIvTnvDAYrUkaXLv5ZfQbWpTN4ON-6ksf_OuLPL232VsOjgcUyiNEMXPN2GQQq4rfcskGSzOkIp4DymxkN9RyuqENC4i6Grx9Bo5eqj0pixa37X6ZQuzaomH4XBxbygSTz-qyUShWM2xSNAHhLaTh_URTlzGeefcNdkp2D_mOPW4wMcBxX8yKtGppHRX4VFTUkjRq64_E-36Ls.EMZ6xqpGICkudwrEEY6K-zw6J6dvrJAXu0Xr7mFAp_w&dib_tag=se&keywords=Jurassic+Park+book&qid=1711955298&sprefix=jurassic+park+book%2Caps%2C156&sr=8-1'},
    { tags: [2, 16], name: "The Shining", favorite: true, id: 10, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: false, 
    description: 'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.',
    src: "https://m.media-amazon.com/images/I/51jSPyJ8v2L._SY344_BO1,204,203,200_QL70_ML2_.jpg", link:'https://www.amazon.pl/shining-Stephen-King/dp/1444720724/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1Z4LMSPER5H&dib=eyJ2IjoiMSJ9.Z7VdcWb7tBaWQ1e8Lwn9KUZQwvCLRPiA93XcpJDGyNDj2PldwKdhxrRekelQUu8-En5pONWxGLkY9CZciR0F5uW9ZQyBWhg_9OwAW3W_UhopOO7e_4ZAD1V127pod4_KKnWFywMlhcOJyaOyk8EhqLPHCWxXxdi0rm6vrlwWxLLvOYfc6cuU-jiTdGC0VtscLYKLQv165nnGzF-PIKYmxv0riQzzG1Fcl2prKQBBjBj6YmPdrgA-mnvh8inHS-IJu_FTPL1LjI_wpqIB4cdlfqGTqgi4-yHXs58Rd2xtFSs.9NHg8TK5AJW5_60lEC339MjdKG5ttpPOYG-dGpQneVc&dib_tag=se&keywords=The+Shining+book&qid=1711955320&sprefix=the+shining+book%2Caps%2C191&sr=8-1'},
    { tags: [3, 5, 12, 31], name: "The Martian", favorite: false, id: 11, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: false, 
    description: 'The Martian by Andy Weir follows astronaut Mark Watney, who is mistakenly left behind on Mars after a dust storm forces his crew to evacuate. With limited supplies and ingenuity, Watney must find a way to survive on the desolate planet while NASA works tirelessly to bring him home.',
    src: "https://m.media-amazon.com/images/I/51Bw27SCLDL._SY498_BO1,204,203,200_.jpg", link:'https://www.amazon.pl/Martian-international-bestseller-Oscar-winning-blockbuster/dp/1785031139/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=E0QUN5HBA082&dib=eyJ2IjoiMSJ9.0CMbMeW-4C-ATB4oJflHgEM1kCsjlYhz-b-cGyJ7i_M8ZP_AR2MqEUtWqqvv3u8-yacUJ1Jt1yOJD9mdebPwNNCYiown8HlIqJCozzqWjb2isg3SJDzOSbIIUlg9uD6YJtFCKYh5GZ9SzLzJmhTVU5ykpRFTQm2iaVWP-olry3vB_gkQYgJgLm85TR0R4nBj0aWUCCjjESc210v8BavtrVrf6FnUSaj8ZLXkfNfK1ClDJgBQrK_AP3p20tZN3sCG1uW2myry8gTtd4V2GVpsj08T65DeHHEwtdOUmWFM6JY.-3y_BI3sVdP4ttX9NT1QkwzaeaVhcxM12SSp9UYucyk&dib_tag=se&keywords=The+Martian+book&qid=1711955348&sprefix=the+martian+book%2Caps%2C158&sr=8-1'},
    { tags: [26, 20, 15, 19, 11], name: "The Hobbit", favorite: false, id: 12, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: true, 
    description: 'The Hobbit is set in Middle-earth and follows home-loving Bilbo Baggins, the hobbit of the title, who joins the wizard Gandalf and the thirteen dwarves of Thorin\'s Company, on a quest to reclaim the dwarves\' home and treasure from the dragon Smaug.',
    src: "https://m.media-amazon.com/images/I/41DfP7NpIIL._SX327_BO1,204,203,200_.jpg", link:'https://www.amazon.pl/hobbit-There-back-again/dp/0007458428/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=ZTU5MS9ZKKRF&dib=eyJ2IjoiMSJ9.OZUuxbFouab6VvYVV2VWNuTPL3oN4kTKA6HXzmGxLHgKlCPekLuuptqog_mitdA3pEvjCVaB_eXfYk5QfmmDZKV8J0-FhHziyTRpvCn7M7V5wyzeN6eu6uv_FLewREzLOzR3p-PDaDNA3DedqieeV0TX6RSIPy6ySzjD6IF5wGHNRUQ_aeQ51txmQXiMylGH9Mom7qlrfaVwMFZiWGVDlzTNRrrdz5eSp-ULPvXBOyLowdRQglcQX6L3zFkiL0w1ZzLi_l_mc38S12orpZWOVV3CP07nDgY4bSuppUviJtM.HnHfa2sKlzXX_FPaTu1gZO0aDpvrMPCeTtrMh8QpgBM&dib_tag=se&keywords=The+Hobbit+book&qid=1711955370&sprefix=the+hobbit+book%2Caps%2C127&sr=8-1'},
    { id: 1, tags: [26, 20, 15, 19, 11], name: "The Lord of the Rings", favorite: true, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: true, 
    description: 'A hobbit named Frodo inherits the One Ring, which can destroy the entire world. With the recently reawakened evil, being Sauron, going after the Ring to cement his reign, Frodo joins with eight others to destroy the Ring and defeat Sauron.',
    src: 'https://deadline.com/wp-content/uploads/2022/08/lord-of-the-rings-feature-image.jpg?w=1000', link:'https://www.amazon.pl/Lord-Rings-Special-Illustrated-Tolkien/dp/0008471282/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=J6VA6VB7C4MX&dib=eyJ2IjoiMSJ9.i73an5qEr-Tbu97NqWFvwHxFVq5SA_4mGXKy5Ekjw8m-n__b2M_iG9kLd7XYzfhNXdMD18PRXFOxqoUoExVC_iGrVsV0JTRWITFrt3srp0jY4XA1YGlAMJYEIsc1UEmFAGty1gclzLihniRfELz5pBVjorlzxdRAeGZcRXWknMd9s54jDf1Lk8DfbFxS0mgtEvI4NNFsTXWbYaYsOf7xfK5liPjVHtLbrMPvKmMjZMLVWGU7WVGb35F5CoQUhDt4TBuRu5tifDO8wXApaxcygmhlwTKrmFd4L96WWUMdugo.-0MrQ5TXuCBMuKFZ3TpwSTkm2L1oynAL2lk7yZgiYHE&dib_tag=se&keywords=The+Lord+of+the+Rings+book&qid=1711955396&sprefix=the+lord+of+the+rings+book%2Caps%2C171&sr=8-1'},
    { id: 2, tags: [3, 5], name: "The Hunger Games", favorite: false, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: false, 
    description: 'The nation of Panem is divided into 12 districts, ruled from the Capitol. As punishment for a failed revolt, each district is forced to select two tributes, one boy and one girl between the ages of 12 and 18, to fight to the death in the annual Hunger Games until there is only one survivor.',
    src: 'https://m.media-amazon.com/images/I/61wOt39gY6L._AC_UF1000,1000_QL80_FMwebp_.jpg', link:'https://www.amazon.pl/Hunger-Games-1-Suzanne-Collins/dp/1407132083/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2GWIMC7HMH6OV&dib=eyJ2IjoiMSJ9.MJeistJvDT9dE6A97wDwwqqtCrMl5-YO6G8HgyDQE7Cy4gxlJBm2NzIBjlk1o9fSEKKUjEjyD4KvEEq2TnOuShOEaxMF6T_pTvskEQbMPZHnoKtA5i4XefFpHZYdhVMKl2LMvBduyt529Q7-_Uk00xl3B1ZVsWSZEdorwvgCuJL_FCeNA194VJghiXSp8IDC0R9boFa0gRCkozjWjF5t_kLMSxFPP-qtRQvhjKlvcxP2741xgJhuEvxl32Gt3p_Uf6-iNejfjbcfUfQ8nlHj9Ygn8xO89fUNEo1QbMq0t2w.0UcXM2dMW0QTAMb_RDbGVlqkS7qAd6A66E05p_sC4OA&dib_tag=se&keywords=The+Hunger+Games+book&qid=1711955420&sprefix=the+hunger+games+book%2Caps%2C166&sr=8-1'},
    { id: 3, tags: [26, 19, 11, 5], name: "The Chronicles of Narnia", favorite: true, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: false, 
    description: 'The series is set in the fictional realm of Narnia, a fantasy world of magic, mythical beasts and talking animals. It narrates the adventures of various children who play central roles in the unfolding history of the Narnian world.',
    src: 'https://cdn.vox-cdn.com/thumbor/wknjWA1eDuRCKcOhtiFWMWXTcww=/0x0:1686x816/1200x800/filters:focal(668x248:936x516)/cdn.vox-cdn.com/uploads/chorus_image/image/61633721/narnia.0.jpg', link:'https://www.amazon.pl/Chronicles-Narnia-seven-bound-together/dp/0007117302/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=24VG22MKQWURX&dib=eyJ2IjoiMSJ9.pwMqK0c5nt1A2Ptnt7gB6WhegFT1rQRcTHSWzVN1ZxciLbbUTDMLSenKK9LpumawuG_9wWo-qwKC0ngaMpJspXGLWFnZGdqkh5PtgrSrx4nrbNE95MK8yKml1bdWrB-bpXMQlYGq6NYEXjf46IzjxwC8XWanhtv5uIYxGH8_mnCX8pjX_S1GJyA7bipu-4ZuSKobzA8C9UKf6OZUtS-XHGhidXpmC2QcMWWYZsUo7yLgWRLS155TYAogGHNWr1Da666-Ayhtf_kYJSRPBcIYoWKVFbdh0IBt9fRU0VHNgag.5kbOwXEYsII_VtwTY7WUd2s3emRx4yFWSxiJO8p7y9k&dib_tag=se&keywords=The+Chronicles+of+Narnia+book&qid=1711955446&sprefix=the+chronicles+of+narnia+book%2Caps%2C232&sr=8-1'},
    { id: 4, tags: [5, 19, 20, 26], name: "Harry Potter", favorite: false, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: true, 
    description: 'The novels follow Harry Potter, an 11-year-old boy who discovers he is the son of famous wizards and will attend Hogwarts School of Witchcraft and Wizardry. Harry learns of an entire society of wizards and witches.',
    src: 'https://m.media-amazon.com/images/I/91r0dvXhNGL._AC_UF1000,1000_QL80_FMwebp_.jpg', link:'https://www.amazon.pl/Harry-Potter-philosophers-stone-Rowling/dp/1408855658/ref=sr_1_7?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=JX4FTKXM7KDO&dib=eyJ2IjoiMSJ9.jUc9-U4RVJiIqNgreYCl8srIPXOMu8i5vGN6Cqnt9zjbNxA-UgU1iKDXzVMTYcfCs005HTxvI_-eyQbnpIYw51uqaTxyZMByABL9CGnwf5SK5ziQAMnUGfUM_IUt5Zaki2bl2JCo1COpYAvJyQc2DJOAn_-Ta0Xq1G9j9dh81O10GnKupGn13BkSN1BrDGUC8oFUXbbxwLezFP1nffM_kGgISouY21aZHqUWffGlm_y1CC9_LTyQA6WkruonMKKiOdZ8EqLrpPHtJQQecIJ-LgyydtTE1EYsMsv3bRct8dM.ODOLpueq-sPI_FMs3OINjxMPeCfj5h3L-0MyP5y7p54&dib_tag=se&keywords=Harry+Potter+book&qid=1711955473&sprefix=harry+potter+book%2Caps%2C136&sr=8-7'},
    { id: 5, tags: [1, 5], name: "The Hitchhiker's Guide to the Galaxy", favorite: false, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: true, 
    description: 'The plot of The Hitchhiker\'s Guide to the Galaxy follows events in the life of Arthur Dent, a man who lives on Earth in England. He is whisked off into an adventure in space by his friend Ford Prefect (who is from another planet) who tells him that Earth is about to be destroyed.',
    src: 'https://m.media-amazon.com/images/I/91lFJOYspuL._AC_UF1000,1000_QL80_FMwebp_.jpg', link:'https://www.amazon.pl/Ultimate-Hitchhikers-Guide-Galaxy-Douglas/dp/1529051436/ref=sr_1_2?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2YUR55FQO3GS3&dib=eyJ2IjoiMSJ9.MuZVW-oSVG41kvjGVeLY3bJt8OBWePPnyPIiVfPbRlOMohaf3K6YgqORPsyHJVqvjGm6shiCwH-NfIq0rGoFwrj-oQBR4T3VREXanGL3FSjEXUmVUE6KF-4leD468hztG4CP6jk16FdQP42LJbkEXUo701-O7r8zhL_CMbnlmprT_8jIi3MOHVyGDYyhKFlqhpLMm91Navyg-aLfwicgYlv1qbVZCF8B7js1KzuF1fS_aSaZxVYeMDUBb9uvW7tI1alKAk91M4tpks3WWzboBkWkM7Ppb9wcarM6w7bzJlU.S8qMlYXrkmgEh3qesBQ89WYdnwjb21uDL_YQCsvVwwA&dib_tag=se&keywords=the+hitchhiker+%27s+guide+to+the+galaxy+book&qid=1711955502&sprefix=the+hitchhiker%27s+guide+to+the+galaxy+book%2Caps%2C149&sr=8-2'},
    { id: 6, tags: [16, 11, 5], name: "Game of Thrones", favorite: false, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: false, 
    description: 'Game of Thrones follows a large cast of characters and interwoven story arcs. It is primarily set on the fictional continent of Westeros, which is divided into the Seven Kingdoms and the lands in the far North beyond “the Wall,” an enormous wall of fortified ice.',
    src: 'https://m.media-amazon.com/images/I/91hPXkwnaeL._AC_UF1000,1000_QL80_FMwebp_.jpg', link:'https://www.amazon.pl/Game-Thrones-Continues-Volumes-Complete/dp/0007477155/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=57TAT3JVTJGG&dib=eyJ2IjoiMSJ9.Dyzr3Ryp9SuVyleaHCUV2V3JfWDilQPS7WYUIj1TTZKNo5eSr7rbiag4TmLIRgPp5rIBQObeM60lvy7nIeF_O_SAbJ20JAVHluqURtQkNpI8OTqJDKnIK00uRUoOqTgIxuqt6h0X5eCUKiENRAirNmXn60DcRpklWzJWtBOtLCUJrq48m5XLso_mHdvDKDwXpzFoabRIbnTwSk4FlipT6Ab6rOZFZsHoRsuy6Gx8Q7TO1ofkhRZcOQN0JA-kFx2JM_COEhzz91G38mj9fWC6bT3ul8UL8WTMZDnxfDXpnCU.rXsJH31JPadKoIBNAaYeFQZ2VhZfv_QNcbyQ8mtzx98&dib_tag=se&keywords=Game+of+Thrones+book&qid=1711955543&sprefix=game+of+thrones+book%2Caps%2C176&sr=8-1'},
    { id: 7, tags: [3, 13], name: "Percy Jackson and the Olympians", favorite: true, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: false, 
    description: 'Percy Jackson and the Olympians follows Percy, a troubled tween with unexplainable powers. In each installment, Percy finds himself face-to-face with formidable new foes as he comes into his own, amassing loyal allies and burgeoning new abilities throughout his journey.',
    src: 'https://m.media-amazon.com/images/I/91AXiPhTuoL._AC_UF1000,1000_QL80_FMwebp_.jpg', link:'https://www.amazon.pl/Percy-Jackson-Olympians-Book-One/dp/1368098169/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=EQ37K1LPSU27&dib=eyJ2IjoiMSJ9.jwqgr7KssZPhr0kg02QY-SJffBmuuH2c_wsPeDiRzJLqj4e22VDhAh-Mi-GxJuA5JwXRwWIv75TKu2utAJ66ruSDa7my25u1W52yAd1xVR3Npgxc2QPrrwWKbsEx6ZhKxHUiJ3TtIecRHl_YHPDDHDh0HgktBpVRZ0WgD7xsC2lU_-bQMYNy7RA9xEv2-2rwKlNKmo3SMGRqNPaBVo2TF3-eqGZOzfvV4DaAIexefpVoPa4mN_TK2IbAkG1IplCZZdeNNHQhxhg6O0uZeYvCyjeRPc18DasezG22bWRNV2k.UeVKeekvJqYEhV2CSP7eyJdzyyf7iSvZev-h71fAlZ8&dib_tag=se&keywords=Percy+Jackson+and+the+Olympians+book&qid=1711955565&sprefix=percy+jackson+and+the+olympians+book%2Caps%2C201&sr=8-1'},
    { id: 8, tags: [2, 16], name: "The Dark Tower", favorite: false, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: false, 
    description: 'The Dark Tower series tells the story of Roland Deschain, Mid-World\'s last gunslinger, who is traveling southeast across Mid-World\'s post-apocalyptic landscape, searching for the powerful but elusive magical edifice known as The Dark Tower.',
    src: 'https://m.media-amazon.com/images/I/715ViOMJmIL._AC_SX444_SY639_FMwebp_QL65_.jpg', link:'https://www.amazon.pl/Dark-Tower-Gunslinger-Stephen-King/dp/1501143514/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=35QQU8YCKP68R&dib=eyJ2IjoiMSJ9.o-V-7G7JwJurZeQjHria8WPIrGFp_WvPfvvf673gjMNyxGVxtNfpuauMcGtf84TC0xxyKXJJ0ilcdWtGCBr064LD8f1IUEfOdBPOdgRpNsVT1lhQ7mRPG8qucFWPYuwsirhl_VeJvDnw__gt4WFQ9VGxo3fRdOv9mga5yWa_RX2KiyFO1oB9FPcigMA6R28sDq_jzC8BUttpKQ7vedFO7u1JU_0e-K7g4hT3vvlMeG0tngBILObAg7IHsYHl_LBn67uRe8U9CHz4jKmu4r7waia089cDIiiWt7QFcaMfroU.mr4i-w38dbgGNq_rbXNAscNiowkxz2sp8-hRL77nfSc&dib_tag=se&keywords=The+Dark+Tower+book&qid=1711955589&sprefix=the+dark+tower+book%2Caps%2C167&sr=8-1'},
    { id: 9, tags: [5, 19], name: "The Wheel of Time", favorite: true, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: true, 
    description: 'The Wheel of Time is a novel from the modern fantasy genre, specifically high fantasy. The book is set in a world that is simultaneously the distant past and distant future of the real world, as a result of time being cyclical rather than linear.',
    src: 'https://m.media-amazon.com/images/I/51jQChB+fmL._AC_UF1000,1000_QL80_FMwebp_.jpg', link:'https://www.amazon.pl/Wheel-Time-Box-Set-Dragon/dp/0356518434/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1U84DW45JLWLI&dib=eyJ2IjoiMSJ9.83TbPGAs9F3LY3MMOXbGcIHLJADmHESGodHTeu9UdxiJ5ecYHtP4o0irPZB9OiNZxoVrymhMM0ah2M8SMOHls6WKW2Xp5Tfh-3VO8CopTR79BgmV5F1QbmDQm-dfsWoddWkEtwURYkZ7nxIkOkMmy9jYcsDtjXuekcmXNWZJET8GXGRI748UVbiYBNTtDsIIFqNug_9LpP16pYssknvNtwrN3T48uIJp_B0ze1psSDCXti1GgrLdG93QJNAiY0tTcAfVPl3VviszndvrzUwFz0Jns-gpIQ0ACTriNLq5jo4.oF9f8uA7a1MY05bgVaLgXcasKQyBTq5WkWuYdM-ZZQY&dib_tag=se&keywords=The+Wheel+of+Time+book&qid=1711955616&sprefix=the+wheel+of+time+book%2Caps%2C155&sr=8-1'},
    { id: 10, tags: [3, 5, 9, 11], name: "Dune", favorite: true, date: '2023-03-14 11:54:25.843 +0000', isRequireLogin: false, 
    description: 'Dune, science fiction novel by American author Frank Herbert, serialized in Analog from 1963 to 1965 and then published in book form later in 1965. Dune follows young nobleman Paul Atreides through adversity to his destiny as a messianic leader on the arid desert planet Arrakis.',
    src: 'https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_FMwebp_.jpg', link:'https://www.amazon.pl/Dune-now-major-blockbuster-film/dp/0340960191/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1DY9841C0NT9H&dib=eyJ2IjoiMSJ9.0hWthGk1HgUipndPWxLuYY8yT4q16Ji9u9v_XlroQ3LfRpuIQJMBHHGV2Oib3pVyFgD_cXCsFlT0Py2qUkNiD13TrUiDuFrM_4Dx9RYQG42K12pkzjuU-g_vL8cnU2rDRbG91vyK8SIxsjs_Sw65XbWVJx5qK1B87aYs0prkXy22J2s7OJfxxpsG1-bYGj71QH_3Ms4LY2MRTtEEkKLCErbnlVxpJWz7R9huCcJz99Nqh-TtnpLAGevh5185ExRdqQW4vH4RrPFQgCZjJgXiDnqgtxcomTqaKf1d6iTJ8Jk.4tFolEegK-Tr8uRE_9sVp5obAfUmctwArWG-PnU5NGI&dib_tag=se&keywords=Dune+book&qid=1711955639&sprefix=dune+book%2Caps%2C166&sr=8-1'},
    { id: 11, tags: [3, 15, 16], name: "The Mortal Instruments", favorite: false, date: '2021-05-02 03:51:31.843 +0000', isRequireLogin: false, 
    description: 'The plot revolves around a teenage girl named Clary Fray, who begins to see a world she never knew existed. After a series of events, she meets with the mysterious Shadowhunters, who are a group of demon hunters. Together, they try to figure out what is going on with Clary and why she can suddenly see their world.',
    src: 'https://m.media-amazon.com/images/I/91VelHkK8yL._AC_UF1000,1000_QL80_FMwebp_.jpg', link:'https://www.amazon.pl/Mortal-Instruments-1-6-Slipcase/dp/1406359823/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=16GC1CY3Q75AP&dib=eyJ2IjoiMSJ9.pZz-gwvtRPBOavNPwAa8O0G4J_p_Arz1QTh9j-BZIOYGQGucAzvUOjjresP7v6v8MtXggDaNw1c7VFHa7tck1D2QYG-_zU3VK1Ajj3X5Zy_M_BeyXPIPJIlb0Hy_4b72CqLtQk7PGdSkbzqIe6QOaTdJdFuSEVT9Q2nBq76Ow1Iv8qgz7XMCI5AD2Shb_nfJ9RoRfbu_9fYqoG5iUxlL07x1x4tUsVZ46Cfn0nRueypqXxr3czpEV_YOz3lvsu9TU4KqbdxxtC6Wy35BEdfMYKQFQ9wlLO1Mw-hzqXJ1mjs.8QEmewEtz6BSqY3p64PRZP6sjKBi6Go35_hR4FmJIPg&dib_tag=se&keywords=The+Mortal+Instruments+book&qid=1711955658&sprefix=the+mortal+instruments+book%2Caps%2C142&sr=8-1'},
    { id: 12, tags: [5, 16, 2], name: "The Maze Runner", favorite: false, date: '2019-11-02 11:52:31.843 +0000', isRequireLogin: true, 
    description: 'Thomas is deposited in a community of boys after his memory is erased, soon learning they\'re all trapped in a maze that will require him to join forces with fellow "runners" for a shot at escape. Thomas wakes up in a strange elevator, with memories lost and no idea what is going to happen.',
    src: 'https://m.media-amazon.com/images/I/71IkcEies6L._AC_UF1000,1000_QL80_FMwebp_.jpg', link:'https://www.amazon.pl/Maze-Runner-multi-million-bestselling-major/dp/1909489409/ref=sr_1_1?__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1IBD5EREQF1XV&dib=eyJ2IjoiMSJ9.oPAPe3X-KCEXS5CsghzNiHOYoiSH2ORwhVF8NZBus66gV9apu6RP0l3DGv9gWtYljtPRWqBJMOExK-EqG4y_oBq__ERvXfgW5r1AQFGguv-guLsWNAwkfjUsPLgVKaoS2sKSYLRzwOpY6Po8eV32JJBghqWBAoEfovcND31INz6k_pYC4zWbBJpUOArA9MJx2rRca9vgysSD4N8F2eV_DwdkrM3TpsK6OJpRIc6nZAAGDxGk2vimDzF1UylNsFrS2SlaisBGFViqeFKOOJXMnpkldL81hKAsNPBabbcCtfM.IG-p2rslqE_7akevO5-lc-QgNX_QtI7fArOKDs08xfo&dib_tag=se&keywords=The+Maze+Runner+book&qid=1711955692&sprefix=the+maze+runner+book%2Caps%2C148&sr=8-1'}
  ];

  constructor() {
    this.addPopular(this.moviesCollections);
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

  shelvesObs$ = from(this.moviesCollections)
  .pipe(
    toArray()
  );

  booksObs$ = from(this.bookCollections)
  .pipe(
    toArray()
  );
}
