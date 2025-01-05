import TableLoader from './TableLoader';

const CustomTable = ({
	loading,
	data,
	columns,
}: {
	loading: boolean;
	data: Array<{ id: string | number; [key: string]: unknown }>;
	columns: Array<{
		title: string;
		render: (data: unknown, index: number) => JSX.Element;
	}>;
}) => {
	return loading ? (
		<TableLoader />
	) : (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						{columns.map((c) => (
							<th scope="col" className="px-6 py-3">
								{c.title}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data?.length ? (
						data?.map((d, index) => {
							return (
								<tr key={d?.id} className="bg-white dark:bg-gray-800">
									{columns.map((c) => (
										<td key={c.title} className="px-6 py-4">
											{c.render(d, index)}
										</td>
									))}
								</tr>
							);
						})
					) : (
						<>No data</>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default CustomTable;
