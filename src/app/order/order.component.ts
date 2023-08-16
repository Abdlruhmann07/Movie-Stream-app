import { Component, OnInit } from '@angular/core';
import { MoviesServiceService } from '../movies-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  basepath = 'https://image.tmdb.org/t/p/w780';
  userOrders: { items: any[], user: any, _id: string }[] = [];
  constructor(private myservice: MoviesServiceService) { }
  ngOnInit(): void {
    this.myservice.getOrders().subscribe({
      next: orders => {
        console.log(orders);
        this.userOrders = orders;
      }
    })
  }
}
