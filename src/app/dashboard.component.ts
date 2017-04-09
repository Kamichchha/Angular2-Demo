import { Component,OnInit } from '@angular/core';
import {HeroService} from './hero.service';
import {Hero} from './model/hero';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
    constructor(private heroService:HeroService){}

    title = 'Top Heroes';    
    selectedHero:Hero;
    heroes:Hero[];

    ngOnInit():void{
        this.getHeroes();
    }

    getHeroes():void{
        this.heroService.getHeroes().then(items=>this.heroes=items.slice(1,5));
    }

    onSelect=function(hero){
        this.selectedHero=hero;
    };
    
}



