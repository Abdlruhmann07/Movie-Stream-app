import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TvshowComponent } from './tvshow/tvshow.component';
import { TvShowDetailsComponent } from './tv-show-details/tv-show-details.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'tvshow', component: TvshowComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'moviesDetails/:id', component: MovieDetailsComponent },
  { path: 'tvShowDetails/:id', component: TvShowDetailsComponent },
  { path: 'watchlist', component: CartComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PagenotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
