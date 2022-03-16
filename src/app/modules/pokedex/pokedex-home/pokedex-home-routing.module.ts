import { PokedexHomeComponent } from './pokedex-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetPokemonsResolver } from 'src/app/core/resolvers/get-pokemons.resolver';

const routes: Routes = [
  {
    path: '',
    component: PokedexHomeComponent,
    resolve: {
      pokemons: GetPokemonsResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokedexHomeRoutingModule { }


