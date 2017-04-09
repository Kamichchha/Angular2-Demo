import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Hero} from './model/hero';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class HeroSearchService{
    constructor(private http:Http){}

    search(term:string):Observable<Hero[]>{
        let url:string='api/heroes/?name='+term;
        return this.http.get(url)
                        .map(response=>response.json().data as Hero[])
    }

}