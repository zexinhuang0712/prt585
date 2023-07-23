import { Movie } from './movie';
import { MovieFilter } from './movie-filter';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class MovieService {
  movieList: Movie[] = [];
  api = 'http://www.angular.at/api/movie';

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Movie> {
    const url = `${this.api}/${id}`;
    const params = { id: id };
    return this.http.get<Movie>(url, {params, headers});
  }

  load(filter: MovieFilter): void {
    this.find(filter).subscribe({
      next: result => {
        this.movieList = result;
      },
      error: err => {
        console.error('error loading', err);
      }
    });
  }

  find(filter: MovieFilter): Observable<Movie[]> {
    const params = {
      'id': filter.id,
      'name': filter.name,
    };

    return this.http.get<Movie[]>(this.api, {params, headers});
  }

  save(entity: Movie): Observable<Movie> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Movie>(url, entity, {headers, params});
    } else {
      url = `${this.api}`;
      return this.http.post<Movie>(url, entity, {headers, params});
    }
  }

  delete(entity: Movie): Observable<Movie> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Movie>(url, {headers, params});
    }
    return EMPTY;
  }
}

