export class Pelicula{
    constructor(
        public titulo: String,
        public id_pelicula: BigInt,
        public fechaestreno: Date,
        public duracion: BigInt,
        public puntuacion: BigInt,
        public sinopsis: String,
        public poster_url: String,
    ) {}
}