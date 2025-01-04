import { useState } from 'react';
import { InventoryItem } from '../../interface';

export const useColumns = () => {
	const [columns] = useState([
		{
			title: 'Name',
			render: (data: InventoryItem) => data.name,
		},
		{
			title: 'Category',
			render: (data: InventoryItem) => data.category,
		},
		{
			title: 'Price',
			render: (data: InventoryItem) => `$${data.price}`,
		},
		{
			title: 'Quantity',
			render: (data: InventoryItem) => data.quantity,
		},
		{
			title: 'Value',
			render: (data: InventoryItem) => `$${data.name}`,
		},
		{
			title: 'ACTION',
			render: (data: InventoryItem) => data.name,
		},
	]);
};
