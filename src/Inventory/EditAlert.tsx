import { useState } from 'react';
import { InventoryItem } from './interface';
import { CloseOutlined } from '@ant-design/icons';
import { checkDefinedValue, hasEmptyKey } from '../utils';

const EditAlert = ({
	defaultData,
	onCloseModal,
	onSave,
}: {
	defaultData: InventoryItem;
	onCloseModal: () => void;
	onSave: (data: InventoryItem) => void;
}) => {
	const [data, setData] = useState<InventoryItem>(defaultData);

	const onChange = (key: string, value: string | number) => {
		setData((prev) => ({
			...prev,
			[key]: value,
			...(key === 'price'
				? {
						value: (Number(value) * prev.quantity).toString(),
				  }
				: key === 'quantity'
				? {
						value: (Number(value) * Number(prev.price)).toString(),
				  }
				: {}),
		}));
	};

	const onSaveClick = () => {
		const dataToSave = { ...data };
		if (hasEmptyKey(dataToSave)) {
			alert('Please fill all the fields');
			return;
		}

		onSave(dataToSave);
	};
	return (
		<>
			<div
				id="crud-modal"
				tabIndex={-1}
				className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
				aria-modal="true"
				role="dialog"
			>
				<div className="relative p-3 z-10 w-full max-w-2xl min-h-56 max-h-96">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<div className="flex items-start justify-between p-3 md:p-4 rounded-t">
							<div className="flex flex-col gap-2">
								<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
									Edit product
								</h2>
								<p className="text-lg font-normal text-gray-900 dark:text-white">
									{data.name}
								</p>
							</div>
							<button
								type="button"
								onClick={onCloseModal}
								className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
							>
								<CloseOutlined />
							</button>
						</div>
						<form className="px-4 pb-5">
							<div className="grid gap-6 mb-6 grid-cols-2">
								<div className="col-span-2 sm:col-span-1">
									<label
										htmlFor="price"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Category
									</label>
									<input
										name="category"
										id="category"
										value={data.category}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Enter..."
										required
										onChange={(e) => onChange('category', e.target.value)}
									/>
								</div>
								<div className="col-span-2 sm:col-span-1">
									<label
										htmlFor="category"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Price
									</label>
									<input
										type="number"
										name="price"
										value={data?.price?.replace('$', '')}
										id="price"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Enter..."
										required
										min={0}
										onChange={(e) => {
											let value = e.target.value;
											if (checkDefinedValue(value) && Number(value) < 0) {
												value = `0`;
											}

											onChange('price', value);
										}}
									/>
								</div>
								<div className="col-span-2 sm:col-span-1">
									<label
										htmlFor="quantity"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Quantity
									</label>
									<input
										type="number"
										name="quantity"
										value={data.quantity}
										id="quantity"
										min={0}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Enter..."
										required
										onChange={(e) => {
											let value = e.target.value;
											if (checkDefinedValue(value) && Number(value) < 0) {
												value = `0`;
											}

											onChange('quantity', value);
										}}
									/>
								</div>
								<div className="col-span-2 sm:col-span-1">
									<label
										htmlFor="value"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Value
									</label>
									<input
										type="number"
										name="value"
										value={data?.value?.replace('$', '')}
										id="value"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Enter..."
										required
										min={0}
										onChange={(e) => onChange('value', e.target.value)}
									/>
								</div>
							</div>
							<div className="w-full flex justify-end gap-1">
								<button
									type="button"
									onClick={onCloseModal}
									className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={onSaveClick}
									className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
				<div>
					<div
						className="fixed inset-0 z-1 bg-black bg-opacity-50"
						data-modal-toggle="crud-modal"
						onClick={(e) => {
							e.stopPropagation();
							onCloseModal();
						}}
					></div>
				</div>
			</div>
		</>
	);
};

export default EditAlert;
