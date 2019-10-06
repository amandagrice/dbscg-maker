import { Component } from '@angular/core';

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
  textboxResource: string;

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
