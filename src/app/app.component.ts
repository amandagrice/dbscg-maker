import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ImageCroppedEvent, ImageCropperComponent} from "ngx-image-cropper";

interface Combo {
  name: string;
  cost: string;
  power: string;
}

interface Highlight {
  word: string;
  color: string;
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
  power: number;
  showCardTextBox: boolean = true;
  cardArt: any;
  character: string;
  specialTrait: string;
  era: string;
  totalCost: number;
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
  skillHex: string;
  blueKeywordSkills: string[] = [
    "Auto"
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
  yellowKeywordSkills: string[] = [];
  pinkKeywordSkills: string[] = [
    "Permanent"
  ];
  customKeywordSkills: Highlight[] = [];
  fontsize: any = {
    'total-cost': 43,
    'card-name': 35,
    'power': 30,
    'character': 10,
    'special-trait': 10,
    'era': 10
  };

  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  containWithinAspectRatio = false;
  displayCardArtEditor = false;
  displayFooter = false;

  @ViewChild(ImageCropperComponent, {static: true}) imageCropper: ImageCropperComponent;

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.showCropper = true;
  }

  rotateLeft() {
    this.imageCropper.rotateLeft();
    this.cardArt = this.croppedImage;
  }

  rotateRight() {
    this.imageCropper.rotateRight();
    this.cardArt = this.croppedImage;
  }

  flipHorizontal() {
    this.imageCropper.flipHorizontal();
    this.cardArt = this.croppedImage;
  }

  flipVertical() {
    this.imageCropper.flipVertical();
    this.cardArt = this.croppedImage;
  }

  resetImage() {
    this.imageCropper.resetImage();
    this.cardArt = this.croppedImage;
  }

  saveImage() {
    this.cardArt = this.croppedImage;
  }

  setFrameColor(color) {
    this.cardColor = color;
    this.selectedFrameResource = this.assets + this.colorResources[color]['template'];
    this.setDrops();
  }

  setCardArt(event) {
    this.imageChangedEvent = event;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.cardArt = event.target['result'];
      }
    }
  }

  getHighlightedWord() {
    const cardTextInput = <HTMLInputElement>document.getElementById("card-text-input");
    return cardTextInput.value.substr(cardTextInput.selectionStart, cardTextInput.selectionEnd - cardTextInput.selectionStart);
  }

  highlightInBlue() {
    const selected = this.getHighlightedWord();
    if (selected.length > 0) {
      this.blueKeywordSkills.push(selected);
    }
    this.parseForKeywords();
  }

  highlightInRed() {
    const selected = this.getHighlightedWord();
    if (selected.length > 0) {
      this.redKeywordSkills.push(selected);
    }
    this.parseForKeywords();
  }

  highlightInYellow() {
    const selected = this.getHighlightedWord();
    if (selected.length > 0) {
      this.yellowKeywordSkills.push(selected);
    }
    this.parseForKeywords();
  }

  highlightInPink() {
    const selected = this.getHighlightedWord();
    if (selected.length > 0) {
      this.pinkKeywordSkills.push(selected);
    }
    this.parseForKeywords();
  }

  highlightInCustom() {
    const selected = this.getHighlightedWord();
    if (selected.length > 0) {
      if (!this.skillHex || this.skillHex.length === 0) {
        this.skillHex = '#C0ffee';
      }
      let custom = {
        word: selected,
        color: this.skillHex
      };
      this.customKeywordSkills.push(custom);
    }
    this.parseForKeywords();
  }

  parseForKeywords() {
    this.skillHighlighted = this.skill;

    for (let i = 0; i < this.blueKeywordSkills.length; i++) {
      if (this.skillHighlighted.indexOf(this.blueKeywordSkills[i]) > -1) {
        const re = new RegExp(this.blueKeywordSkills[i], "g");
        this.skillHighlighted = this.skillHighlighted.replace(re,
          '<span class="skill-highlight blue-skill">' + this.blueKeywordSkills[i] + '</span>');
      }
    }

    for (let i = 0; i < this.redKeywordSkills.length; i++) {
      if (this.skillHighlighted.indexOf(this.redKeywordSkills[i]) > -1) {
        const re = new RegExp(this.redKeywordSkills[i], "g");
        this.skillHighlighted = this.skillHighlighted.replace(re,
          '<span class="skill-highlight red-skill">' + this.redKeywordSkills[i] + '</span>');
      }
    }

    for (let i = 0; i < this.yellowKeywordSkills.length; i++) {
      if (this.skillHighlighted.indexOf(this.yellowKeywordSkills[i]) > -1) {
        const re = new RegExp(this.yellowKeywordSkills[i], "g");
        this.skillHighlighted = this.skillHighlighted.replace(re,
          '<span class="skill-highlight yellow-skill">' + this.yellowKeywordSkills[i] + '</span>');
      }
    }

    for (let i = 0; i < this.pinkKeywordSkills.length; i++) {
      if (this.skillHighlighted.indexOf(this.pinkKeywordSkills[i]) > -1) {
        const re = new RegExp(this.pinkKeywordSkills[i], "g");
        this.skillHighlighted = this.skillHighlighted.replace(re,
          '<span class="skill-highlight pink-skill">' + this.pinkKeywordSkills[i] + '</span>');
      }
    }

    for (let i = 0; i < this.customKeywordSkills.length; i++) {
      if (this.skillHighlighted.indexOf(this.customKeywordSkills[i]['word']) > -1) {
        const re = new RegExp(this.customKeywordSkills[i]['word'], "g");
        this.skillHighlighted = this.skillHighlighted.replace(re,
          '<span class="skill-highlight" style="background-color:' + this.customKeywordSkills[i]['color'] + ';">' + this.customKeywordSkills[i]['word'] + '</span>');
      }
    }
    document.getElementById("skill").innerHTML = this.skillHighlighted;
  }

  removeHighlight() {
    document.getElementById("skill").innerHTML = this.skill;
  }

  setDrops() {
    if (this.cardColor !== 'black') {
      document.getElementById('specified-cost').innerHTML = '';
      const minPosition = 0 - Math.PI / 6;
      const maxPosition = 2 * Math.PI / 3;
      let delta = this.calculateDistanceBetweenDrops(minPosition, maxPosition);
      let currentPosition = minPosition;
      for (let i = 0; i < this.specifiedCost; i++) {
        this.createDropAtPosition(currentPosition);
        currentPosition += delta;
      }
    }
  }

  private calculateDistanceBetweenDrops(minPosition, maxPosition) {
    if (this.specifiedCost < 6) {
      return Math.PI / 6;
    } else {
      return (maxPosition - minPosition) / this.specifiedCost;
    }
  }

  private createDropAtPosition(pos) {
    const costAreaRadius = 40;
    const drop: any = document.createElement('img');
    let x = Math.round(costAreaRadius * (Math.cos(pos)));
    let y = Math.round(costAreaRadius * (Math.sin(pos)));
    drop.src = this.assets + this.colorResources[this.cardColor]['drop'];
    drop.style.position = "absolute";
    drop.posx = x + 'px';
    drop.posy = y + 'px';
    drop.style.left = x + 'px';
    drop.style.top = y + 'px';
    document.getElementById('specified-cost').appendChild(drop);
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

  openFooter() {
    this.displayFooter = true;
  }

}
