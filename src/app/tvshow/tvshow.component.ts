import { Component, OnInit } from '@angular/core';
import { myShow } from './myShow';
import { TvsServiceService } from '../tvs-service.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.css']
})
export class TvshowComponent implements OnInit {
  basepath = 'https://image.tmdb.org/t/p/w780'
  allTvShows: myShow[] = [];
  totalpages: number = 0;
  currentpage: number = 1;
  constructor(public mytvShowService: TvsServiceService) { }

  ngOnInit(): void {
    this.mytvShowService.getAllTvShows(this.currentpage).subscribe({
      next: (api_data) => {
        this.allTvShows = api_data.results;
        this.totalpages = api_data.total_results;
      },
    });
  }

  changepage(pagedata: PageEvent) {
    this.currentpage = pagedata.pageIndex + 1;
    this.mytvShowService.getAllTvShows(this.currentpage).subscribe({
      next: (api_data) => {
        this.allTvShows = api_data.results;
        this.totalpages = api_data.total_results;
      },
    });
  }
}
