import React from 'react';
import Header from './Header';
import Cards from './Cards';
import './index.scss'
import InventoryTable from './InventoryTable';

const Inventory = () => {
	return (
		<>
			<Header />
			<main>
				<h1>Inventory Stats</h1>
				<Cards />
				<InventoryTable />
			</main>
		</>
	);
};

export default Inventory;
