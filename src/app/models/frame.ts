export class Frame{
         
    personajes: any;
    textos: any
   
    constructor(
        fondo = '',
        personajes = [],
        textos = []

    ) {

     this.personajes = personajes,
     this.textos = textos

    }
}