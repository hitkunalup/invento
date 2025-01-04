import { LogoutOutlined } from '@ant-design/icons';
import { ChangeEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REDUX_STATE } from '../slices/interface';
import { ADMIN, USER } from '../constants';
import { setUserType } from '../slices/userSlice';

const Header = () => {
	const { userRole } = useSelector((state: REDUX_STATE) => state.user);
	const dispatch = useDispatch();
	const onUserRoleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		dispatch(
			setUserType({
				role: e.target.checked ? USER : ADMIN,
			})
		);
	}, []);
	return (
		<header className="w-full bg-neutral-800 py-2 px-4 flex justify-end">
			<label className="inline-flex items-center cursor-pointer gap-3">
				<span className="ms-3 text-sm font-medium text-white">Admin</span>
				<input
					type="checkbox"
					onChange={onUserRoleChange}
					checked={!(userRole === ADMIN)}
					className="sr-only peer"
				/>
				<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
				<span className="text-sm font-medium text-white">User</span>
			</label>
			<LogoutOutlined className="ms-5" />
		</header>
	);
};

export default Header;
