import Header from './Header';
import Card from './Card';
import './index.scss';
import { useStateValues } from './custom-hooks/useStateValues';
import ErrorAlert from '../commons/ErrorAlert';
import CustomTable, { Columns } from '../commons/CustomTable';
import { useColumns } from './custom-hooks/useColumns';
import EditAlert from './EditAlert';

const Inventory = () => {
	const {
		loading,
		data,
		editModal,
		cardsData,
		showAlert,
		onDeleteEntry,
		onDisableEntry,
		onOpenModal,
		onEditEntry,
		onCloseModal,
	} = useStateValues();
	const columns = useColumns({
		onEdit: onOpenModal,
		onDeleteEntry,
		onDisableEntry,
	});
	return (
		<>
			<Header />
			<main className="mt-6 flex flex-col gap-6 px-4 w-full pb-5">
				<h1>Inventory Stats</h1>
				<section className="flex gap-4">
					{cardsData.map((card) => (
						<Card
							key={card.id}
							label={card.label}
							value={card.value}
							icon={<card.icon />}
							loading={loading}
						/>
					))}
				</section>
				<CustomTable loading={loading} data={data as { [key: string]: unknown; id?: string | number }[]} columns={columns as unknown as Columns} />
			</main>
			{showAlert ? (
				<ErrorAlert message="Failed to fetch inventory data" />
			) : null}
			{editModal ? (
				<EditAlert
					defaultData={editModal}
					onCloseModal={onCloseModal}
					onSave={onEditEntry}
				/>
			) : null}
		</>
	);
};

export default Inventory;
