export const setItemInLs = (key: string, value: string | object) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const removeItemFromLs = (key: string) => {
	localStorage.removeItem(key);
};

export const getItemFromLs = (key: string) => {
	const item = localStorage.getItem(key);
	return item ? JSON.parse(item as string) : null;
};

export const checkDefinedValue = (
	value: string | null | undefined | unknown
) => {
	return value !== '' && value !== null && value !== undefined;
};
export function hasEmptyKey(obj: { [x: string]: unknown }) {
	for (const key in obj) {
		if (!checkDefinedValue(obj[key])) {
			return true; // Return true if any key is empty
		}
	}
	return false; // No empty keys found
}

export const formatPrice = (price: number) => {
	if (!checkDefinedValue(price)) return '-';
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
	}).format(price);
};
