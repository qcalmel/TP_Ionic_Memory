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
      image: '/assets/img/cards/0.png',
      flipped: true,
    },
    {
      cardNumber: 1,
      image: '/assets/img/cards/1.png',
      flipped: true,
    },
    {
      cardNumber: 2,
      image: '/assets/img/cards/2.png',
      flipped: true,
    },
    {
      cardNumber: 3,
      image: '/assets/img/cards/3.png',
      flipped: true,
    },
    {
      cardNumber: 4,
      image: '/assets/img/cards/4.png',
      flipped: true,
    },
    {
      cardNumber: 5,
      image: '/assets/img/cards/5.png',
      flipped: true,
    },
  ];
  private memoryCardsPairs = this.memoryCards.concat(this.memoryCards)
  private shuffle(){

    let temp;
    let randomPos;

    for (let pos in this.memoryCardsPairs){
      randomPos = Math.floor(Math.random()* this.memoryCardsPairs.length);
      temp = this.memoryCardsPairs[pos]
      this.memoryCardsPairs[pos] = this.memoryCardsPairs[randomPos];
      this.memoryCardsPairs[randomPos] = temp;
    }
  }
  getData() {
    this.shuffle();
    return JSON.parse(JSON.stringify(this.memoryCardsPairs));
  }
}
