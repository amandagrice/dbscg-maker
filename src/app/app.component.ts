import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  frameResource: string = "../assets/black_card_frame.png";
  cardName: string = 'Name';
  character: string = 'Character';
  specialTrait: string = 'Trait';
  era: string = 'Era';

  swapFrameColor(colorSrc) {
    this.frameResource = colorSrc;
  }

}
