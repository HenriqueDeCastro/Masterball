import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: 'games',
      loadChildren:() => import('./modules/games/games.module').then((m) => m.GamesModule)
    },
    {
      path: 'home',
      loadChildren:() => import('./modules/home/home.module').then((m) => m.HomeModule),
    },
    {
      path: 'not-found',
      loadChildren:() => import('./modules/not-found/not-found.module').then((m) => m.NotFoundModule)
    },
    {
      path: 'pokedex',
      loadChildren:() => import('./modules/pokedex/pokedex.module').then((m) => m.PokedexModule)
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home'
    },
    {
      path: '**',
      redirectTo: 'not-found',
      pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
