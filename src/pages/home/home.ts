import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild, ElementRef } from '@angular/core';
import {AfterViewInit}from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  {
  @ViewChild('canvas') canvasEl : ElementRef;
  private _CANVAS  : any;
  public _CONTEXT : any;

  public context: CanvasRenderingContext2D;


  constructor(public navCtrl: NavController) {

  }
  ngOnInit() { 

    
}



  ionViewDidLoad() 
{
   this._CANVAS = this.canvasEl.nativeElement;
   this._CANVAS.width  	= 1900;
   this._CANVAS.height 	= 1900;
   
   this.initialiseCanvas();

   
 
}
initialiseCanvas()
{
   if(this._CANVAS.getContext)
   {
      this.setupCanvas();
     
   }
}

drawTriangle() : void
{
   this.clearCanvas();
   this._CONTEXT.beginPath();
   this._CONTEXT.moveTo(this._CANVAS.width/2 - 100, this._CANVAS.height/2 + 100);
   this._CONTEXT.lineTo(this._CANVAS.width/2 + 100, this._CANVAS.height/2 + 100);
   this._CONTEXT.lineTo(this._CANVAS.width/2, this._CANVAS.height/2);
   this._CONTEXT.lineTo(this._CANVAS.width/2 -100, this._CANVAS.height/2 + 100);
   this._CONTEXT.lineWidth   = 1;
   this._CONTEXT.strokeStyle = '#ffffff';
   this._CONTEXT.stroke();
}


cargaimagen() : void

{ 

  console.log('jiji');
   var img = new Image();
   var img2= new Image();
   this.clearCanvas();
  
   img.onload = ()=> {

 this._CONTEXT.beginPath();
  var x =590;
  var y =590;

   this._CONTEXT.drawImage(img, x, y);
   this._CONTEXT.drawImage(img2, 1090, 1090);
   this._CONTEXT.stroke();
  



   };

   img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';
   img2.src = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full//037.png';
}






setupCanvas()
{ 
  var img3 = new Image();
  img3.src = 'https://static.vecteezy.com/system/resources/previews/000/263/062/non_2x/cartoon-spring-or-summer-landscape-vector.jpg';
  this._CONTEXT = this._CANVAS.getContext('2d');
  var pat =  this._CONTEXT.createPattern(img3, "repeat"); 
   this._CONTEXT.fillStyle = pat;
   this._CONTEXT.fillRect(0, 0, 1900, 1900);

}
clearCanvas()
{
   this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
   this.setupCanvas();
}
}
