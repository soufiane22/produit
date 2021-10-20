import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PricingRule } from '../../model/pricing-rule/pricing-rule.model';

@Injectable({
  providedIn: 'root'
})
export class PricingRuleService {

  constructor(private httpClient: HttpClient) { }
  getAllPricingRule(): Observable<PricingRule[]>{
    return this.httpClient.get<PricingRule[]>(environment.apiPricing+'pricing-rule');
  }

  addPricingRule(pricingRule: PricingRule): Observable<PricingRule>{
    return this.httpClient.post<PricingRule>(environment.apiPricing+'pricing-rule', pricingRule);
  }

  editPricingRule(id: any, pricingRule: PricingRule){
    return this.httpClient.patch<PricingRule>(environment.apiPricing+`pricing-rule/${id}`, pricingRule);
  }

  findPricingRuleById(id: string):Observable<PricingRule>{
    return this.httpClient.get<PricingRule>(environment.apiPricing+`pricing-rule/${id}`);
  }

  findPricingRuleByProductId(id: string):Observable<PricingRule>{
    return this.httpClient.get<PricingRule>(environment.apiPricing+`pricing-rule/${id}/product-pricing-rule`);
  }

  deletePricingRuleById(id: string):Observable<PricingRule>{
    return this.httpClient.delete<PricingRule>(environment.apiPricing+`pricing-rule/${id}`);
  }

  addGrilleToList(idPricingRule: any, idGrille: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}/add-grille-to-list`, { grilleId: idGrille });
  }

  removeGrilleFromList(idPricingRule: any, idGrille: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}/remove-grille-from-list`, { grilleId: idGrille });
  }

  addFraisAdditionnelToList(idPricingRule: any, idFraisAdditionnel: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}/add-frais-additionnel-to-list`, { fraisAdditionnelId: idFraisAdditionnel });
  }

  removeFraisAdditionnelFromList(idPricingRule: any, idFraisAdditionnel: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}/remove-frais-additionnel-from-list`, { fraisAdditionnelId: idFraisAdditionnel });
  }

  addPricingRuleInteressement(idPricingRule: any, idInteressement: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}`, { interessement: idInteressement });
  }

  removePricingRuleInteressemnt(idPricingRule: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}`, { interessement: null });
  }

  addPricingRuleReduction(idPricingRule: any, idReduction: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}`, { reduction: idReduction });
  }

  removePricingRuleReduction(idPricingRule: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}`, { reduction: null });
  }

  addPricingRuleAdjustement(idPricingRule: any, idAdjustement: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}`, { adjustement: idAdjustement });
  }

  removePricingRuleAdjustement(idPricingRule: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}`, { adjustement: null });
  }
  addProductToList(idPricingRule: any, idProduct: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}/add-product-to-list`, { productId: idProduct });
  }

  removeProductFromList(idPricingRule: any, idProduct: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}/remove-product-from-list`, { productId: idProduct });
  }

  addBuyGetToList(idPricingRule: any, idBuyGet: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}/add-buy-get-to-list`, { buyGetId: idBuyGet });
  }

  removeBuyGetFromList(idPricingRule: any, idBuyGet: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}/remove-buy-get-from-list`, { buyGetId: idBuyGet });
  }

  addInstConditionToList(idPricingRule: any, idInstCondition: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}/add-inst-condition-to-list`, { instConditionId: idInstCondition });
  }

  removeInstConditionFromList(idPricingRule: any, idInstCondition: any) {
    return this.httpClient.patch(environment.apiPricing + `pricing-rule/${idPricingRule}/remove-inst-condition-from-list`, { instConditionId: idInstCondition });
  }
}
