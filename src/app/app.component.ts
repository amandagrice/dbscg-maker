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

  @ViewChild(ImageCropperComponent, {static: true}) imageCropper: ImageCropperComponent;

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event);
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
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
    const minPosition = 0 - Math.PI / 6;
    const maxAngle = 2 * Math.PI / 3;
    let spacer;
    if (this.specifiedCost < 6) {
      spacer = Math.PI / 6;
    } else {
      spacer = (maxAngle - minPosition) / this.specifiedCost;
    }
    if (this.cardColor !== 'black') {
      let i = 0;
      let pos = minPosition;
      while (i < this.specifiedCost) {
        const drop = document.createElement('img');
        drop.src = this.assets + this.colorResources[this.cardColor]['drop'];
        drop.id = "drop" + i;
        dropsArray.push(drop);
        dropsArray[i].style.position = "absolute";
        dropsArray[i].posx = Math.round(radius * (Math.cos(pos))) + 'px';
        dropsArray[i].posy = Math.round(radius * (Math.sin(pos))) + 'px';
        dropsArray[i].style.top = parseInt(dropsArray[i].posy.slice(0, -2)) + 'px';
        dropsArray[i].style.left = parseInt(dropsArray[i].posx.slice(0, -2)) + 'px';
        document.getElementById('specified-cost').appendChild(dropsArray[i]);
        i += 1;
        pos += spacer;
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
