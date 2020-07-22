import { Injectable } from '@angular/core';

export interface MemoryCardInterface {
  cardNumber: number;
  image: string;
  flipped: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MemoryService {

  private memoryCards: MemoryCardInterface[] = [
    {
      cardNumber: 0,
      image: '/img/cards/0.png',
      flipped: false,
    },
    {
      cardNumber: 1,
      image: '/img/cards/1.png',
      flipped: false,
    },
    {
      cardNumber: 2,
      image: '/img/cards/2.png',
      flipped: false,
    },
    {
      cardNumber: 3,
      image: '/img/cards/3.png',
      flipped: false,
    },
    {
      cardNumber: 4,
      image: '/img/cards/4.png',
      flipped: false,
    },
    {
      cardNumber: 5,
      image: '/img/cards/5.png',
      flipped: false,
    },
  ];

  private shuffle(){
    let temp;
    let randomPos;

    for (let pos in this.memoryCards){
      randomPos = Math.floor(Math.random()* this.memoryCards.length);
      temp = this.memoryCards[pos]
      this.memoryCards[pos] = this.memoryCards[randomPos];
      this.memoryCards[randomPos] = temp;
    }
  }
  getData() {
    this.shuffle();
    return JSON.parse(JSON.stringify(this.memoryCards));
  }
}
