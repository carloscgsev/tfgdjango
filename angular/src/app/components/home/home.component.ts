import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  imgPaths: string[] = [
    '../../../assets/gallery/gallery-1.jpg',
    '../../../assets/gallery/gallery-2.jpg',
    '../../../assets/gallery/gallery-3.jpg',
    '../../../assets/gallery/gallery-4.jpg',
    '../../../assets/gallery/gallery-5.jpg',
    '../../../assets/gallery/gallery-6.jpg',
    '../../../assets/gallery/gallery-7.jpg',
    '../../../assets/gallery/gallery-8.jpg'
  ];

  ngOnInit(): void {
    this.shuffleImages();
  }

  shuffleImages() {
    // Shuffle the array of image paths
    this.imgPaths = this.shuffleArray(this.imgPaths);
  }

  private shuffleArray(array: any[]): any[] {
    let currentIndex = array.length;
    let temporaryValue: any;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
