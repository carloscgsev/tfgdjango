export class Pelicula{
    constructor(
        public titulo: String,
        public id: BigInt,
        public fecha_estreno: Date,
        public duracion: BigInt,
        public puntuacion: BigInt,
        public sinopsis: String,
        public poster_url: String,
    ) {}
}