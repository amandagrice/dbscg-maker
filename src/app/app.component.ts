import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ImageCroppedEvent, ImageCropperComponent} from "ngx-image-cropper";

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
  originalKeywordSkills: any = {
    'Activate:Battle': '#d59e2c',
    'Activate:Main': '#d59e2c',
    'Alliance': '#ff0a16',
    'Awaken': '#ffff00',
    'Auto': '#00BFFF',
    'Barrier': '#ff0a16',
    'Blocker': '#ff0a16',
    'Bond': '#ff0a16',
    'Burst': '#ff0a16',
    'Counter': '#0a832d',
    'Counter:Attack': '#0a832d',
    'Counter:Battle Card Attack': '#0a832d',
    'Counter:Counter': '#0a832d',
    'Counter:Play': '#0a832d',
    'Critical': '#ff0a16',
    'Dark Over Realm': '#ff0a16',
    'Deflect': '#ff0a16',
    'Double Strike': '#ff0a16',
    'Dragon Ball': '#ff0a16',
    'Dual Attack': '#ff0a16',
    'Energy-Exhaust': '#ff0a16',
    'Evolve': '#ff0a16',
    'EX-Evolve': '#ff0a16',
    'Field': '#0a832d',
    'Indestructible': '#ff0a16',
    'Once per turn': '#ff0a16',
    'Over Realm': '#ff0a16',
    'Permanent': '#d52298',
    'Revenge': '#ff0a16',
    'Super Combo': '#ff0a16',
    'Sparking': '#ff0a16',
    'Swap': '#ff0a16',
    'Triple Attack': '#ff0a16',
    'Triple Strike': '#ff0a16',
    'Union': '#ff0a16',
    'Union-Absorb': '#ff0a16',
    'Union-Fusion': '#ff0a16',
    'Warrior of Universe': '#ff0a16',
    'Xeno-Evolve': '#ff0a16'
  };
  keywordSkills = Object.assign({}, this.originalKeywordSkills);
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
      this.keywordSkills[selectedWord] = color;
    }
    this.highlightKeywords();
  }

  // referenced: https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
  chooseTextColor(backgroundColor) {
    const color = (backgroundColor.charAt(0) === '#') ? backgroundColor.substring(1, 7) : backgroundColor;
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
      'black' : 'white';
  }

  generateHighlightHTML(word) {
    console.log(this.chooseTextColor(this.keywordSkills[word]));
    return '<span class="skill-highlight" style="background-color:'
      + this.keywordSkills[word] + '; color: '
      + this.chooseTextColor(this.keywordSkills[word]) + '">' + word + '</span>';
  }

  highlightKeywords() {
    let highlighted = '';
    let words = this.skill.split(/\b/);
    let space = ' ';
    words = words.filter(word => word !== ' ');
    for (let i = 0; i < words.length; i++) {
      if (words[i] === '\n') {
        highlighted += words[i];
      } else if (this.keywordSkills.hasOwnProperty(words[i])) {
        highlighted += this.generateHighlightHTML(words[i]) + space;
      } else if (this.keywordSkills.hasOwnProperty(words[i] + space + words[i + 1])) {
        highlighted += this.generateHighlightHTML(words[i] + space + words[i + 1]) + space;
        i++;
      } else if (this.keywordSkills.hasOwnProperty(words[i] + space + words[i + 1] + space + words[i + 2])) {
        highlighted += this.generateHighlightHTML(words[i] + ' ' + words[i + 1] + space + words[i + 2]) + space;
        i += 2;
      } else {
        highlighted += words[i] + space;
      }
    }
    this.skillHighlighted = highlighted;
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
    this.keywordSkills = Object.assign({}, this.originalKeywordSkills);
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
