import { MemoryCardInterface } from './../services/memory.service';
import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../services/memory.service';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.page.html',
  styleUrls: ['./memory.page.scss'],
})
export class MemoryPage implements OnInit {
  public memoryCardList: MemoryCardInterface[] = [];
  constructor(public memoryService: MemoryService,) { }

  private firstClickedCard : MemoryCardInterface;
  private firstClickedCardPos : number;
  public tryCount : number = 0;
  private revealTimer
  public pairComplete : number = 0;

  ngOnInit() {
    this.memoryCardList = this.memoryService.getData();
    setTimeout(()=>{
      for(let card of this.memoryCardList){
        card.flipped = false
      }
    }, 2000);
  }
  public revealCard(pos){
    this.memoryCardList[pos].flipped = true
    
    if(!this.firstClickedCard){
    this.firstClickedCard = this.memoryCardList[pos];
    this.firstClickedCardPos = pos
    
    this.revealTimer = setTimeout(()=>this.memoryCardList[pos].flipped = false, 1000);
    }else{
      this.tryCount++
      if(this.memoryCardList[pos].cardNumber === this.firstClickedCard.cardNumber && pos != this.firstClickedCardPos ){
        clearTimeout(this.revealTimer)
        this.memoryCardList[pos].flipped = true;
        this.firstClickedCard.flipped = true
        this.firstClickedCard = null
        this.pairComplete++
      }else{
        setTimeout(()=>this.memoryCardList[pos].flipped = false, 1000);
        this.firstClickedCard = null
      }

    }
    console.log(this.firstClickedCard);
  }
}
