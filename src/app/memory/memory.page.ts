import {MemoryCardInterface} from '../services/memory.service';
import {Component, OnInit} from '@angular/core';
import {MemoryService} from '../services/memory.service';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-memory',
    templateUrl: './memory.page.html',
    styleUrls: ['./memory.page.scss'],
})
export class MemoryPage implements OnInit {


    constructor(public memoryService: MemoryService,
                private alertCtrl: AlertController,
    ) {
    }

    // Création du tableau des cartes a partir d'une interface
    public memoryCardList: MemoryCardInterface[];

    public animation: string;

    // Référencement des clés et enregistrement de la position de la premiere carte cliquée
    private firstClickedCard: MemoryCardInterface;
    private firstClickedCardPos: number;

    // Création du compteur de coup
    public tryCount: number;

    // Création du compteur de paires complétées
    public pairComplete: number;

    // Création de la bascule pour interdire le clic ou non
    public clickable = true;

    // Création du switch pour le cheat mode
    public cheatMode = false;

    // Création du switch pour le cheat mode
    private cheater = false;

    // Création de l'animation du retournement des cartes
    private flipAnimation(element) {
        element.animation = true;
        setTimeout(() => element.animation = false, 500);
    }

    // Création de la fonction de triche
    public clickCheatMode() {

        // Création d'un tableau pour y inclure les paires déjà effectuées
        const pair = [];

        // Si le clic n'est pas bloqué et que le cheat mode est désactivé...
        if (this.clickable && !this.cheatMode) {
            // ... alors activer le cheat mode et désactiver le clic
            this.cheatMode = true;
            this.clickable = false;
            this.cheater = true;
            // Activation de l'animation pour toutes les cartes sauf pour celle qui sont deja retournées (paire effectuée)
            for (const card of this.memoryCardList) {
                if (!card.flipped) {
                    this.flipAnimation(card);
                }
                // Envoi des cartes dont la paire est déja effectuée dans le tableau pair
                else {
                    pair.push(card.cardNumber);
                }
            }
            // Retournement des cartes face visible
            setTimeout(() => {
                for (const card of this.memoryCardList) {
                    card.flipped = true;
                }
            }, 250);

            // Après un court instant, les cartes, dont la paire n'a pas été effectuée, se retournent face cachée
            setTimeout(() => {
                for (const card of this.memoryCardList) {
                    if (pair.indexOf(card.cardNumber) === -1) {
                        this.flipAnimation(card);
                    }
                }
            }, 1750);
            setTimeout(() => {
                for (const card of this.memoryCardList) {
                    if (pair.indexOf(card.cardNumber) === -1) {
                        card.flipped = false;
                    }
                }
            }, 2000);
            // Désactivation du cheat mode au bout de 2 sec et réactivation du clic
            setTimeout(() => {
                this.cheatMode = false;
                this.clickable = true;
            }, 2000);
        }
    }

    // Fonction permettant d'initialiser ou de réinitialiser le jeu
    private reset() {

        // Initialisation des variables à leurs valeurs par défaut
        this.cheatMode = false;
        this.animation = '';
        this.tryCount = 0;
        this.pairComplete = 0;
        this.memoryCardList = [];

        // Remplissage du tableau des cartes a partir de MemoryService
        this.memoryCardList = this.memoryService.getData();

        // Création de l'animation des cartes au démarrage du jeu
        setTimeout(() => this.animation = 'flip', 1750);
        setTimeout(() => {
            for (const card of this.memoryCardList) {
                card.flipped = false;
            }
        }, 2000);
        setTimeout(() => {
            for (const card of this.memoryCardList) {
                card.animation = false;
            }
        }, 2250);

    }

    // Lancement de la fonction reset pour initialiser le jeu
    ngOnInit() {
        this.reset();
    }

    // Création du message de victoire avec le module AlertController
    private async winMessage() {
        const win = await this.alertCtrl.create({
            header: `${this.cheater ? 'Tricheur !!!' : 'Gagné !!!'}`,
            message: `Vous avez${this.cheater ? ' honteusement' : ''} réussi en ${this.tryCount} coups`,
            buttons: [{
                text: 'Rejouer',
                handler: () => {
                    this.reset();
                }
            }]
        });
        win.present();
    }

    // Fonction utilisée en cliquant sur une carte
    public revealCard(pos) {
        // Si le clic est autorisé et que la carte est face caché ...
        if (this.memoryCardList[pos].flipped === false && this.clickable) {

            // ... alors désactivation du clic et réactivation après un timer de la durée de l'animation de la carte
            this.clickable = false;
            setTimeout(() => this.clickable = true, 1000);

            // Activation de l'animation pour le retournement de la carte face visible
            this.flipAnimation(this.memoryCardList[pos]);
            setTimeout(() => this.memoryCardList[pos].flipped = true, 250);

            // Si c'est un premier clic sur une carte...
            if (!this.firstClickedCard) {
                // ... alors récupération des clés par référence de la carte et enregistrement de sa position
                this.firstClickedCard = this.memoryCardList[pos];
                this.firstClickedCardPos = pos;
                // Activation de l'animation pour le retournement de la carte face cachée
                // setTimeout(() => this.flipAnimation(this.memoryCardList[pos]), 1750);
                // setTimeout(() => this.memoryCardList[pos].flipped = false, 2000);
                // Si c'est un deuxieme clic sur une carte...
            } else {
                // ... alors incrémentation du compteur de coup
                this.tryCount++;
                // Si la deuxième carte cliquée est la paire de la première et que ce n'est
                // pas deux fois la même carte à la meme position...
                if (this.memoryCardList[pos].cardNumber === this.firstClickedCard.cardNumber && pos !== this.firstClickedCardPos) {
                    // Activation de l'animation sur la première carte cliquée
                    // setTimeout(() => this.firstClickedCard.animation = true, 250);
                    setTimeout(() => {
                        // this.firstClickedCard.flipped = true;
                        this.firstClickedCard = null;
                    }, 500);
                    // Incrémentation du compteur de paires effectuées
                    this.pairComplete++;
                    // Si toutes les paires ont été effectuées...
                    if (this.pairComplete === this.memoryCardList.length / 2) {
                        // ... alors affichage du message de victoire
                        setTimeout(() => this.winMessage(), 750);
                    }
                    // Si toutes les paires n'ont pas été effectuées
                } else {
                    // Activation de l'animation pour retourner la carte face caché
                    setTimeout(() => {
                    this.flipAnimation(this.memoryCardList[pos]);
                    this.flipAnimation(this.memoryCardList[this.firstClickedCardPos]);
                    }, 750);
                    setTimeout(() => {
                        this.memoryCardList[pos].flipped = false;
                        this.memoryCardList[this.firstClickedCardPos].flipped = false;
                    }, 1000);
                    // Suppression des clés de la premiere carte cliquée pour pouvoir rééffectuer un nouveau coup
                    this.firstClickedCard = null;
                }

            }
        }

    }
}
