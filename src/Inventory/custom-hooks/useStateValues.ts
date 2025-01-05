import { useEffect, useMemo, useState } from 'react';
import { fetchInventoryData } from '../../api';
import {
	DollarOutlined,
	MinusCircleOutlined,
	PieChartOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { REDUX_STATE } from '../../slices/interface';
import {
	disableRow,
	setData,
	setDataAfterDelete,
	setDataAfterEdit,
	setLoading,
} from '../../slices/inventorySlice';
import { InventoryItem } from '../interface';
import { getAndSetUserType } from '../../slices/userSlice';
import { formatPrice } from '../../utils';

export const useStateValues = () => {
	const dispatch = useDispatch();
	const { loading, data } = useSelector(
		(state: REDUX_STATE) => state.inventory
	);
	const [showAlert, setShowAlert] = useState(false);
	const [editModal, setEditModal] = useState<
		(InventoryItem & { index: number }) | null
	>(null);

	const cardsData = useMemo(() => {
		return [
			{
				id: 1,
				label: 'Total product',
				value: data.length || '-',
				icon: ShoppingCartOutlined,
			},
			{
				id: 2,
				label: 'Total store value',
				value: data?.length
					? formatPrice(
							data.reduce(
								(acc, curr) => acc + Number(curr.value.replace('$', '')),
								0
							)
					  )
					: '-',
				icon: DollarOutlined,
			},
			{
				id: 3,
				label: 'Out of stocks',
				value: data?.length
					? data?.filter((d) => !Number(d.quantity))?.length
					: '-',
				icon: MinusCircleOutlined,
			},
			{
				id: 4,
				label: 'No of Category',
				value: data?.length
					? [...new Set(data.map((d) => d.category))].length
					: '-',
				icon: PieChartOutlined,
			},
		];
	}, [data]);

	const onDeleteEntry = (index: number) => {
		dispatch(
			setDataAfterDelete({
				index,
			})
		);
	};

	const onDisableEntry = (index: number) => {
		dispatch(
			disableRow({
				index,
			})
		);
	};
	const onEditEntry = (data: InventoryItem) => {
		dispatch(
			setDataAfterEdit({
				data,
				index: editModal?.index,
			})
		);

		setEditModal(null);
	};

	const onOpenModal = (data: InventoryItem, index: number) => {
		setEditModal({
			...data,
			index,
		});
	};

	const onCloseModal = () => {
		setEditModal(null);
	};

	useEffect(() => {
		dispatch(getAndSetUserType());
		fetchInventoryData()
			.then((response) => {
				dispatch(setData({ data: response }));
			})
			.catch(() => {
				setShowAlert(true);
				setTimeout(() => {
					setShowAlert(false);
				}, 3000);
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	}, []);

	return {
		loading,
		data,
		editModal,
		cardsData,
		showAlert,
		onDeleteEntry,
		onDisableEntry,
		onEditEntry,
		onOpenModal,
		onCloseModal,
	};
};
