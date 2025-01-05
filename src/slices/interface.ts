import { InventoryItem } from '../Inventory/interface';

export interface REDUX_STATE {
	user: User;
	inventory: Inventory;
}
export interface User {
	userRole: string;
}

export interface Inventory {
	loading: boolean;
	data: Array<InventoryItem> | [];
}
