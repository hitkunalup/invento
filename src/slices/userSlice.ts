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
			setItemInLs('userRole', action.payload.role);
			state.userRole = action.payload.role;
		},
		getUserType: (state) => {
			const userRole = getItemFromLs('userRole');

			state.userRole = userRole || ADMIN;
		},
	},
});

export const { setUserType, getUserType } = userSlice.actions;

export default userSlice.reducer;
