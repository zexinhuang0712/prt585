import { Component, OnInit } from '@angular/core';
import { MovieFilter } from '../movie-filter';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie',
  templateUrl: 'movie-list.component.html'
})
export class MovieListComponent implements OnInit {

  filter = new MovieFilter();
  selectedMovie!: Movie;
  feedback: any = {};

  get movieList(): Movie[] {
    return this.movieService.movieList;
  }

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.movieService.load(this.filter);
  }

  select(selected: Movie): void {
    this.selectedMovie = selected;
  }

  delete(movie: Movie): void {
    if (confirm('Are you sure?')) {
      this.movieService.delete(movie).subscribe({
        next: () => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        error: err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      });
    }
  }
}
