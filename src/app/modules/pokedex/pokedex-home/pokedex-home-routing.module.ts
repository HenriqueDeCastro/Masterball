import { GetRegionsResolver } from './../../../core/resolvers/get-regions/get-regions.resolver';
import { GetTypesResolver } from './../../../core/resolvers/get-types/get-types.resolver';
import { PokedexHomeComponent } from './pokedex-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetPokemonsResolver } from 'src/app/core/resolvers/get-pokemons/get-pokemons.resolver';

const routes: Routes = [
  {
    path: '',
    component: PokedexHomeComponent,
    resolve: {
      pokemons: GetPokemonsResolver,
      types: GetTypesResolver,
      regions: GetRegionsResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokedexHomeRoutingModule { }


