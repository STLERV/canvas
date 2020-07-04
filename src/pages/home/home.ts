import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild, ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { renderTemplate } from '@angular/core/src/render3/instructions';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import * as html2canvas from 'html2canvas'
import { Storage } from '@ionic/storage';
import { Escena } from '../../app/models/escena';
import { Personaje } from '../../app/models/personaje'



import { NodeData } from '@angular/core/src/view';
import { transition } from '@angular/core/src/animation/dsl';

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
   pintar: boolean = false;


   MARIO_WIDTH: any = 32;
   MARIO_HEIGHT: any = 39;

   listaPersonaje: Personaje[] = [];
   escena: Escena;

   constructor(public navCtrl: NavController, public storage: Storage) {

   }
   ngOnInit() {


      this.escena = new Escena();


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

   cargarMario() {
      const img = new Image();
      img.src = '../../assets/imgs/mario.png';
      img.onload = () => {
         this._CONTEXT = this._CANVAS.getContext('2d');

         this._CONTEXT.drawImage(   // Image
            img,
            0,
            0
         );
         this._CONTEXT.stroke();
      };
   }

   fireEvent(e) {
      console.log(e.type);
      console.log(e.x);
      console.log(e.y);

      if (this.pintar == true) {
         var ima = new Image();


         ima.onload = () => {
            this._CONTEXT.beginPath();
            var x = 590;
            var y = 590;
            this._CONTEXT = this._CANVAS.getContext('2d');

            this._CONTEXT.drawImage(this.imagen, e.x - this.imagenCargadaWidth / 2, e.y - this.imagenCargadaHeight / 2);
            this._CONTEXT.stroke();
         };
         ima.src = this.imagen.src;
         this.pintar = false;

         var personaje = new Personaje();
         personaje.id = 1;
         personaje.foto = this.imagen.src;
         personaje.positionX = e.x - this.imagenCargadaWidth / 2;
         personaje.positionY = e.y - this.imagenCargadaHeight / 2;
         personaje.tiempoEntrada = 0;
         personaje.tiempoSalida = 100000000000;

         this.listaPersonaje.push(personaje);
         this.escena.personajes = this.listaPersonaje;
      }
      else {
         console.log("No se ha cargado la imagen aun eh");

         // var canvas = document.getElementById("micanvas");
         // const myContext = canvas.getContext("2d");

         // var ctx = this._CANVAS.getContext('2d');

         // var canvasPosition = canvas.getBoundingClientRect();

         // var x = e.clientX - canvasPosition.left;
         // var y = e.clientY - canvasPosition.top;

         // ctx.fillRect(x, y, 2, 2);



      }
   }

   putText(texto: NgForm) {

      this._CONTEXT = this._CANVAS.getContext('2d');
      this._CONTEXT.font = '48px serif';
      this._CONTEXT.strokeText(texto.value.name, 50, 750);

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

   putImage(url: NgForm) {

      this.pintar = true;
      var imagen = new Image();
      imagen.src = url.value.name;
      // imagen.crossOrigin = "Anonymous";

      this.imagen = imagen;

      const image = {
         url: url.value.name,
         context: 'client context'
      }
      this.getImageDimension(image).subscribe(
         response => {
            console.log(response);
            this.imagenCargadaHeight = response.height;
            this.imagenCargadaWidth = response.width;
         }
      )
   }

   cargaimagen(): void {

      this.pintar = true;
      console.log('jiji');
      var img = new Image();
      var img2 = new Image();

      img.crossOrigin = "Anonymous";
      img2.crossOrigin = "Anonymous";
      var imagen = new Image();
      imagen.src = "https://assets.pokemon.com/assets/cms2/img/pokedex/full//037.png";
      // imagen.crossOrigin = "Anonymous";

      this.imagen = imagen;
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
      img3.crossOrigin = "Anonymous";
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


   guardarcanvas() {


      var micanvas = document.getElementById("micanvas") as HTMLCanvasElement;
      var dataURL = micanvas.toDataURL();
      console.log(dataURL);

   }

   drawImageFondoMario() {
      var img3 = new Image();
      img3.src = '../../assets/imgs/fondo1.jpg';
      this._CONTEXT = this._CANVAS.getContext('2d');
      var pat = this._CONTEXT.createPattern(img3, "repeat");
      this._CONTEXT.fillStyle = pat;
      this._CONTEXT.fillRect(0, 0, 1900, 1900);

      this.escena.fondo = img3.src;

   }


   refreshFondo() {
      var img3 = new Image();
      img3.src = this.escena.fondo;
      this._CONTEXT = this._CANVAS.getContext('2d');
      var pat = this._CONTEXT.createPattern(img3, "repeat");
      this._CONTEXT.fillStyle = pat;
      this._CONTEXT.fillRect(0, 0, 1900, 1900);

      this.escena.fondo = img3.src;

   }

   timeLeft: number = 60;
   timeNow;
   interval;


   reconstruirEscena() {

      var copiaEscena = this.escena;
      var listaParaPintar = this.escena.personajes;
      this.timeNow = 0;
      this.interval = setInterval(() => {
         if (this.timeLeft > 0) {
            this.timeLeft--;
            this.timeNow++;
            copiaEscena.personajes.forEach(element => {
               const img = new Image();

               if (element.tiempoEntrada <= this.timeNow && element.pintado == false) {
                  listaParaPintar.push(element);
                  this.drawimages(listaParaPintar);
                  element.pintado = true;
               }


               if (element.tiempoSalida <= this.timeNow && element.pintado == true) {
                  listaParaPintar = listaParaPintar.filter(obj => obj.id !== element.id);
                  this.drawimages(listaParaPintar);
                  element.pintado == false;
               }



            });

         } else {
            this.timeLeft = 60;
         }
      }, 1)
   }

   drawimages(escena) {

      this.clearCanvas();
      this.refreshFondo();
      escena.forEach(element => {
         const img = new Image();
         img.src = element.foto;
         img.onload = () => {
            this._CONTEXT = this._CANVAS.getContext('2d');

            this._CONTEXT.drawImage(   // Image
               img,
               element.positionX,
               element.positionY
            );
            this._CONTEXT.stroke();
         }
      });

   }

   startTimer() {
      var frame = 0;

      this.interval = setInterval(() => {
         if (this.timeLeft > 0) {
            this.timeLeft--;
            this.clearCanvas(); 
            this.drawImageFondoMario();
            const img = new Image();
            img.src = '../../assets/imgs/mario.png';
            img.onload = () => {
               this._CONTEXT = this._CANVAS.getContext('2d');

               this._CONTEXT.drawImage(   // Image
                  img,
                  // ---- Selection ----
                  this.MARIO_WIDTH * frame, // sx
                  this.MARIO_HEIGHT * 2, // sy
                  this.MARIO_WIDTH, // sWidth
                  this.MARIO_HEIGHT, // sHeight
                  0, // dx
                  0, // dy
                  this.MARIO_WIDTH * 5,
                  this.MARIO_HEIGHT * 5
               );
               this._CONTEXT.stroke();
               if (frame == 7) {
                  frame = 0;
               }
               else {
                  frame = frame + 1;
               }
            };
         } else {
            this.timeLeft = 60;
         }
      }, 100)
   }

   pauseTimer() {
      clearInterval(this.interval);
   }
}
