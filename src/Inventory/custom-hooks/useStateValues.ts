import { useEffect, useState } from 'react';
import { InventoryItem } from '../interface';
import { fetchInventoryData } from '../../api';

export const useStateValues = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<Array<InventoryItem> | []>([]);

	useEffect(() => {
		fetchInventoryData()
			.then((response) => {
				setData(response);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return {
		loading,
		data,
	};
};
