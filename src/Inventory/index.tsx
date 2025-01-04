import Header from './Header';
import Card from './Card';
import './index.scss';
import InventoryTable from './InventoryTable';
import { useStateValues } from './custom-hooks/useStateValues';

const Inventory = () => {
	const { loading, data } = useStateValues();
	return (
		<>
			<Header />
			<main className="mt-6 flex flex-col gap-6 px-4 w-full">
				<h1>Inventory Stats</h1>
				<section className="flex gap-4">
					<Card label="Total product" value={30} icon={<></>} />
					<Card label="Total store value" value={30} icon={<></>} />
					<Card label="Out of stocks" value={30} icon={<></>} />
					<Card label="No of Category" value={30} icon={<></>} />
				</section>
				<InventoryTable loading={loading} data={data} />
			</main>
		</>
	);
};

export default Inventory;
