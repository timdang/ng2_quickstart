import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import {Observable} from "rxjs";

@Injectable()
export class HeroService {
  private heroesURL = 'app/heroes';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  private handleError(error: any): Promise<any> {
    console.error('An error', error);
    return Promise.reject(error.message || error);
  }
  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesURL)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve => setTimeout(resolve, 2000))
      .then(() => this.getHeroes());
  }
  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(data => data.find(hero => hero.id === id));
  }
  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesURL}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }
  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesURL, JSON.stringify({ name: name }), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.heroesURL}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

}
