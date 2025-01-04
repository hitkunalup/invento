const URL = 'https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory';

export const fetchInventoryData = async () => {
	try {
		const response = await fetch(URL);

		const data = await response.json();

		return data;
	} catch (ex) {
		throw new Error(ex as string);
	}
};
