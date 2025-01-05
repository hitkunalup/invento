import TableLoader from './TableLoader';

export type Columns = Array<{
	title: string;
	render: (
		data: unknown,
		index: number
	) => JSX.Element | string | number | null;
}>;

const CustomTable = ({
	loading,
	data,
	columns,
}: {
	loading: boolean;
	data: Array<{ id?: string | number; [key: string]: unknown }>;
	columns: Columns;
}) => {
	return loading ? (
		<TableLoader />
	) : (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left rtl:text-right relative text-gray-500 dark:text-gray-400">
				<thead className="text-xs leading-8 text-yellow-100 bg-[#3d3a3a] font-normal">
					<tr key="tr">
						{columns.map((c, idx) => (
							<th key={idx} scope="col" className="px-6 py-3">
								<span className="rounded-lg p-2 bg-neutral-800">{c.title}</span>
							</th>
						))}
					</tr>
				</thead>
				{data?.length ? (
					<tbody>
						{data?.map((d, index) => {
							return (
								<tr
									key={d?.id || index}
									className="bg-[#312e2e] border-b-[0.5px] border-neutral-700"
								>
									{columns.map((c, idx) => (
										<td key={`td-${idx}`} className="px-6 text-white py-4">
											{c.render(d, index)}
										</td>
									))}
								</tr>
							);
						})}
					</tbody>
				) : (
					<tbody className="h-52 w- flex items-center text-center w-full justify-center">
						<p className="text-2xl text-neutral-200 left-1/2 top-1/2 absolute">
							No data
						</p>
					</tbody>
				)}
			</table>
		</div>
	);
};

export default CustomTable;
