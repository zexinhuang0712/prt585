import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieService } from './movie.service';
import { MOVIE_ROUTES } from './movie.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MOVIE_ROUTES)
  ],
  declarations: [
    MovieListComponent,
    MovieEditComponent
  ],
  providers: [MovieService],
  exports: []
})
export class MovieModule { }
