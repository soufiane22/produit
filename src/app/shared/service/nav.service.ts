import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from "./windows.service";

// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor(@Inject(WINDOW) private window) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener("window:resize", ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', badgeType: 'primary', active: false
		},
		{
			title: 'Produits', icon: 'box', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/gestion-produits/simple/list-produits', title: 'Produits Lists', type: 'link' },
						{ path: '/gestion-produits/simple/add-produit', title: 'Add Produit', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Tarif Saisonnier', icon: 'cloud', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/tarif-saisonnier/simple/list-tarif-saisonnier', title: 'Tarif Saisonnier Lists', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Grille Tarifaire', icon: 'layout', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/grille-tarifaire/simple/list-grille-tarifaire', title: 'Grille Tarifaire Lists', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Tarif Unitaire Variable', icon: 'life-buoy', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/tarif-unitaire-variable/simple/list-tarif-unitaire-variable', title: 'Tarif Unitaire Variable Lists', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Annotation', icon: 'star', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/annotation/simple/list-annotation', title: 'Annotation Lists', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Distinction', icon: 'file-plus', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/distinction/simple/list-distinction', title: 'Distinction Lists', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Montée En Gamme', icon: 'activity', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/montee-en-gamme/simple/list-montee-en-gamme', title: 'Montée En Gamme Lists', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Critère Calculable', icon: 'thermometer', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/critere-calculable/simple/list-critere-calculable', title: 'Critère Calculable Lists', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Expédition', icon: 'truck', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/expedition/simple/list-expedition', title: 'Expédition Lists', type: 'link' },
						{ path: '/expedition/simple/add-expedition', title: 'Add Expédition', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Indication Frais Additionnel', icon: 'dollar-sign', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/ind-frais-add/simple/list-ind-frais-add', title: 'Indication Frais Additionnel Lists', type: 'link' },
						{ path: '/ind-frais-add/simple/add-ind-frais-add', title: 'Add Indication Frais Additionnel', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Indication Promo', icon: 'package', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/ind-promo/simple/list-ind-promo', title: 'Indication Promo Lists', type: 'link' },
						{ path: '/ind-promo/simple/add-ind-promo', title: 'Add Indication Promo', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Indication Stock', icon: 'box', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/ind-stock/simple/list-ind-stock', title: 'Indication Stock Lists', type: 'link' },
						{ path: '/ind-stock/simple/add-ind-stock', title: 'Add Indication Stock', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Instance Caracteristique', icon: 'clipboard', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/inst-caract/simple/list-inst-caract', title: 'Inst Caracteristique Lists', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Instance Caracteristique Variante', icon: 'clipboard', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/inst-caract-var/simple/list-inst-caract-var', title: 'Inst Caracteristique Variante Lists', type: 'link' },
						{ path: '/inst-caract-var/simple/add-inst-caract-var', title: 'Add Inst Caracteristique Variante', type: 'link' }
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Instance Classification', icon: 'clipboard', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/inst-classif/simple/list-inst-classif', title: 'Inst Classification Lists', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Contenu Multimedia', icon: 'clipboard', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/cont-mmedia/simple/list-cont-mmedia', title: 'Contenu multimedia Lists', type: 'link' },
						{ path: '/cont-mmedia/simple/add-cont-mmedia', title: 'Add Contenu multimedia', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Instance Commentaire Interne', icon: 'clipboard', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/inst-com-int/simple/list-inst-com-int', title: 'Instance Commentaire Interne Lists', type: 'link' },
						{ path: '/inst-com-int/simple/add-inst-com-int', title: 'Add Instance Commentaire Interne', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Marque', icon: 'clipboard', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/marque/simple/list-marque', title: 'Marque Lists', type: 'link' },
						{ path: '/marque/simple/add-marque', title: 'Add Marque', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Garantie Assurance', icon: 'clipboard', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/gar-assur/simple/list-gar-assur', title: 'Garantie Assurance Lists', type: 'link' },
						{ path: '/gar-assur/simple/add-gar-assur', title: 'Add Garantie Assurance', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Produit Associé', icon: 'clipboard', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/prod-assoc/simple/list-prod-assoc', title: 'Produit associé Lists', type: 'link' },
						{ path: '/prod-assoc/simple/add-prod-assoc', title: 'Add Produit associé', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Produit Composant', icon: 'clipboard', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/prod-comp/simple/list-prod-comp', title: 'Produit Composant Lists', type: 'link' },
						{ path: '/prod-comp/simple/add-prod-comp', title: 'Add Produit Composant', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Variante Horizontale', icon: 'clipboard', type: 'sub', active: false, children: [
				{
					title: 'Simple', type: 'sub', children: [
						{ path: '/var-horiz/simple/list-var-horiz', title: 'Variante Horizontale Lists', type: 'link' },
						{ path: '/var-horiz/simple/add-var-horiz', title: 'Add Variante Horizontale', type: 'link' },
					],
				},
				{
					title: 'Achat', type: 'sub', children: [

					],
				},
				{
					title: 'Vente', type: 'sub', children: [

					],
				}
			]
		},
		{
			title: 'Utilisateurs', icon: 'users', type: 'sub', active: false, children: [
				{ path: '/gestion-utilisateurs/list-utilisateurs', title: 'Utilisateurs Lists', type: 'link' },
				{ path: '/gestion-utilisateurs/add-utilisateur', title: 'Add Utilisateur', type: 'link' },
			]
		},

	]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
