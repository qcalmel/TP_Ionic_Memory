import { MemoryCardInterface } from './../services/memory.service';
import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../services/memory.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.page.html',
  styleUrls: ['./memory.page.scss'],
})
export class MemoryPage implements OnInit {
  public memoryCardList: MemoryCardInterface[];

  constructor(public memoryService: MemoryService,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  private firstClickedCard: MemoryCardInterface;
  private firstClickedCardPos: number;
  public tryCount: number;
  private revealTimer
  public pairComplete: number;

  private reset() {
    this.memoryCardList = []
    console.log(this.memoryCardList);
    this.memoryCardList = this.memoryService.getData();
    setTimeout(() => {
      for (let card of this.memoryCardList) {
        card.flipped = false
      }
    }, 2000);
    this.tryCount = 0;
    this.pairComplete = 0
  }
  ngOnInit() {
    this.reset()
  }

  private async winMessage() {
    const win = await this.alertCtrl.create({
      header: 'Gagné !',
      message: `Vous avez réussi en ${this.tryCount} coups`,
      buttons: [{
        text: 'Rejouer',
        handler: () => {
          this.reset()
        }
      }]
    })
    win.present()
  }

  public revealCard(pos) {
    if (this.memoryCardList[pos].flipped === false) {
      this.memoryCardList[pos].flipped = true

      if (!this.firstClickedCard) {
        this.firstClickedCard = this.memoryCardList[pos];
        this.firstClickedCardPos = pos

        this.revealTimer = setTimeout(() => this.memoryCardList[pos].flipped = false, 1000);
      } else {
        this.tryCount++
        if (this.memoryCardList[pos].cardNumber === this.firstClickedCard.cardNumber && pos != this.firstClickedCardPos) {
          clearTimeout(this.revealTimer)
          this.memoryCardList[pos].flipped = true;
          this.firstClickedCard.flipped = true
          this.firstClickedCard = null
          this.pairComplete++
          if (this.pairComplete === this.memoryCardList.length / 2) {
            this.winMessage()
          }
        } else {
          setTimeout(() => this.memoryCardList[pos].flipped = false, 1000);
          this.firstClickedCard = null
        }

      }
    }
  }
}
