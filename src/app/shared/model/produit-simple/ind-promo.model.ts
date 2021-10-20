import { Advantage } from "./advantage.model";
import { Reduction } from "./reduction.model";

export class IndPromo {
  _id?: string;
  ref_pricing_rule?: string;
  interessement?: {
    global_value?: number;
    avantages?: Advantage[]
  };
  reduction?: Reduction;
  period_debut?: string;
  period_fin?: string;
  etat_pricing_rule?: string;
  description?: string;
  commentaire?: string;
}
