import { Injectable } from '@angular/core';
import { myMovie } from './movies/myMovie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesServiceService {
  baseUrl = 'http://localhost:3000';

  constructor(public http: HttpClient) { }

  getAllMovies(
    page: number,
    pageSize: number,
  ): Observable<{ movies: myMovie[]; totalMovieCount: number }> {
    return this.http.get<{ movies: myMovie[]; totalMovieCount: number }>(
      `${this.baseUrl}/movies?page=${page}&pageSize=${pageSize}`
    );
  }

  getMovieById(movieId: number): Observable<myMovie> {
    return this.http.get<myMovie>(`${this.baseUrl}/movies/${movieId}`)

  }

  addtoWatchlist(item: myMovie): Observable<any> {
    console.log(item);

    return this.http.post(`${this.baseUrl}/addtowatchlist`, { movieId: item._id })
  }

  getWatchlist(): Observable<any> {
    return this.http.get(`${this.baseUrl}/watchlist`)
  }
}


