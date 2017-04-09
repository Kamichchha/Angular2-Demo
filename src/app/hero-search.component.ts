import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from './model/hero';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {HeroSearchService} from './hero-search.service';

@Component({
    selector:'hero-search',
    styleUrls:['hero-search.css'],
    template:`<div id="searchComponent">
                <h4>Search Hero</h4>
                <input type="text" #searchBox (keyup)="search(searchBox.value)"/>
                <div>
                    <div *ngFor="let hero of heroes|async" (click)="goToDetail(hero)" class="search-result">
                        {{hero.name}}
                    </div>
                </div>
                </div>`,
    providers:[HeroSearchService]
})
export class HeroSearchComponent implements OnInit{
    constructor(private heroSearchService:HeroSearchService,private router:Router){}

    private searchTerms=new Subject<string>();
    heroes:Observable<Hero[]>;

    search(term:string):void{
        this.searchTerms.next(term);
    };

    ngOnInit():void{
        this.heroes=this.searchTerms
                        .debounceTime(300)
                        .distinctUntilChanged()
                        .switchMap(term=>term?this.heroSearchService.search(term):Observable.of <Hero[]>([]))
                        .catch(error=>{
                            console.log(error);
                            return Observable.of <Hero[]>([])
                        });

    };

    goToDetail(hero:Hero):void{
        this.router.navigate(['/detail',hero.id]);
    };

}