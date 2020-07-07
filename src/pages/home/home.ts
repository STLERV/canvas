import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild, ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { renderTemplate } from '@angular/core/src/render3/instructions';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage'; 
import { Escena } from '../../app/models/escena';
import { Personaje } from '../../app/models/personaje';
import { Texto } from '../../app/models/textos'
import { NodeData } from '@angular/core/src/view';
import { transition } from '@angular/core/src/animation/dsl';
import { ThrowStmt } from '@angular/compiler';

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

   ARQUERO_WIDTH : any = 48;
   ARQUERO_HEIGHT : any = 46;

   FLECHA_WIDTH : any = 26;
   FLECHA_HEIGHT : any = 24;

   listaPersonaje: Personaje[] = [];
   listaPersonajeEscenaActual: Personaje[] = [];
   listaTexto: Texto[] = [];

   tiempoSalida: any;
   tiempoEntrada: any; 
   idPersonaje: any;
   escena: Escena;
   dialogoActual: any;


/*https://2img.net/h/i1211.photobucket.com/albums/cc438/Heavy128/SuperMario3DLand/Tanooki_Bowser_False.png
https://i.ya-webdesign.com/images/sol-vector-png-5.png
https://www.nintenderos.com/wp-content/uploads/2012/09/ice_mario.png
https://imagenpng.com/wp-content/uploads/2015/08/Curiosidades-de-mario-brospng.png
https://1.bp.blogspot.com/-QuppqorADgs/TxnqL6UFPLI/AAAAAAAABIk/0orRP7EjIiU/s1600/22823512924459048355510.png
https://lh3.googleusercontent.com/proxy/UNf8EF579QOaVeOmoM2XISDy60-dBM3W0TK-A55IdH4X8HWp6jTMuj2noMLUFEPc1HumGswu1PzD9fKvRVfkXM3Gpe5BBzZ0KtstGTT1TbKCo1TYTFY
https://lh3.googleusercontent.com/proxy/kVEGssAma8IYD09wZCx4H_a9-tuQlXWytuZD0121pQobjkNZ6NDlVR1dTxQwCTdxnnVoCl67yMD9kWID8BiDdcOSusah0pdF71HUsS8n7fK8llp1JI4
https://lh3.googleusercontent.com/proxy/Ll80Bs11y_mcXi1wzPtdOYhVlnIw8KwiKL5XR6mKeMvSmP2pG01xRFJ7S3vzAZoZH48MNWkWLdfZ1dSFBeC7aLLCHvVGke869xC4E396aFavhPjSCgE
*/

   constructor(public navCtrl: NavController, public storage: Storage) {

   }
   ngOnInit() {


      this.escena = new Escena();

      //Escena para dibujar:

     
      
    
      
     
   }

   borrarPersonajeEscena(personaje: Personaje, form: NgForm){

      this.listaPersonaje.forEach(obj => {if(obj.id == personaje.id){
         obj.tiempoSalida = form.value.tiempo;
      }});
      this.escena.personajes = this.listaPersonaje;

      this.listaPersonajeEscenaActual = this.listaPersonajeEscenaActual.filter(obj => obj.id !== personaje.id);
      this.drawimages(this.listaPersonajeEscenaActual);
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
         personaje.id = this.idPersonaje;
         personaje.foto = this.imagen.src;
         personaje.positionX = e.x - this.imagenCargadaWidth / 2;
         personaje.positionY = e.y - this.imagenCargadaHeight / 2;
         personaje.tiempoEntrada = this.tiempoEntrada;
         personaje.tiempoSalida = 10000000000;

         this.listaPersonaje.push(personaje);
         this.listaPersonajeEscenaActual.push(personaje);
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

   continuarEscena(){

      this.drawimages(this.listaPersonajeEscenaActual);

   }

   putText(texto: NgForm) {

      var dialogo = new Texto();
      dialogo.texto = texto.value.name;
      dialogo.tiempo = texto.value.tiempo;
      
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

      this._CONTEXT.lineWidth = 2;
      this._CONTEXT = this._CANVAS.getContext('2d');
      this._CONTEXT.font = '48px serif';
      this._CONTEXT.strokeText(texto.value.name, 50, 750);
      this.dialogoActual = "";
 
   }

   dibujarDilogo() {

      this._CONTEXT.lineWidth = 2;
      this._CONTEXT = this._CANVAS.getContext('2d');
      this._CONTEXT.font = '30px serif';
      this._CONTEXT.strokeText(this.dialogoActual, 50, 750);

   }


   drawTriangle(): void {
      this.refreshFondo();
      this._CONTEXT.beginPath();
      this._CONTEXT.moveTo(this._CANVAS.width / 2 - 100, this._CANVAS.height / 2 + 100);
      this._CONTEXT.lineTo(this._CANVAS.width / 2 + 100, this._CANVAS.height / 2 + 100);
      this._CONTEXT.lineTo(this._CANVAS.width / 2, this._CANVAS.height / 2);
      this._CONTEXT.lineTo(this._CANVAS.width / 2 - 100, this._CANVAS.height / 2 + 100);
      this._CONTEXT.lineWidth = 10;
      this._CONTEXT.strokeStyle = '#ffffff';
      this._CONTEXT.stroke();
   }

   lineaTexto(): void {
      this._CONTEXT.beginPath();
      // this._CONTEXT.moveTo(this._CANVAS.width / 2 - 100, this._CANVAS.height / 2 + 100);
      this._CONTEXT.moveTo(0, 640);

      this._CONTEXT.lineTo(this._CANVAS.width, 640);
      // this._CONTEXT.lineTo(this._CANVAS.width / 2, this._CANVAS.height / 2);
      // this._CONTEXT.lineTo(this._CANVAS.width / 2 - 100, this._CANVAS.height / 2 + 100);
      this._CONTEXT.lineWidth = 10;
      this._CONTEXT.strokeStyle = '#000000';
      this._CONTEXT.stroke();
   }

   putImage(url: NgForm) {


      this.tiempoEntrada = url.value.tiempoentrada;
      this.idPersonaje = url.value.id;
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
      // this.refreshFondo();
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
       img3.src = '../../assets/imgs/fondo.png';
            // img3.src = '../../assets/imgs/fondo1.jpg';

      
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
      var listaParaPintar = [];
      this.timeNow = 0;
      this.interval = setInterval(() => {
         if (this.timeLeft > 0) {
            this.timeLeft--;
            this.timeNow++;
            copiaEscena.personajes.forEach(element => {
               const img = new Image();

               if (element.tiempoEntrada <= this.timeNow && element.pintado == false) {
                  // var existe = listaParaPintar.filter(obj => obj.id == element.id);
                  // if (existe == null || existe == undefined){ listaParaPintar.push(element); } 
                  listaParaPintar.push(element);
                  this.drawimages(listaParaPintar);
                  element.pintado = true;
               }


               if (element.tiempoSalida <= this.timeNow && element.pintado == true) {
                  listaParaPintar = listaParaPintar.filter(obj => obj.id !== element.id);
                  this.drawimages(listaParaPintar);
                  element.pintado = "fuera";
               }

            });

            copiaEscena.textos.forEach(dialogo => {

               if (dialogo.tiempo <= this.timeNow && dialogo.escrito == false)
               {
                  dialogo.escrito = true;
                  this.dialogoActual = dialogo.texto

                  this.drawimages(listaParaPintar);

               }

            })

         } else {
            this.timeLeft = 60;
         }
      }, 1)
   }

   cargaDemo(){

      var brujita = new Personaje();
      brujita.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      brujita.id = brujita;
      brujita.positionX = -200; //0
      brujita.positionY = 390; //555
      brujita.tiempoEntrada = 0;
      brujita.tiempoSalida = 300;
      brujita.ancho = 122;
      brujita.alto = 112;
      brujita.positionEnImagenX =22; 
      brujita.positionEnImagenY =155;

   
      
      this.listaPersonaje.push(brujita);
      this.escena.personajes = this.listaPersonaje;

      

 
   
     

      brujita = new Personaje();
      brujita.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      brujita.id = brujita;
      brujita.positionX = -100; //0
      brujita.positionY = 390; //555
      brujita.tiempoEntrada = 330;
      brujita.tiempoSalida = 400;
      brujita.ancho = 122;
      brujita.alto = 112;
      brujita.positionEnImagenX =22; 
      brujita.positionEnImagenY =155;

   
      
      this.listaPersonaje.push(brujita);
      this.escena.personajes = this.listaPersonaje;

      brujita = new Personaje();
      brujita.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      brujita.id = brujita;
      brujita.positionX = 0; //0
      brujita.positionY = 390; //555
      brujita.tiempoEntrada = 410;
      brujita.tiempoSalida = 590;
      brujita.ancho = 122;
      brujita.alto = 112;
      brujita.positionEnImagenX =22; 
      brujita.positionEnImagenY =155;

   
      
      this.listaPersonaje.push(brujita);
      this.escena.personajes = this.listaPersonaje;

      brujita = new Personaje();
      brujita.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      brujita.id = brujita;
      brujita.positionX = 50; //0
      brujita.positionY = 390; //555
      brujita.tiempoEntrada = 600;
      brujita.tiempoSalida = 790;
      brujita.ancho = 122;
      brujita.alto = 112;
      brujita.positionEnImagenX =22; 
      brujita.positionEnImagenY =155;

   
      
      this.listaPersonaje.push(brujita);
      this.escena.personajes = this.listaPersonaje;

      brujita = new Personaje();
      brujita.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      brujita.id = brujita;
      brujita.positionX = 100; //0
      brujita.positionY = 390; //555
      brujita.tiempoEntrada = 800;
      brujita.tiempoSalida = 1010;
      brujita.ancho = 122;
      brujita.alto = 112;
      brujita.positionEnImagenX =22; 
      brujita.positionEnImagenY =155;

   
      
      this.listaPersonaje.push(brujita);
      this.escena.personajes = this.listaPersonaje;

      brujita = new Personaje();
      brujita.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      brujita.id = brujita;
      brujita.positionX = 150; //0
      brujita.positionY = 390; //555
      brujita.tiempoEntrada = 1030;
      brujita.tiempoSalida = 1200;
      brujita.ancho = 122;
      brujita.alto = 112;
      brujita.positionEnImagenX =22; 
      brujita.positionEnImagenY =155;

   
      
      this.listaPersonaje.push(brujita);
      this.escena.personajes = this.listaPersonaje;

      brujita = new Personaje();
      brujita.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      brujita.id = brujita;
      brujita.positionX = 200; //0
      brujita.positionY = 390; //555
      brujita.tiempoEntrada = 1220;
      brujita.tiempoSalida = 1400;
      brujita.ancho = 122;
      brujita.alto = 112;
      brujita.positionEnImagenX =22; 
      brujita.positionEnImagenY =155;

   
      
      this.listaPersonaje.push(brujita);
      this.escena.personajes = this.listaPersonaje;

      this.listaPersonaje.push(brujita);
      this.escena.personajes = this.listaPersonaje;

      brujita = new Personaje();
      brujita.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      brujita.id = brujita;
      brujita.positionX = 250; //0
      brujita.positionY = 390; //555
      brujita.tiempoEntrada = 1420;
      brujita.tiempoSalida = 1620;
      brujita.ancho = 122;
      brujita.alto = 112;
      brujita.positionEnImagenX =22; 
      brujita.positionEnImagenY =155;

   
      
      this.listaPersonaje.push(brujita);
      this.escena.personajes = this.listaPersonaje;


      brujita = new Personaje();
      brujita.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      brujita.id = brujita;
      brujita.positionX = 300; //0
      brujita.positionY = 390; //555
      brujita.tiempoEntrada = 1630;
      brujita.tiempoSalida = 1800;
      brujita.ancho = 122;
      brujita.alto = 112;
      brujita.positionEnImagenX =22; 
      brujita.positionEnImagenY =155;

   
      
      this.listaPersonaje.push(brujita);
      this.escena.personajes = this.listaPersonaje;


      
      brujita = new Personaje();
      brujita.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      brujita.id = brujita;
      brujita.positionX = 350; //0
      brujita.positionY = 390; //555
      brujita.tiempoEntrada = 1830;
      brujita.tiempoSalida = 2000000000000000000000;
      brujita.ancho = 122;
      brujita.alto = 112;
      brujita.positionEnImagenX =22; 
      brujita.positionEnImagenY =155;

   
      
      this.listaPersonaje.push(brujita);
      this.escena.personajes = this.listaPersonaje;

      var dialogo = new Texto();
      dialogo.texto = "Brujita: Aquí hay luz...";
      dialogo.tiempo = 0;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

       dialogo = new Texto();
      dialogo.texto = "Brujita: Ahg, como odio las cuevas, me duelen los pies de andar";
      dialogo.tiempo = 700;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

      var dialogo = new Texto();
      dialogo.texto = "Brujita: Y encima estas dos van extremadamente lentas";
      dialogo.tiempo = 1400;
     this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

      var dialogo = new Texto();
      dialogo.texto = "Brujita: tantas armas y armaduras para nada...";
      dialogo.tiempo = 1800;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

      var dialogo = new Texto();
      dialogo.texto = "Brujita: *suspira*";
      dialogo.tiempo = 2200;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;


      var dialogo = new Texto();
      dialogo.texto = "Brujita: ¡CHICAS, OS PODEIS DAR PRISA POR FAVOR!";
      dialogo.tiempo = 2600;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

      var dialogo = new Texto();
      dialogo.texto = "Samurai: ¡QUE SÍ QUE SÍ, YA ESTAMOS!";
      dialogo.tiempo = 3000;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

      var samurai = new Personaje();
      samurai.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      samurai.id = samurai;
      samurai.positionX = -200; //0
      samurai.positionY = 390; //555
      samurai.tiempoEntrada = 3200;
      samurai.tiempoSalida = 3400;
      samurai.ancho = 97;
      samurai.alto = 106;
      samurai.positionEnImagenX =374; 
      samurai.positionEnImagenY =158;

   
      
      this.listaPersonaje.push(samurai);
      this.escena.personajes = this.listaPersonaje;

      var samurai = new Personaje();
      samurai.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      samurai.id = samurai;
      samurai.positionX = -100; //0
      samurai.positionY = 390; //555
      samurai.tiempoEntrada = 3450;
      samurai.tiempoSalida = 3650;
      samurai.ancho = 97;
      samurai.alto = 106;
      samurai.positionEnImagenX =374; 
      samurai.positionEnImagenY =158;

   
      
      this.listaPersonaje.push(samurai);
      this.escena.personajes = this.listaPersonaje;

      var samurai = new Personaje();
      samurai.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      samurai.id = samurai;
      samurai.positionX = -50; //0
      samurai.positionY = 390; //555
      samurai.tiempoEntrada = 3650;
      samurai.tiempoSalida = 3850;
      samurai.ancho = 97;
      samurai.alto = 106;
      samurai.positionEnImagenX =374; 
      samurai.positionEnImagenY =158;

   
      
      this.listaPersonaje.push(samurai);
      this.escena.personajes = this.listaPersonaje;

      var samurai = new Personaje();
      samurai.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      samurai.id = samurai;
      samurai.positionX = 0; //0
      samurai.positionY = 390; //555
      samurai.tiempoEntrada = 3860;
      samurai.tiempoSalida = 4060;
      samurai.ancho = 97;
      samurai.alto = 106;
      samurai.positionEnImagenX =374; 
      samurai.positionEnImagenY =158;

   
      
      this.listaPersonaje.push(samurai);
      this.escena.personajes = this.listaPersonaje;

      var reina = new Personaje();
      reina.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      reina.id = reina;
      reina.positionX = -200; //0
      reina.positionY = 340; //555
      reina.tiempoEntrada = 3870;
      reina.tiempoSalida = 4070;
      reina.ancho = 101;
      reina.alto = 139;
      reina.positionEnImagenX =147; 
      reina.positionEnImagenY =127;

   
      
      this.listaPersonaje.push(reina);
      this.escena.personajes = this.listaPersonaje;

      var samurai = new Personaje();
      samurai.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      samurai.id = samurai;
      samurai.positionX = 50; //0
      samurai.positionY = 390; //555
      samurai.tiempoEntrada = 4100;
      samurai.tiempoSalida = 4300;
      samurai.ancho = 97;
      samurai.alto = 106;
      samurai.positionEnImagenX =374; 
      samurai.positionEnImagenY =158;

   
      this.listaPersonaje.push(samurai);
      this.escena.personajes = this.listaPersonaje;

      var reina = new Personaje();
      reina.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      reina.id = reina;
      reina.positionX = -150; //0
      reina.positionY = 340; //555
      reina.tiempoEntrada = 4110;
      reina.tiempoSalida = 4310;
      reina.ancho = 101;
      reina.alto = 139;
      reina.positionEnImagenX =147; 
      reina.positionEnImagenY =127;

      
      this.listaPersonaje.push(reina);
      this.escena.personajes = this.listaPersonaje;

      var samurai = new Personaje();
      samurai.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      samurai.id = samurai;
      samurai.positionX = 100; //0
      samurai.positionY = 390; //555
      samurai.tiempoEntrada = 4330;
      samurai.tiempoSalida = 4570;
      samurai.ancho = 97;
      samurai.alto = 106;
      samurai.positionEnImagenX =374; 
      samurai.positionEnImagenY =158;

      
      this.listaPersonaje.push(samurai);
      this.escena.personajes = this.listaPersonaje;


      var reina = new Personaje();
      reina.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      reina.id = reina;
      reina.positionX = -100; //0
      reina.positionY = 340; //555
      reina.tiempoEntrada = 4320;
      reina.tiempoSalida = 4525;
      reina.ancho = 101;
      reina.alto = 139;
      reina.positionEnImagenX =147; 
      reina.positionEnImagenY =127;

   
      
      this.listaPersonaje.push(reina);
      this.escena.personajes = this.listaPersonaje;

      var samurai = new Personaje();
      samurai.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      samurai.id = samurai;
      samurai.positionX = 150; //0
      samurai.positionY = 390; //555
      samurai.tiempoEntrada = 4600;
      samurai.tiempoSalida = 4800;
      samurai.ancho = 97;
      samurai.alto = 106;
      samurai.positionEnImagenX =374; 
      samurai.positionEnImagenY =158;

      this.listaPersonaje.push(samurai);
      this.escena.personajes = this.listaPersonaje;

      var reina = new Personaje();
      reina.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      reina.id = reina;
      reina.positionX = -100; //0
      reina.positionY = 340; //555
      reina.tiempoEntrada = 4610;
      reina.tiempoSalida = 4780;
      reina.ancho = 101;
      reina.alto = 139;
      reina.positionEnImagenX =147; 
      reina.positionEnImagenY =127;

   
      
      this.listaPersonaje.push(reina);
      this.escena.personajes = this.listaPersonaje;

      var samurai = new Personaje();
      samurai.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      samurai.id = samurai;
      samurai.positionX = 200; //0
      samurai.positionY = 390; //555
      samurai.tiempoEntrada = 4810;
      samurai.tiempoSalida = 22222222222;
      samurai.ancho = 97;
      samurai.alto = 106;
      samurai.positionEnImagenX =374; 
      samurai.positionEnImagenY =158;

   
      
      this.listaPersonaje.push(samurai);
      this.escena.personajes = this.listaPersonaje;

      var reina = new Personaje();
      reina.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      reina.id = reina;
      reina.positionX = -50; //0
      reina.positionY = 340; //555
      reina.tiempoEntrada = 4820;
      reina.tiempoSalida = 5020;
      reina.ancho = 101;
      reina.alto = 139;
      reina.positionEnImagenX =147; 
      reina.positionEnImagenY =127;
         
      this.listaPersonaje.push(reina);
      this.escena.personajes = this.listaPersonaje;

      var reina = new Personaje();
      reina.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      reina.id = reina;
      reina.positionX = 0; //0
      reina.positionY = 340; //555
      reina.tiempoEntrada = 5030;
      reina.tiempoSalida = 5200;
      reina.ancho = 101;
      reina.alto = 139;
      reina.positionEnImagenX =147; 
      reina.positionEnImagenY =127;
         
      this.listaPersonaje.push(reina);
      this.escena.personajes = this.listaPersonaje;

      var reina = new Personaje();
      reina.foto = '../../assets/imgs/6fcf009f7a53cbe55821145cd74596dc.png';
      reina.id = reina;
      reina.positionX = 50; //0
      reina.positionY = 340; //555
      reina.tiempoEntrada = 5230;
      reina.tiempoSalida = 22222222222222222222;
      reina.ancho = 101;
      reina.alto = 139;
      reina.positionEnImagenX =147; 
      reina.positionEnImagenY =127;
         
      this.listaPersonaje.push(reina);
      this.escena.personajes = this.listaPersonaje;

      
      var dialogo = new Texto();
      dialogo.texto = "Samurai: No sé porque siempre tienes que ir corriendo de un sitio a otro";
      dialogo.tiempo = 5250;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

      
      var dialogo = new Texto();
      dialogo.texto = "Brujita: El problema es que tú vas muy despacio";
      dialogo.tiempo = 5650;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

      
      var dialogo = new Texto();
      dialogo.texto = "Samurai: Pues mira que cuando entrenamos, siempre dices que vaya más despacio...";
      dialogo.tiempo = 6050;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

      
      var dialogo = new Texto();
      dialogo.texto = "Brujita: ¡ESO ES MENTIRA!";
      dialogo.tiempo = 6500;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

      var dialogo = new Texto();
      dialogo.texto = "Reina: ¡OS PODEIS CENTRAR DE UNA VEZ!";
      dialogo.tiempo = 7000;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

      var dialogo = new Texto();
      dialogo.texto = "Brujita: Tienes razón, será mejor centrarse";
      dialogo.tiempo = 7500;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

      
      var dialogo = new Texto();
      dialogo.texto = "BRRRRRRRRRRRRRRUUUUUUUUUUUUUUMM ";
      dialogo.tiempo = 8000;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

      var dialogo = new Texto();
      dialogo.texto = "Reina: ¿Qué ha sido ese ruido ?";
      dialogo.tiempo = 8500;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;


      var monstruo = new Personaje();
      monstruo.foto = '../../assets/imgs/Sprite_example_neoriceisgood.png';
      monstruo.id = "monstruo";
      monstruo.positionX = 700; //0
      monstruo.positionY = 180; //555
      monstruo.tiempoEntrada = 9000; //9000
      monstruo.tiempoSalida = 22222222222222222222;
      monstruo.ancho = 72;
      monstruo.alto = 74;
      monstruo.positionEnImagenX =131; 
      monstruo.positionEnImagenY =9;
 
      this.listaPersonaje.push(monstruo);
      this.escena.personajes = this.listaPersonaje;
   

      var dialogo = new Texto();
      dialogo.texto = "Monstruo: ¡BRUUUUUUAAAAAAAAAAAAAAAH!";
      dialogo.tiempo = 9010;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;
      
      var dialogo = new Texto();
      dialogo.texto = "Samurai: ¿De donde ha salido? No lo he visto ni llegar";
      dialogo.tiempo = 9500;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

      var dialogo = new Texto();
      dialogo.texto = "Reina: ¡CUIDADO, AL ATAQUE!";
      dialogo.tiempo = 10000;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;

      var dialogo = new Texto();
      dialogo.texto = "CONTINUARÁ";
      dialogo.tiempo = 10500;
      this.listaTexto.push(dialogo);
      this.escena.textos = this.listaTexto;
   }


   reconstruirEscenaOnePicture() {

      this.cargaDemo();

      var copiaEscena = this.escena;
      var listaParaPintar = [];
      this.timeNow = 0;
      this.interval = setInterval(() => {
         if (this.timeLeft > 0) {
            this.timeLeft--;
            this.timeNow++;
            copiaEscena.personajes.forEach(element => {
               const img = new Image();

               if (element.tiempoEntrada <= this.timeNow && element.pintado == false) {
                  // var existe = listaParaPintar.filter(obj => obj.id == element.id);
                  // if (existe == null || existe == undefined){ listaParaPintar.push(element); } 
                  listaParaPintar.push(element);
                  this.drawimagesInOnePicture(listaParaPintar);
                  element.pintado = true;
               }


               if (element.tiempoSalida <= this.timeNow && element.pintado == true) {
                  listaParaPintar = listaParaPintar.filter(obj => obj.id !== element.id);
                  this.drawimagesInOnePicture(listaParaPintar);
                  element.pintado = "fuera";
               }

            });

            copiaEscena.textos.forEach(dialogo => {

               if (dialogo.tiempo <= this.timeNow && dialogo.escrito == false)
               {
                  dialogo.escrito = true;
                  this.dialogoActual = dialogo.texto

                  this.drawimagesInOnePicture(listaParaPintar);

               }

            })

         } else {
            this.timeLeft = 60;
         }
      }, 1)
   }

   drawimages(escena) {

      this.clearCanvas();
      this.refreshFondo();
      this.lineaTexto();
      this.dibujarDilogo();
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


   drawimagesInOnePicture(escena) {

      this.clearCanvas();
      this.refreshFondo();
      this.lineaTexto();
      this.dibujarDilogo();
      escena.forEach(element => {
         var zoomAncho = element.ancho*2;
         var zoomAlto = element.alto*2;
         if(element.id == "monstruo"){var zoomAncho = element.ancho*6.5;
            var zoomAlto = element.alto*6.5;}

         const img = new Image();
         img.src = element.foto;
         img.onload = () => {
            this._CONTEXT = this._CANVAS.getContext('2d');

            this._CONTEXT.drawImage(   // Image
               img,
               element.positionEnImagenX,
               element.positionEnImagenY,
               element.ancho,
               element.alto,
               element.positionX,
               element.positionY,
               zoomAncho,
               zoomAlto
            );
            this._CONTEXT.stroke();
         }
      });

   }

   //Esto es un ejemplo de como pillar un mini mario en una imagen con muchos marios y medio animarlo
   startTimer() {
      var n = 0;
      var frame = this.ARQUERO_WIDTH * n;

      this.interval = setInterval(() => {
         if (this.timeLeft > 0) {
            this.timeLeft--;
            this.clearCanvas();
            const img = new Image();
            img.src = '../../assets/imgs/363156_cutesbboy_beacon-cave-background.png';
            img.onload = () => {
               this._CONTEXT = this._CANVAS.getContext('2d');

               this._CONTEXT.drawImage(   // Image
                  img,
                  // ---- Selection ----
                  230 + frame, // sx
                  7, // sy
                  this.ARQUERO_WIDTH, // sWidth
                  this.ARQUERO_HEIGHT, // sHeight
                  0, // dx
                  0, // dy
                  this.ARQUERO_WIDTH * 5,
                  this.ARQUERO_HEIGHT * 5
               );
               this._CONTEXT.stroke();
               if (n == 3) {
                  n = 0;
                  frame = 0;

               }
               else {
                  frame = this.ARQUERO_WIDTH * n;
                  n= n+1;
               }
            };
         } else {
            this.timeLeft = 60;
         }
      }, 500)
   }

   //Pausar el timer (servirá para hacer un botón de pausa igual)
   pauseTimer() {
      clearInterval(this.interval);
   }
}
