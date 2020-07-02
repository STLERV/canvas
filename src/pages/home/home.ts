import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild, ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { renderTemplate } from '@angular/core/src/render3/instructions';
import { Observable } from 'rxjs/Observable';

@Component({
   selector: 'page-home',
   templateUrl: 'home.html'


})
export class HomePage {
   @ViewChild('canvas') canvasEl: ElementRef;
   private _CANVAS: any;
   public _CONTEXT: any;

   public context: CanvasRenderingContext2D;

   ISize: { width: number; height: number; }

   x: any;
   y: any;

   fileData: File = null;
   previewUrl: any = null;
   fileUploadProgress: string = null;
   uploadedFilePath: string = null;

   imagenCargadaWidth: any;
   imagenCargadaHeight: any;



   imagen: any;

   constructor(public navCtrl: NavController) {

   }
   ngOnInit() {


   }


   ionViewDidLoad() {
      this._CANVAS = this.canvasEl.nativeElement;
      this._CANVAS.width = 1100;
      this._CANVAS.height = 800;

      this.initialiseCanvas();



   }
   initialiseCanvas() {
      if (this._CANVAS.getContext) {
         this.setupCanvas();

      }
   }


   fireEvent(e) {
      console.log(e.type);
      console.log(e.x);
      console.log(e.y);

      if(this.imagen.src){
        var ima = new Image();

        ima.onload = ()=> {

            this._CONTEXT.beginPath();
             var x =590;
             var y =590;
              this._CONTEXT.drawImage(this.imagen, e.x - this.imagenCargadaWidth/2, e.y - this.imagenCargadaHeight/2);
              this._CONTEXT.stroke();
              };
              ima.src = this.imagen.src;
            }
            else{
               console.log("No se ha cargado la imagen aun eh");
            }



   }



   drawTriangle(): void {
      this.clearCanvas();
      this._CONTEXT.beginPath();
      this._CONTEXT.moveTo(this._CANVAS.width / 2 - 100, this._CANVAS.height / 2 + 100);
      this._CONTEXT.lineTo(this._CANVAS.width / 2 + 100, this._CANVAS.height / 2 + 100);
      this._CONTEXT.lineTo(this._CANVAS.width / 2, this._CANVAS.height / 2);
      this._CONTEXT.lineTo(this._CANVAS.width / 2 - 100, this._CANVAS.height / 2 + 100);
      this._CONTEXT.lineWidth = 1;
      this._CONTEXT.strokeStyle = '#ffffff';
      this._CONTEXT.stroke();
   }

   cargaimagen(): void {
      console.log('jiji');
      var img = new Image();
      var img2 = new Image();

      this.imagen = new Image();
      this.imagen.src = "https://assets.pokemon.com/assets/cms2/img/pokedex/full//037.png"
      this.clearCanvas();

      //    img.onload = ()=> {

      //  this._CONTEXT.beginPath();
      //   var x =590;
      //   var y =590;
      //    this._CONTEXT.drawImage(img, this.x, this.y);
      //    this._CONTEXT.drawImage(img2, 1090, 1090);
      //    this._CONTEXT.stroke();
      //    };
      img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';
      img2.src = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full//037.png';

      // this.getImageDimension(this.imagen).subscribe(
      //    response => {
      //       console.log(response);
      //    });
      const image = {
         url: this.imagen.src,
         context: 'client context'
       }
       this.getImageDimension(image).subscribe(
          response => { 
            console.log(response);
            this.imagenCargadaHeight = response.height;
            this.imagenCargadaWidth = response.width;
          }
       );
   }

   vertexto() {
      this.clearCanvas();
      this._CONTEXT = this._CANVAS.getContext('2d');
      this._CONTEXT.font = '48px serif';
      this._CONTEXT.strokeText('Hola soy un texto, puedes leereme, me llamo letra.', 50, 50);
   }

   setupCanvas() {
      var img3 = new Image();
      img3.src = 'https://static.vecteezy.com/system/resources/previews/000/263/062/non_2x/cartoon-spring-or-summer-landscape-vector.jpg';
      this._CONTEXT = this._CANVAS.getContext('2d');
      var pat = this._CONTEXT.createPattern(img3, "repeat");
      this._CONTEXT.fillStyle = pat;
      this._CONTEXT.fillRect(0, 0, 1900, 1900);

   }
   clearCanvas() {
      this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
      this.setupCanvas();
   }


   fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      this.preview();
   }

   preview() {
      // Show preview 
      var mimeType = this.fileData.type;
      if (mimeType.match(/image\/*/) == null) {
         return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = (_event) => {
         this.previewUrl = reader.result;
      }
   }

   onSubmit() {
      const formData = new FormData();
      formData.append('file', this.fileData);


      console.log("Vamos a mirar que hay en la imagen")
      //this.resetForm(form);
      //this.router.navigateByUrl("/tabs/tab1");

   }





   // getImgSize(imageSrc: string): Observable<ISize> {
   //    let mapLoadedImage = (event): ISize => {
   //       return {
   //          width: event.target.width,
   //          height: event.target.height
   //       };
   //    }
   //    var image = new Image();
   //    let $loadedImg = fromEvent(image, "load").pipe(take(1), map(mapLoadedImage));
   //    // Rxjs 4 - let $loadedImg = Observable.fromEvent(image, "load").take(1).map(mapLoadedImage);
   //    image.src = imageSrc;
   //    return $loadedImg;
   // }





   getImageDimension(image): Observable<any> {
      return new Observable(observer => {
         const img = new Image();
         img.onload = function (event) {
            const loadedImage: any = event.currentTarget;
            image.width = loadedImage.width;
            image.height = loadedImage.height;
            observer.next(image);
            observer.complete();
         }
         img.src = image.url;
      });
   }


   guardarcanvas(){


      var micanvas  = document.getElementById("micanvas") as HTMLCanvasElement;
      var dataURL = micanvas.toDataURL();


   }
}
