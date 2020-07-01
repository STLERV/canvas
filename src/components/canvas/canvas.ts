import { Component } from '@angular/core';

/**
 * Generated class for the CanvasComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'canvas',
  templateUrl: 'canvas.html'
})
export class CanvasComponent {

  text: string;

  constructor() {
    console.log('Hello CanvasComponent Component');
    this.text = 'Hello World';
  }

}
