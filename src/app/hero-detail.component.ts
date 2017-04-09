import {Component,Input,OnInit} from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {Hero} from './model/hero';
import {HeroService} from './hero.service';

@Component({
    selector:'hero-detail',
    template:`<div *ngIf="hero">
                <h3>{{hero.name}} Details!!!</h3>
                <div>
                    <label>Id: </label>{{hero.id}}
                </div>
                <div>
                    <label>Name: </label>
                    <input type="text" [(ngModel)]="hero.name" placeholder="name"/>
                </div> 
                <div><button (click)="save()">Update</button></div> 
                <div><button (click)="goBack()">Go Back</button></div> 
            </div>`,
    styleUrls:['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit{
    constructor(private heroService:HeroService, private activatedRoute:ActivatedRoute,private location:Location){}
    @Input() hero:Hero;

    ngOnInit(){
       this.activatedRoute.params
       .switchMap((params:Params)=>this.heroService.getHero(+params['id']))
        .subscribe(item=>this.hero=item);
    }

    goBack():void{
        this.location.back();
    }

    save():void{
        this.heroService.updateHero(this.hero).then(()=>this.goBack());        
    }
}