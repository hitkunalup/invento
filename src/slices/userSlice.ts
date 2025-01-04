import { createSlice } from '@reduxjs/toolkit';
import { User } from './interface';
import { ADMIN } from '../constants';
import { getItemFromLs, setItemInLs } from '../utils';

const initialState: User = {
	userRole: ADMIN,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserType: (state, action) => {
			setItemInLs('userRole', action.payload);
			state.userRole = action.payload;
		},
		getUserType: (state) => {
			const userRole = getItemFromLs('userRole');

			state.userRole = userRole || ADMIN;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUserType } = userSlice.actions;

export default userSlice.reducer;
