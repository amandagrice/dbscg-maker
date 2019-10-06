import { Component } from '@angular/core';

interface Combo {
  name: string;
  cost: number;
  power: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cardColor: string = 'black';
  frameResource: string = "../assets/layers/black/blacktemplate.png";
  cardName: string;
  cardArt: any;
  character: string;
  specialTrait: string;
  era: string;
  showCardTextBox: boolean = false;
  comboPower: Combo = {
    name:'0 cost + 5,000',
    cost: 0,
    power: 5000
  };

  comboOptions = [
    {name:'0 cost + 5,000',  cost: 0, power: 5000},
    {name:'0 cost + 10,000', cost: 0, power: 10000},
    {name:'1 cost + 5,000',  cost: 1, power: 5000},
    {name:'1 cost + 10,000', cost: 1, power: 10000},
    {name:'0 cost + 0',      cost: 0, power: 0}
  ];

  swapFrameColor(color, frameSrc) {
    this.cardColor = color;
    this.frameResource = frameSrc;
  }

  setCardArt(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.cardArt = event.target['result'];
      }
    }
  }

}
