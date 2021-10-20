import { ProduitSimple } from "./produit-simple.model"

export class CritereCalculable {
  _id?:string;
  groupeCritere?: string;
  refCritere?: string;
  label?: string;
  valeur?: string;
  uniteValeur?: string;
  produitService?:any;
}
