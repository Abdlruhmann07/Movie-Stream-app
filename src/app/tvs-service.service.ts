import { Injectable } from '@angular/core';
import { myShow } from './tvshow/myShow';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvsServiceService {
  api_Key = "dbc1d5aa4bc937e9bcfaf48bc9b041bb";
  url_base = "https://api.themoviedb.org/3";
  // https://api.themoviedb.org/3/tv/airing_today?api_key=dbc1d5aa4bc937e9bcfaf48bc9b041bb // movies list api
  // https://api.themoviedb.org/3/tv/{series_id} // single movie api

  allTvShows: myShow[] = [];


  chosenShow = {};
  constructor(public http: HttpClient) { }

  getAllTvShows(pagenum: number = 1): Observable<any> {

    return this.http.get(`${this.url_base}/tv/airing_today?api_key=${this.api_Key}&page=${pagenum}`)
    // return movie list
  }

  getShowById(showId: number): Observable<any> {
    return this.http.get(`${this.url_base}/tv/${showId}?api_key=${this.api_Key}`)
  }

}



