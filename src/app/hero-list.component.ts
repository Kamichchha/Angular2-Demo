import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from './model/hero';
import {HeroService} from './hero.service';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit{
  constructor(private heroService:HeroService,private router:Router){}

  title = 'Tour of Heroes';  
  selectedHero:Hero;
  heroes:Hero[];

  ngOnInit():void{
    this.getHeroes();
  }

  getHeroes():void{
    this.heroService.getHeroesSlowly().then(items=>this.heroes=items);
  }

  onSelect=function(hero){
    this.selectedHero=hero;
  };

  viewDetails=function(id){
    this.router.navigate(['/detail',id]);
  };

  addHero=function(name){
    name=name.trim();
    if(!name){return;}

    this.heroService.create(name)
        .then(hero=>{
          this.heroes.push(hero);
          this.selectedHero=null;
        });
  };

  deleteHero=function(hero){
    this.heroService.delete(hero.id)
                    .then(()=>{
                        this.heroes=this.heroes.filter(h=>h!==hero);
                        if(this.selectedHero===hero){
                          this.selectedHero=null;
                        }
                    });
  };
}



