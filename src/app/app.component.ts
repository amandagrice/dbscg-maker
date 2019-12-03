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
  standard: boolean;
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
  displayHighlightHelp = false;
  skill: string;
  skillHighlighted: string;
  skillHex: string = '#c0ffee';
  keywordSkills: Highlight[] = [
    {word: 'Auto', color: '#00BFFF', standard: true},
    {word: 'Barrier', color: '#ff0a16', standard: true},
    {word: 'Blocker', color: '#ff0a16', standard: true},
    {word: 'Critical', color: '#ff0a16', standard: true},
    {word: 'Double Strike', color: '#ff0a16', standard: true},
    {word: 'Dual Attack', color: '#ff0a16', standard: true},
    {word: 'Once per turn', color: '#ff0a16', standard: true},
    {word: 'Super Combo', color: '#ff0a16', standard: true},
    {word: 'Triple Attack', color: '#ff0a16', standard: true},
    {word: 'Triple Strike', color: '#ff0a16', standard: true},
    {word: 'Permanent', color: '#d52298', standard: true},
  ];
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

  addKeywordToList(color) {
    const selectedWord = this.getHighlightedWord();
    if (selectedWord.length > 0) {
      let keyword = {
        word: selectedWord,
        color: color,
        standard: false
      };
      this.keywordSkills.push(keyword);
    }
    this.highlightKeywords();
  }

  highlightKeywords() {
    this.skillHighlighted = this.skill;
    for (let i = 0; i < this.keywordSkills.length; i++) {
      if (this.skillHighlighted.indexOf(this.keywordSkills[i]['word']) > -1) {
        const re = new RegExp(this.keywordSkills[i]['word'], "g");
        this.skillHighlighted = this.skillHighlighted.replace(re,
          '<span class="skill-highlight" style="background-color:' + this.keywordSkills[i]['color'] + ';">' + this.keywordSkills[i]['word'] + '</span>');
      }
    }
    document.getElementById("skill").innerHTML = this.skillHighlighted;
  }

  removeHighlight() {
    if (this.skill) {
      document.getElementById("skill").innerHTML = this.skill;
    } else {
      document.getElementById("skill").innerHTML = '';
    }
  }

  clearCustomKeywords() {
    this.keywordSkills = this.keywordSkills.filter(x => x.standard);
  }

  clearHighlights() {
    this.clearCustomKeywords();
    this.removeHighlight();
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
