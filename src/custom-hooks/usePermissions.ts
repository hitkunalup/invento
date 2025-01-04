import { useSelector } from 'react-redux';
import { REDUX_STATE } from '../slices/interface';
import { useMemo } from 'react';
import { ADMIN } from '../constants';

const usePermissions = () => {
	const user = useSelector((state: REDUX_STATE) => state.user);

	const permissionObj = useMemo(() => {
		const defaultPermissions = {
			ENABLE_EDIT_PRODUCT: false,
			ENABLE_DELETE_PRODUCT: false,
			ENABLE_DISABLE_ROW: false,
		};

		if (user.userRole === ADMIN) {
			defaultPermissions.ENABLE_DELETE_PRODUCT = true;
			defaultPermissions.ENABLE_DISABLE_ROW = true;
			defaultPermissions.ENABLE_EDIT_PRODUCT = true;
		}
		return defaultPermissions;
	}, [user.userRole]);

	return permissionObj;
};

export default usePermissions;
