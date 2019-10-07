import {Component, ViewEncapsulation} from '@angular/core';

interface Combo {
  name: string;
  cost: number;
  power: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  cardColor: string = 'black';
  frameResource: string = "../assets/layers/black/blacktemplate.png";
  cardName: string;
  cardArt: any;
  character: string;
  specialTrait: string;
  era: string;
  showCardTextBox: boolean = true;
  comboPower: Combo = {
    name:'0 cost + 5,000',
    cost: 0,
    power: 5000
  };
  skill: string;
  skillHighlighted: string;

  comboOptions = [
    {name:'0 cost + 5,000',  cost: 0, power: 5000},
    {name:'0 cost + 10,000', cost: 0, power: 10000},
    {name:'1 cost + 5,000',  cost: 1, power: 5000},
    {name:'1 cost + 10,000', cost: 1, power: 10000},
    {name:'0 cost + 0',      cost: 0, power: 0}
  ];

  redKeywordSkills: string[] = [
    "Barrier",
    "Blocker",
    "Critical",
    "Double Strike",
    "Dual Attack",
    "Once per turn",
    "Super Combo",
    "Triple Attack",
    "Triple Strike"
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

  unhighlight() {
    document.getElementById("skill").innerHTML = this.skill;
  }

  parseForKeywords() {
    this.skillHighlighted = this.skill;

    if (this.skillHighlighted.indexOf("Auto") > -1) {
      this.skillHighlighted = this.skillHighlighted.replace(/Auto/g,
          '<span class="blue-skill">Auto</span>');
    }

    if (this.skillHighlighted.indexOf("Permanent") > -1) {
      this.skillHighlighted = this.skillHighlighted.replace(/Permanent/g,
          '<span class="pink-skill">Permanent</span>');
    }

    for (let i = 0; i < this.redKeywordSkills.length; i++) {
      if (this.skillHighlighted.indexOf(this.redKeywordSkills[i]) > -1) {
        const re = new RegExp(this.redKeywordSkills[i],"g");
        this.skillHighlighted = this.skillHighlighted.replace(re,
            '<span class="red-skill">'+this.redKeywordSkills[i]+'</span>');
      }
    }
    document.getElementById("skill").innerHTML = this.skillHighlighted;
  }

}
