import { ReactElement } from 'react';

const Card = ({
	label,
	value,
	icon,
}: {
	label: string;
	value: number;
	icon: ReactElement;
}) => {
	return (
		<div className="flex-1 bg-[#394a39] p-6 rounded-xl flex items-start gap-3">
			{icon}
			<div className="flex flex-col gap-3">
				<p className="text-white text-base">{label}</p>
				<p className="text-white text-4xl">{value}</p>
			</div>
		</div>
	);
};

export default Card;
