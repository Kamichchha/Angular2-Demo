import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroListComponent} from './hero-list.component';


const ROUTES=[{
      path:'dashboard',
      component:DashboardComponent
    },
    {
      path:'heroes',
      component:HeroListComponent
    },
    {
      path:'detail/:id',
      component:HeroDetailComponent
    },
    {
      path:'',
      redirectTo:'/dashboard',
      pathMatch:'full'
    }];

@NgModule({
    imports:[RouterModule.forRoot(ROUTES)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}