import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvsServiceService } from '../tvs-service.service';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})
export class TvShowDetailsComponent implements OnInit {
  basepath = 'https://image.tmdb.org/t/p/w780';
  selectedShow!: any;
  selectedShowId: any = '';

  constructor(public myRouts: ActivatedRoute, public mytvShowService: TvsServiceService) { }

  ngOnInit(): void {
    this.selectedShowId = this.myRouts.snapshot.paramMap.get('id');
    this.mytvShowService.getShowById(this.selectedShowId).subscribe({
      next: (tvshow) => {
        this.selectedShow = tvshow;
      }
    });
    console.log(this.selectedShow);
  }
}
