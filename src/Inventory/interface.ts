export interface InventoryItem {
	name: string; // Name of the item
	category: string; // Category to which the item belongs
	value: string; // Total value of the items (formatted as a string with a dollar sign)
	quantity: number; // Quantity of the item in stock
	price: string; // Price per unit (formatted as a string with a dollar sign)
	is_disabled: boolean; // Whether the item is disabled or not
}
