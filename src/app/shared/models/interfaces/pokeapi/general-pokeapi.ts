import { ResumeInfoPokeapi } from ".";

export interface GeneralPokeapi {
  count: number;
  next: string;
  previou: any;
  results: ResumeInfoPokeapi[];
}
