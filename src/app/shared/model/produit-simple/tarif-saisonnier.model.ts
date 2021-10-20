
export class TarifSaisonnier {
  _id?: string;
  couleurSaison?: string;
  saison?: string;
  dateDebut?: Date;
  dateFin?: Date;
  labelTarif?: string;
  tarifUHT?:number;
  monnaie?: string;
  appToAllDistrs?: boolean;
  concernDistrs?: string[];
  noConcernDistrs?: string[];
  appToAllZones?: boolean;
  concernZones?: string[];
  noConcernZones?: string[];
  produitService?: any;
}
