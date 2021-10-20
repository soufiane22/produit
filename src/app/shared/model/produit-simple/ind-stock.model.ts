
export class IndStock {
  _id: string;
  refPartenaire?: string;
  refStock?: string;
  refRFIDStock?: any;
  refQRStock?: any;
  refCodeBarreStock?: any;
  etatStock?: string;
  indQteDispo?: boolean;
  qteDisponible?: number;
  insCaractVar?: any[];
  produitService?: any;
}
