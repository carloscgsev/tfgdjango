export class Pelicula{
    constructor(
        public titulo: String,
        public id: BigInt,
        public fechaestreno: Date,
        public duracion: BigInt,
        public puntuacion: BigInt,
        public sinopsis: String,
        public poster_url: String,
    ) {}
}