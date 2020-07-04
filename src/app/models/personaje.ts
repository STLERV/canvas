export class Personaje {


    id: any;
    foto: any;
    tiempoEntrada: any;
    tiempoSalida: any;
    positionX: any;
    positionY: any;
    pintado: any;


    constructor(
        id = '',
        foto = '',
        tiempoEntrada = '',
        tiempoSalida = '',
        positionX = '',
        positionY = '',
        pintado = false

    ) {

        this.id = id,
            this.foto = foto,
            this.tiempoEntrada = tiempoEntrada,
            this.tiempoSalida = tiempoSalida,
            this.positionX = positionX,
            this.positionY = positionY
            this.pintado = pintado

    }
}