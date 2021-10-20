export class PricingRule {
    _id?:string;
    ref_pricing?:string;
    rule_number?:string;
    object_of_rule?:string;
    designation?:string;
    description?:string;
    comment_note?:string;
    state_of_rule?:string;
    tarif_variable_par_saison?: boolean;
    tarif_variable_par_zone_geographique?: boolean;
    tarif_variable_par_distributeur?:boolean;
    tarif_variable_par_variante?:boolean;
    tarif_variable_par_quantite?:boolean;
    type_periode?:string;
    date_de_debut_periode?: string;
    date_de_fin_periode?:string;
    state_of_pricing?:string;
    grilles?:any[];
    frais_additionnels?:any[];
    created_by?:any;
    categories?:any[];
    products?:any[];
    interessement?:any;
    adjustement?:any;
    buy_gets?:any[];
    reduction?:any;
    inst_conditions?:any[];

}
