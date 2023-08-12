import { Component, OnInit } from '@angular/core';
import { MoviesServiceService } from '../movies-service.service';
import { myMovie } from '../movies/myMovie';
import { myMovieInterface } from './myMovieInterface';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  watchlistItems: any[] = [];
  basepath = 'https://image.tmdb.org/t/p/w780';

  constructor(public myMovieService: MoviesServiceService) { }

  ngOnInit(): void {
    this.myMovieService.getWatchlist().subscribe({
      next: items => {
        console.log('inside cart')
        console.log(items);
        this.watchlistItems = items
      }
    })
  }
}
