import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesServiceService } from '../movies-service.service';
import { myMovie } from '../movies/myMovie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  basepath = 'https://image.tmdb.org/t/p/w780';
  selectedmovie!: myMovie;
  selectedMovieId: any;


  constructor(public myRouts: ActivatedRoute, public myMovieService: MoviesServiceService) { }
  ngOnInit(): void {
    //
    this.selectedMovieId = parseInt(this.myRouts.snapshot.paramMap.get('id')!);
    this.myMovieService.getMovieById(this.selectedMovieId).subscribe({
      next: (singleMovie) => {
        console.log(singleMovie);
        this.selectedmovie! = singleMovie;
      }
    })
  }

}
