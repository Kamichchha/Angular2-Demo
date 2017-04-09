import {Injectable} from '@angular/core';
import {Headers,Http} from '@angular/http';
import {Hero} from './model/hero';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService{
    heroesUrl:string='api/heroes';

    constructor(private http:Http){}

    getHeroes():Promise<Hero[]>{
        return this.http.get(this.heroesUrl)
                .toPromise()
                .then(response=>response.json().data as Hero[])
                .catch(this.handleError);
    }

    getHeroesSlowly():Promise<Hero[]>{
        return new Promise(resolve=>{
            setTimeout(()=>resolve(this.getHeroes()),500);
        });
    }

    getHero(id):Promise<Hero>{
        const url=this.heroesUrl+'/'+id;
         return this.http.get(url)
                .toPromise()
                .then(response=>response.json().data as Hero)
                .catch(this.handleError);
    };

    private headers =new Headers({'ContentType':'application/json'});
    updateHero(hero:Hero):Promise<Hero>{
       // const url='${this.heroesUrl}/${id}';     
        const url=this.heroesUrl+'/'+hero.id;
         return this.http.put(url,JSON.stringify(hero),{headers:this.headers})
                .toPromise()
                .then(()=>hero)
                .catch(this.handleError);
    }

    create(hero:string):Promise<Hero>{
        return this.http.post(this.heroesUrl,JSON.stringify({name:hero}),{headers:this.headers})
            .toPromise()
            .then(res=>res.json().data as Hero)
            .catch(this.handleError);
    }

    delete(id:number):Promise<Hero>{
        const url=this.heroesUrl+'/'+id;
        return this.http.delete(url,{headers:this.headers})
            .toPromise()
            .then(()=>null)
            .catch(this.handleError);
    }

    private handleError(error:any):Promise<any>{
        console.log('Error occured : '+error);
        return Promise.reject(error.message||error);
    }
}