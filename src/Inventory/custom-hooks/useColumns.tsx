import { useMemo } from 'react';
import { InventoryItem } from '../interface';
import usePermissions from '../../custom-hooks/usePermissions';
import {
	DeleteOutlined,
	EditOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
} from '@ant-design/icons';
import { checkDefinedValue, formatPrice } from '../../utils';

export const useColumns = ({
	onEdit,
	onDeleteEntry,
	onDisableEntry,
}: {
	onEdit: (data: InventoryItem, index: number) => void;
	onDeleteEntry: (index: number) => void;
	onDisableEntry: (index: number) => void;
}) => {
	const { ENABLE_DELETE_PRODUCT, ENABLE_DISABLE_ROW, ENABLE_EDIT_PRODUCT } =
		usePermissions();
	const columns = useMemo(() => {
		return [
			{
				title: 'Name',
				render: (data: InventoryItem) =>
					data?.is_disabled ? (
						<span className="text-neutral-500">{data.name || '-'}</span>
					) : (
						data.name || '-'
					),
			},
			{
				title: 'Category',
				render: (data: InventoryItem) =>
					data?.is_disabled ? (
						<span className="text-neutral-500">{data.category || '-'}</span>
					) : (
						data.category || '-'
					),
			},
			{
				title: 'Price',
				render: (data: InventoryItem) => {
					const value = checkDefinedValue(data.price)
						? formatPrice(Number(data.price.replace('$', '')))
						: '-';
					return data.is_disabled ? (
						<span className="text-neutral-500">{value}</span>
					) : (
						value
					);
				},
			},
			{
				title: 'Quantity',
				render: (data: InventoryItem) =>
					data.is_disabled ? (
						<span className="text-neutral-500">{data.quantity}</span>
					) : (
						data.quantity
					),
			},
			{
				title: 'Value',
				render: (data: InventoryItem) => {
					const value = checkDefinedValue(data.value)
						? formatPrice(Number(data.value.replace('$', '')))
						: '-';
					return data.is_disabled ? (
						<span className="text-neutral-500">{value}</span>
					) : (
						value
					);
				},
			},
			{
				title: 'ACTION',
				render: (data: InventoryItem, index: number) => {
					return (
						<span className="flex gap-3">
							<button
								onClick={(e) => {
									e.stopPropagation();
									onEdit(data, index);
								}}
								disabled={!ENABLE_EDIT_PRODUCT || data.is_disabled}
								className={`text-green-500 ${
									!ENABLE_EDIT_PRODUCT || data.is_disabled
										? 'cursor-not-allowed text-neutral-500'
										: ''
								}`}
							>
								<EditOutlined className="svg-sm" />
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									onDisableEntry(index);
								}}
								disabled={!ENABLE_DISABLE_ROW}
								className={`${
									!ENABLE_DISABLE_ROW
										? 'cursor-not-allowed text-neutral-500'
										: 'text-indigo-300'
								}`}
							>
								{data.is_disabled ? (
									<EyeInvisibleOutlined className="svg-sm" />
								) : (
									<EyeOutlined className="svg-sm" />
								)}
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									onDeleteEntry(index);
								}}
								disabled={!ENABLE_DELETE_PRODUCT}
								className={`text-red-500 ${
									!ENABLE_DELETE_PRODUCT &&
									'cursor-not-allowed text-neutral-500'
								}`}
							>
								<DeleteOutlined className="svg-sm" />
							</button>
						</span>
					);
				},
			},
		];
	}, [ENABLE_DELETE_PRODUCT, ENABLE_DISABLE_ROW, ENABLE_EDIT_PRODUCT]);
	return columns;
};
