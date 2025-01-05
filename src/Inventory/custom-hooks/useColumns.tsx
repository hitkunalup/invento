import { useState } from 'react';
import { InventoryItem } from '../interface';
import usePermissions from '../../custom-hooks/usePermissions';
import {
	DeleteOutlined,
	EditOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
} from '@ant-design/icons';

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

	const [columns] = useState<
		Array<{
			title: string;
			render: (
				data: InventoryItem,
				index: number
			) => JSX.Element | string | number;
		}>
	>([
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
			render: (data: InventoryItem) => data.price,
		},
		{
			title: 'Quantity',
			render: (data: InventoryItem) => data.quantity,
		},
		{
			title: 'Value',
			render: (data: InventoryItem) => data.value,
		},
		{
			title: 'ACTION',
			render: (data: InventoryItem, index: number) => (
				<span className="flex gap-2">
					<button
						onClick={() => {
							onEdit(data, index);
						}}
						disabled={!ENABLE_EDIT_PRODUCT || data.is_disabled}
						className={`text-green-500 ${
							(!ENABLE_EDIT_PRODUCT || data.is_disabled) && 'cursor-not-allowed'
						}`}
					>
						<EditOutlined />
					</button>
					<button
						onClick={() => {
							onDisableEntry(index);
						}}
						disabled={!ENABLE_DISABLE_ROW}
						className={`text-red-500 ${
							!ENABLE_DISABLE_ROW && 'cursor-not-allowed'
						}`}
					>
						{data.is_disabled ? <EyeInvisibleOutlined /> : <EyeOutlined />}
					</button>
					<button
						onClick={() => {
							onDeleteEntry(index);
						}}
						disabled={!ENABLE_DELETE_PRODUCT || data.is_disabled}
						className={`text-red-500 ${
							(!ENABLE_DELETE_PRODUCT || data.is_disabled) &&
							'cursor-not-allowed'
						}`}
					>
						<DeleteOutlined />
					</button>
				</span>
			),
		},
	]);

	return columns;
};
