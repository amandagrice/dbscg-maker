import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core'
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper'
import * as html2canvas from 'html2canvas'

interface Combo {
  name: string
  cost: string
  power: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('screen', { static: false }) screen: ElementRef
  @ViewChild('canvas', { static: false }) canvas: ElementRef
  @ViewChild('downloadLink', { static: false }) downloadLink: ElementRef
  assets: string = '../assets/layers'
  cardColor: string = 'black'
  selectedFrameResource: string = '../assets/layers/black/template.png'
  frameColorOptions: any[] = [
    { name: 'Black', value: 'black', backgroundColor: 'black', fontColor: 'white', secondColor: 'black' },
    { name: 'Blue', value: 'blue', backgroundColor: '#3d86d4', fontColor: 'white', secondColor: '#3d86d4' },
    { name: 'Green', value: 'green', backgroundColor: '#32a852', fontColor: 'white', secondColor: '#32a852' },
    { name: 'Red', value: 'red', backgroundColor: '#d9364c', fontColor: 'white', secondColor: '#d9364c' },
    { name: 'Yellow', value: 'yellow', backgroundColor: '#e8e068', fontColor: 'black', secondColor: '#e8e068' },
    { name: 'Blue-Green', value: 'blueGreen', backgroundColor: '#3d86d4', fontColor: 'white', secondColor: '#32a852' },
    { name: 'Blue-Yellow', value: 'blueYellow', backgroundColor: '#3d86d4', fontColor: 'white', secondColor: '#e8e068' },
    { name: 'Green-Yellow', value: 'greenYellow', backgroundColor: '#32a852', fontColor: 'white', secondColor: '#e8e068' },
    { name: 'Red-Blue', value: 'redBlue', backgroundColor: '#d9364c', fontColor: 'white', secondColor: '#3d86d4' },
    { name: 'Red-Green', value: 'redGreen', backgroundColor: '#d9364c', fontColor: 'white', secondColor: '#32a852' },
    { name: 'Red-Yellow', value: 'redYellow', backgroundColor: '#d9364c', fontColor: 'white', secondColor: '#e8e068' }
  ]

  frameColor: any = this.frameColorOptions[0]
  costColorOptions: any[] = [
    { name: 'Neutral' },
    { name: 'Blue' },
    { name: 'Green' },
    { name: 'Red' },
    { name: 'Yellow' }
  ]

  textCostColor: string = 'Neutral'
  textCostAmount = 0
  colorResources: any = {
    black: {
      template: '/black/template.png',
      box: '/black/box.png',
      drop: ''
    },
    blue: {
      template: '/blue/template.png',
      box: '/blue/box.png',
      drop: '/blue/drop.png'
    },
    green: {
      template: '/green/template.png',
      box: '/green/box.png',
      drop: '/green/drop.png'
    },
    red: {
      template: '/red/template.png',
      box: '/red/box.png',
      drop: '/red/drop.png'
    },
    yellow: {
      template: '/yellow/template.png',
      box: '/yellow/box.png',
      drop: '/yellow/drop.png'
    },
    blueGreen: {
      template: '/blueGreen/template.png',
      box: '/black/box.png',
      drop: '/blue/drop.png'
    },
    blueYellow: {
      template: '/blueYellow/template.png',
      box: '/black/box.png',
      drop: '/blue/drop.png'
    },
    greenYellow: {
      template: '/greenYellow/template.png',
      box: '/black/box.png',
      drop: '/green/drop.png'
    },
    redBlue: {
      template: '/redBlue/template.png',
      box: '/black/box.png',
      drop: '/red/drop.png'
    },
    redGreen: {
      template: '/redGreen/template.png',
      box: '/black/box.png',
      drop: '/red/drop.png'
    },
    redYellow: {
      template: '/redYellow/template.png',
      box: '/black/box.png',
      drop: '/red/drop.png'
    }
  }

  cardName: string
  power: number
  showCardTextBox: boolean = true
  cardArt: any
  character: string
  specialTrait: string
  era: string
  totalCost: number = 0
  basicColors = ['blue', 'green', 'red', 'yellow']
  specifiedCost: number[] = [0, 0, 0, 0] // blue, green, red, yellow
  combos: Combo[] = [
    { name: '0 cost + 5,000', cost: '/combos/combocost0.png', power: '/combos/combo5k.png' },
    { name: '0 cost + 10,000', cost: '/combos/combocost0.png', power: '/combos/combo10k.png' },
    { name: '1 cost + 5,000', cost: '/combos/combocost1.png', power: '/combos/combo5k.png' },
    { name: '1 cost + 10,000', cost: '/combos/combocost1.png', power: '/combos/combo10k.png' },
    { name: '0 cost + 0', cost: '/combos/combocost0.png', power: '/combos/supercombo.png' }
  ]

  selectedCombo: Combo
  displayHighlightHelp = false
  skill: string = ''
  skillHighlighted: string
  skillHex: string = '#c0ffee'
  originalKeywordSkills: any = {
    'Activate:Battle': '#d59e2c',
    'Activate:Main': '#d59e2c',
    Alliance: '#ff0a16',
    Awaken: '#ffff00',
    Auto: '#00BFFF',
    Barrier: '#ff0a16',
    Blocker: '#ff0a16',
    Bond: '#ff0a16',
    Burst: '#ff0a16',
    Counter: '#0a832d',
    'Counter:Attack': '#0a832d',
    'Counter:Battle Card Attack': '#0a832d',
    'Counter:Counter': '#0a832d',
    'Counter:Play': '#0a832d',
    Critical: '#ff0a16',
    'Dark Over Realm': '#ff0a16',
    Deflect: '#ff0a16',
    'Double Strike': '#ff0a16',
    'Dragon Ball': '#ff0a16',
    'Dual Attack': '#ff0a16',
    'Energy-Exhaust': '#ff0a16',
    Evolve: '#ff0a16',
    'EX-Evolve': '#ff0a16',
    Field: '#0a832d',
    Indestructible: '#ff0a16',
    'Once per turn': '#ff0a16',
    'Over Realm': '#ff0a16',
    Permanent: '#d52298',
    Revenge: '#ff0a16',
    'Super Combo': '#ff0a16',
    Sparking: '#ff0a16',
    Swap: '#ff0a16',
    'Triple Attack': '#ff0a16',
    'Triple Strike': '#ff0a16',
    Union: '#ff0a16',
    'Union-Absorb': '#ff0a16',
    'Union-Fusion': '#ff0a16',
    'Warrior of Universe': '#ff0a16',
    'Xeno-Evolve': '#ff0a16'
  }

  keywordSkills = Object.assign({}, this.originalKeywordSkills)
  fontsize: any = {
    'total-cost': 43,
    'card-name': 35,
    power: 30,
    character: 10,
    'special-trait': 10,
    era: 10
  }

  imageChangedEvent: any = ''
  croppedImage: any = ''
  showCropper = false
  containWithinAspectRatio = false
  displayCardArtEditor = false
  displayFooter = false

  @ViewChild(ImageCropperComponent, { static: true }) imageCropper: ImageCropperComponent

  imageCropped (event: ImageCroppedEvent) {
    this.croppedImage = event.base64
  }

  imageLoaded () {
    this.showCropper = true
  }

  rotateLeft () {
    this.imageCropper.rotateLeft()
    this.cardArt = this.croppedImage
  }

  rotateRight () {
    this.imageCropper.rotateRight()
    this.cardArt = this.croppedImage
  }

  flipHorizontal () {
    this.imageCropper.flipHorizontal()
    this.cardArt = this.croppedImage
  }

  flipVertical () {
    this.imageCropper.flipVertical()
    this.cardArt = this.croppedImage
  }

  resetImage () {
    this.imageCropper.resetImage()
    this.cardArt = this.croppedImage
  }

  saveImage () {
    this.cardArt = this.croppedImage
  }

  setFrameColor (event, target) {
    this.frameColor = this.frameColorOptions[target.value]
    const color = this.frameColorOptions[target.value].value
    this.cardColor = color
    this.selectedFrameResource = this.assets + this.colorResources[color].template
    this.setDrops()
  }

  setCardArt (event) {
    this.imageChangedEvent = event
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.cardArt = event.target.result
      }
    }
  }

  getHighlightedWord () {
    const cardTextInput = <HTMLInputElement>document.getElementById('card-text-input')
    return cardTextInput.value.substr(cardTextInput.selectionStart, cardTextInput.selectionEnd - cardTextInput.selectionStart)
  }

  addKeywordToList (color) {
    const selectedWord = this.getHighlightedWord()
    if (selectedWord.length > 0) {
      this.keywordSkills[selectedWord] = color
    }
    this.formatCardText()
  }

  // referenced: https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
  chooseTextColor (backgroundColor) {
    const color = (backgroundColor.charAt(0) === '#') ? backgroundColor.substring(1, 7) : backgroundColor
    const r = parseInt(color.substring(0, 2), 16)
    const g = parseInt(color.substring(2, 4), 16)
    const b = parseInt(color.substring(4, 6), 16)
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186)
      ? 'black' : 'white'
  }

  generateHighlightHTML (word) {
    return '<span class="skill-highlight" style="background-color:' +
      this.keywordSkills[word] + '; color: ' +
      this.chooseTextColor(this.keywordSkills[word]) + '">' + word + '</span>'
  }

  findCost (costString) {
    const color = costString.charAt(0)
    const cost = Number(costString.substr(1, costString.length - 1))
    switch (color) {
      case 'R':
        return this.addSkillTextCost('red', cost)
      case 'B':
        return this.addSkillTextCost('blue', cost)
      case 'Y':
        return this.addSkillTextCost('yellow', cost)
      case 'G':
        return this.addSkillTextCost('green', cost)
      case 'N':
        return this.addColorlessSkillCost(cost)
      default:
        return ''
    }
  }

  addSkillTextCost (color, cost) {
    let costs = ''
    let i = 0
    while (i < cost) {
      costs += '<span class="cost" style="background-color:' + color + '"> </span>'
      i++
    }
    return costs
  }

  addColorlessSkillCost (cost) {
    return '<span class="cost">' + cost + '</span>'
  }

  // damn this needs to be fixed
  formatCardText () {
    let highlighted = ''
    let words = this.skill.split(/\b/)
    const space = ' '
    words = words.filter(word => word !== ' ')
    words = words.map(word => word.replace(/ +?/g, ''))
    for (let i = 0; i < words.length; i++) {
      if (words[i] === '\n') {
        highlighted += words[i]
      } else if (words[i].includes('$$$')) {
        if (words[i].startsWith('\n')) {
          highlighted += '\n'
        }
        highlighted += this.findCost(words[i + 1])
        if (words[i].endsWith('\n')) {
          highlighted += '\n'
        }
        i++
      } else if (this.keywordSkills.hasOwnProperty(words[i])) {
        highlighted += this.generateHighlightHTML(words[i]) + space
      } else if (this.keywordSkills.hasOwnProperty(words[i] + space + words[i + 1])) {
        highlighted += this.generateHighlightHTML(words[i] + space + words[i + 1]) + space
        i++
      } else if (this.keywordSkills.hasOwnProperty(words[i] + space + words[i + 1] + space + words[i + 2])) {
        highlighted += this.generateHighlightHTML(words[i] + ' ' + words[i + 1] + space + words[i + 2]) + space
        i += 2
      } else {
        if (words[i + 1] && !(words[i + 1]).match(/^[a-z0-9]+$/i)) {
          highlighted += words[i]
        } else {
          highlighted += words[i] + space
        }
      }
    }
    this.skillHighlighted = highlighted
    document.getElementById('skill').innerHTML = this.skillHighlighted
  }

  removeHighlight () {
    if (this.skill) {
      document.getElementById('skill').innerHTML = this.skill
    } else {
      document.getElementById('skill').innerHTML = ''
    }
  }

  clearCustomKeywords () {
    this.keywordSkills = Object.assign({}, this.originalKeywordSkills)
  }

  clearHighlights () {
    this.clearCustomKeywords()
    this.removeHighlight()
  }

  getSum (numArr) {
    let sum = 0
    for (let i = 0; i < numArr.length; i++) {
      sum += numArr[i]
    }
    return sum
  }

  setDrops () {
    if (this.cardColor !== 'black') {
      document.getElementById('specified-cost').innerHTML = ''
      const minPosition = 0 - Math.PI / 6
      const maxPosition = 2 * Math.PI / 3
      const delta = this.calculateDistanceBetweenDrops(minPosition, maxPosition)
      let currentPosition = minPosition
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < this.specifiedCost[i]; j++) {
          this.createDropAtPosition(currentPosition, this.basicColors[i])
          currentPosition += delta
        }
      }
    }
  }

  private calculateDistanceBetweenDrops (minPosition, maxPosition) {
    const totalSpecifiedCost: number = this.getSum(this.specifiedCost)
    if (totalSpecifiedCost < 6) {
      return Math.PI / 6
    } else {
      return (maxPosition - minPosition) / totalSpecifiedCost
    }
  }

  private createDropAtPosition (pos, color) {
    const costAreaRadius = 40
    const drop: any = document.createElement('img')
    const x = Math.round(costAreaRadius * (Math.cos(pos)))
    const y = Math.round(costAreaRadius * (Math.sin(pos)))
    drop.src = this.assets + this.colorResources[color].drop
    drop.style.position = 'absolute'
    drop.posx = x + 'px'
    drop.posy = y + 'px'
    drop.style.left = x + 'px'
    drop.style.top = y + 'px'
    document.getElementById('specified-cost').appendChild(drop)
  }

  scaleTextField (field, maxSize) {
    const element = document.getElementById(field)
    const area = document.getElementById(field + '-area')
    let font = this.fontsize[field]
    if (element.clientWidth > area.clientWidth) {
      while (element.clientWidth > area.clientWidth) {
        font--
        element.style.fontSize = font + 'px'
      }
    } else if (font < maxSize && element.clientWidth < area.clientWidth) {
      while (font < maxSize && element.clientWidth < area.clientWidth) {
        font++
        element.style.fontSize = font + 'px'
      }
    }
    this.fontsize[field] = font
  }

  openFooter () {
    this.displayFooter = true
  }

  downloadImage () {
    // @ts-expect-error
    html2canvas(document.querySelector('#card')).then(canvas => {
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png')
      this.downloadLink.nativeElement.download = 'shenwrong.png'
      this.downloadLink.nativeElement.click()
    })
  }

  addCostToTextFromUI () {
    if (this.textCostColor && this.textCostAmount > 0) {
      this.skill += ' $$$' + this.textCostColor.name[0] + this.textCostAmount
    }
    this.formatCardText()
  }
}
