import {Component, ViewEncapsulation} from '@angular/core';

interface Combo {
  name: string;
  cost: string;
  power: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  assets: string = '../assets/layers';
  cardColor: string = 'black';
  selectedFrameResource: string = "../assets/layers/black/template.png";
  colorResources: any = {
    'black': {
      'template': '/black/template.png',
      'box': '/black/box.png',
      'drop': ''
    },
    'blue': {
      'template': '/blue/template.png',
      'box': '/blue/box.png',
      'drop': '/blue/drop.png'
    },
    'green': {
      'template': '/green/template.png',
      'box': '/green/box.png',
      'drop': '/green/drop.png'
    },
    'red': {
      'template': '/red/template.png',
      'box': '/red/box.png',
      'drop': '/red/drop.png'
    },
    'yellow': {
      'template': '/yellow/template.png',
      'box': '/yellow/box.png',
      'drop': '/yellow/drop.png'
    }
  };
  cardName: string;
  cardNameFontSize: number = 35;
  power: number;
  showCardTextBox: boolean = true;
  cardArt: any;
  character: string;
  characterFontSize: number = 10;
  specialTrait: string;
  specialTraitFontSize = 10;
  era: string;
  eraFontSize: number = 10;
  totalCost: number;
  totalCostFontSize: number = 43;
  specifiedCost: number;
  combos: Combo[] = [
    {name: '0 cost + 5,000', cost: '/combos/combocost0.png', power: '/combos/combo5k.png'},
    {name: '0 cost + 10,000', cost: '/combos/combocost0.png', power: '/combos/combo10k.png'},
    {name: '1 cost + 5,000', cost: '/combos/combocost1.png', power: '/combos/combo5k.png'},
    {name: '1 cost + 10,000', cost: '/combos/combocost1.png', power: '/combos/combo10k.png'},
    {name: '0 cost + 0', cost: '/combos/combocost0.png', power: '/combos/supercombo.png'}
  ];
  selectedCombo: Combo;
  skill: string;
  skillHighlighted: string;
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
  fontsize: any = {
    'total-cost': 43,
    'card-name': 35,
    'character': 10,
    'special-trait': 10,
    'era': 10
  };

  setFrameColor(color) {
    this.cardColor = color;
    this.selectedFrameResource = this.assets + this.colorResources[color]['template'];
    this.setDrops();
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

  parseForKeywords() {
    this.skillHighlighted = this.skill;

    if (this.skillHighlighted.indexOf("Auto") > -1) {
      this.skillHighlighted = this.skillHighlighted.replace(/Auto/g,
        '<span class="skill-highlight blue-skill">Auto</span>');
    }

    if (this.skillHighlighted.indexOf("Permanent") > -1) {
      this.skillHighlighted = this.skillHighlighted.replace(/Permanent/g,
        '<span class="skill-highlight pink-skill">Permanent</span>');
    }

    for (let i = 0; i < this.redKeywordSkills.length; i++) {
      if (this.skillHighlighted.indexOf(this.redKeywordSkills[i]) > -1) {
        const re = new RegExp(this.redKeywordSkills[i], "g");
        this.skillHighlighted = this.skillHighlighted.replace(re,
          '<span class="skill-highlight red-skill">' + this.redKeywordSkills[i] + '</span>');
      }
    }
    document.getElementById("skill").innerHTML = this.skillHighlighted;
  }

  removeHighlight() {
    document.getElementById("skill").innerHTML = this.skill;
  }

  setDrops() {
    document.getElementById('specified-cost').innerHTML = '';
    const dropsArray = [];
    const radius = 40;
    const theta = [
      -1 * (Math.PI / 6),   // start 30 degrees
      0,
      Math.PI / 6,
      Math.PI / 3,
      Math.PI / 2,
      2 * (Math.PI / 3),    // end 270 degrees
      -1 * (Math.PI / 12),  // loop back around and squeeze in between - between 0 & 1
      (Math.PI / 12),       // between 1 & 2, etc.
      (Math.PI / 4),
      -19 * (Math.PI / 12),
    ];

    if (this.cardColor !== 'black') {
      let i = 0;
      while (i < this.specifiedCost && i < 11) {
        const drop = document.createElement('img');
        drop.src = this.assets + this.colorResources[this.cardColor]['drop'];
        drop.id = "drop" + i;
        dropsArray.push(drop);
        dropsArray[i].style.position = "absolute";
        if (i < 6) {
          dropsArray[i].style.zIndex = 10000 + i;
        } else {
          dropsArray[i].style.zIndex = 10000 + (i - 6);
        }

        dropsArray[i].posx = Math.round(radius * (Math.cos(theta[i]))) + 'px';
        dropsArray[i].posy = Math.round(radius * (Math.sin(theta[i]))) + 'px';
        dropsArray[i].style.top = parseInt(dropsArray[i].posy.slice(0, -2)) + 'px';
        dropsArray[i].style.left = parseInt(dropsArray[i].posx.slice(0, -2)) + 'px';
        document.getElementById('specified-cost').appendChild(dropsArray[i]);
        i = i + 1;
      }
    }
  }

  scaleTextField(field, maxSize) {
    let element = document.getElementById(field);
    let area = document.getElementById(field + '-area');
    let font = this.fontsize[field];
    if (element.clientWidth > area.clientWidth) {
      while (element.clientWidth > area.clientWidth) {
        font--;
        element.style.fontSize = font + "px";
      }
    } else if (font < maxSize && element.clientWidth < area.clientWidth) {
      while (font < maxSize && element.clientWidth < area.clientWidth) {
        font++;
        element.style.fontSize = font + "px";
      }
    }
    this.fontsize[field] = font;
  }

}
