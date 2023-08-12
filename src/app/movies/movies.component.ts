import { Component, OnInit } from '@angular/core';
import { myMovie } from './myMovie';
import { MoviesServiceService } from '../movies-service.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  allMovies: myMovie[] = []
  listofpageSize = [5, 10, 25, 100]
  pageSize: number = 5
  totalItems: number = 0;
  currentpage: number = 1;
  basepath = 'https://image.tmdb.org/t/p/w780';


  constructor(public myMovieService: MoviesServiceService) { }

  ngOnInit(): void {
    this.myMovieService.getAllMovies(this.currentpage, this.pageSize).subscribe({
      next: (movies) => {
        console.log(movies);
        this.allMovies = movies.movies
        this.totalItems = movies.totalMovieCount
      }
    })
  }
  // waiting for pagination
  changePage(pageData: PageEvent) {

  }

  addtoWatchlist(movie: myMovie) {
    this.myMovieService.addtoWatchlist(movie).subscribe({
      next: (data) => {
        console.log(data);

      }
    });
  }
}

