import { Injectable } from '@angular/core';
// Création d'une interface pour les cartes
export interface MemoryCardInterface {
  cardNumber: number;
  image: string;
  flipped: boolean;
  animation: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  // Création du tableau des cartes
  private memoryCards: MemoryCardInterface[] = [
    {
      cardNumber: 0,
      image: '/assets/img/cards/0.jpg',
      flipped: true,
      animation: true,
    },
    {
      cardNumber: 1,
      image: '/assets/img/cards/1.jpg',
      flipped: true,
      animation: true,
    },
    {
      cardNumber: 2,
      image: '/assets/img/cards/2.jpg',
      flipped: true,
      animation: true,
    },
    {
      cardNumber: 3,
      image: '/assets/img/cards/3.jpg',
      flipped: true,
      animation: true,
    },
    {
      cardNumber: 4,
      image: '/assets/img/cards/4.jpg',
      flipped: true,
      animation: true,
    },
    {
      cardNumber: 5,
      image: '/assets/img/cards/5.jpg',
      flipped: true,
      animation: true,
    },
  ];

  // Création des paires dans un nouveau tableau
  private memoryCardsPairs = this.memoryCards.concat(this.memoryCards)

  // Fonction qui va mélanger les cartes à chaque début de partie
  private shuffle() {

    let temp;
    let randomPos;

    for (let pos in this.memoryCardsPairs) {
      randomPos = Math.floor(Math.random() * this.memoryCardsPairs.length);
      temp = this.memoryCardsPairs[pos]
      this.memoryCardsPairs[pos] = this.memoryCardsPairs[randomPos];
      this.memoryCardsPairs[randomPos] = temp;
    }
  }

  // Fonction qui va récuperer les cartes sous forme de tableau
  getData() {
    this.shuffle();
    return JSON.parse(JSON.stringify(this.memoryCardsPairs));
  }
}
