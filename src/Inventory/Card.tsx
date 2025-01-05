import { ReactElement } from 'react';

const Card = ({
	label,
	value,
	icon,
	loading,
}: {
	label: string;
	value: number | string;
	icon: ReactElement;
	loading: boolean;
}) => {
	return loading ? (
		<>
			<div className="flex-1 bg-[#394a39] p-10 rounded-xl flex items-start animate-pulse gap-3"></div>
		</>
	) : (
		<div className="flex-1 bg-[#394a39] p-6 rounded-xl flex items-start gap-3">
			<span className="svg-lg">{icon}</span>
			<div className="flex flex-col gap-3">
				<p className="text-white text-base">{label}</p>
				<p className="text-white text-4xl">{value}</p>
			</div>
		</div>
	);
};

export default Card;
