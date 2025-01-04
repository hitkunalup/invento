export const setItemInLs = (key: string, value: string | object) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const removeItemFromLs = (key: string) => {
	localStorage.removeItem(key);
};

export const getItemFromLs = (key: string) => {
	return localStorage.getItem(key);
};
