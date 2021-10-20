import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'gestion-produits',
    loadChildren: () => import('../../components/gestion-produits/gestion-produits.module').then(m => m.GestionProduitsModule),
    data: {
      breadcrumb: "Produits"
    }
  },
  {
    path: 'tarif-saisonnier',
    loadChildren: () => import('../../components/tarif-saisonnier/tarif-saisonnier.module').then(m => m.TarifSaisonnierModule),
    data: {
      breadcrumb: "Tarif Saisonnier"
    }
  },
  {
    path: 'grille-tarifaire',
    loadChildren: () => import('../../components/grille-tarifaire/grille-tarifaire.module').then(m => m.GrilleTarifaireModule),
    data: {
      breadcrumb: "Grille Tarifaire"
    }
  },
  {
    path: 'tarif-unitaire-variable',
    loadChildren: () => import('../../components/tarif-unitaire-variable/tarif-unitaire-variable.module').then(m => m.TarifUnitaireVariableModule),
    data: {
      breadcrumb: "Tarif Unitaire Variable"
    }
  },
  {
    path: 'gestion-utilisateurs',
    loadChildren: ()=> import('../../components/gestion-utilisateurs/gestion-utilisateurs.module').then(m=>m.GestionUtilisateursModule),
    data: {
      breadcrumb: "Utilisateurs"
    }
  },
  {
    path: 'cont-mmedia',
    loadChildren: ()=> import('../../components/cont-mmedia/cont-mmedia.module').then(m=>m.ContMmediaModule),
    data: {
      breadcrumb: "Contenu Multi-media"
    }
  },
  {
    path: 'critere-calculable',
    loadChildren: ()=> import('../../components/critere-calculable/critere-calculable.module').then(m=>m.CritereCalculableModule),
    data: {
      breadcrumb: "Critère Calculable"
    }
  },
  {
    path: 'distinction',
    loadChildren: ()=> import('../../components/distinction/distinction.module').then(m=>m.DistinctionModule),
    data: {
      breadcrumb: "Distinction"
    }
  },
  {
    path: 'expedition',
    loadChildren: ()=> import('../../components/expedition/expedition.module').then(m=>m.ExpeditionModule),
    data: {
      breadcrumb: "Expedition"
    }
  },
  {
    path: 'ind-frais-add',
    loadChildren: ()=> import('../../components/ind-frais-add/ind-frais-add.module').then(m=>m.IndFraisAddModule),
    data: {
      breadcrumb: "Indication Frais Additionel"
    }
  },
  {
    path: 'ind-promo',
    loadChildren: ()=> import('../../components/ind-promo/ind-promo.module').then(m=>m.IndPromoModule),
    data: {
      breadcrumb: "Indication Promo"
    }
  },
  {
    path: 'ind-stock',
    loadChildren: ()=> import('../../components/ind-stock/ind-stock.module').then(m=>m.IndStockModule),
    data: {
      breadcrumb: "Indication Stock"
    }
  },
  {
    path: 'inst-caract',
    loadChildren: ()=> import('../../components/inst-caract/inst-caract.module').then(m=>m.InstCaractModule),
    data: {
      breadcrumb: "Instance Caracteristique"
    }
  },
  {
    path: 'inst-caract-var',
    loadChildren: ()=> import('../../components/inst-caract-var/inst-caract-var.module').then(m=>m.InstCaractVarModule),
    data: {
      breadcrumb: "Instance Caracteristique Variable"
    }
  },
  {
    path: 'inst-classif',
    loadChildren: ()=> import('../../components/inst-classif/inst-classif.module').then(m=>m.InstClassifModule),
    data: {
      breadcrumb: "Instance Classification"
    }
  },
  {
    path: 'montee-en-gamme',
    loadChildren: ()=> import('../../components/montee-en-gamme/montee-en-gamme.module').then(m=>m.MonteeEnGammeModule),
    data: {
      breadcrumb: "Montee En Gamme"
    }
  },
  {
    path: 'annotation',
    loadChildren: ()=> import('../../components/annotation/annotation.module').then(m=>m.AnnotationModule),
    data: {
      breadcrumb: "Annotation"
    }
  },
  {
    path: 'marque',
    loadChildren: ()=> import('../../components/marque/marque.module').then(m=>m.MarqueModule),
    data: {
      breadcrumb: "Marque"
    }
  },
  {
    path: 'gar-assur',
    loadChildren: ()=> import('../../components/gar-assur/gar-assur.module').then(m=>m.GarAssurModule),
    data: {
      breadcrumb: "Garantie assurance"
    }
  },
  {
    path: 'inst-com-int',
    loadChildren: ()=> import('../../components/inst-com-int/inst-com-int.module').then(m=>m.InstComIntModule),
    data: {
      breadcrumb: "Instance commentaire interne"
    }
  },
  {
    path: 'prod-assoc',
    loadChildren: ()=> import('../../components/prod-assoc/prod-assoc.module').then(m=>m.ProdAssocModule),
    data: {
      breadcrumb: "Produit Associé"
    }
  },
  {
    path: 'prod-comp',
    loadChildren: ()=> import('../../components/prod-comp/prod-comp.module').then(m=>m.ProdCompModule),
    data: {
      breadcrumb: "Produit Composant"
    }
  },
  {
    path: 'var-horiz',
    loadChildren: ()=> import('../../components/var-horiz/var-horiz.module').then(m=>m.VarHorizModule),
    data: {
      breadcrumb: "Variante Horizontale"
    }
  }
];
