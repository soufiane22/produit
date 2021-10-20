import { Translation } from "./translation.model";

export class Menu {
  _id?:string;
  translations?:Translation[];
  path?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}
