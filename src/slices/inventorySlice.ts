import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Inventory } from './interface';

const initialState: Inventory = {
	data: [],
	loading: true,
};

export const inventorySlice = createSlice({
	name: 'inventory',
	initialState,
	reducers: {
		setData: (state, action) => {
			state.loading = false;
			state.data = action.payload.data;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setDataAfterEdit: (state, action) => {
			state.data = state.data.map((item, index) => {
				if (index === action.payload.index) {
					return action.payload.data;
				}
				return item;
			});
		},
		setDataAfterDelete: (state, action) => {
			state.data = state.data.filter(
				(_, index) => index !== action.payload.index
			);
		},
		disableRow: (state, action) => {
			state.data = state.data.map((item, index) => {
				if (index === action.payload.index) {
					return { ...item, is_disabled: !item.is_disabled };
				}
				return item;
			});
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setData,
	setLoading,
	setDataAfterDelete,
	setDataAfterEdit,
	disableRow,
} = inventorySlice.actions;

export default inventorySlice.reducer;
