import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  frameResource: string = "../assets/layers/black/blacktemplate.png";
  cardName: string;
  cardArt: any;
  character: string;
  specialTrait: string;
  era: string;

  swapFrameColor(colorSrc) {
    this.frameResource = colorSrc;
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
