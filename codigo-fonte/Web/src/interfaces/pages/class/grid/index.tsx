'use client';

import { Card, Table, TableBody, TableContainer } from '@mui/material';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';

import { Routes } from '../../../../app/routes';
import { IClasseEntity } from '../../../../domain/entities/IClasseEntity';
import { useClassRepository } from '../../../../infrastructure/repositories/class';
import { GridLoading } from '../../../components/gridLoading';
import { TableHead, useTable } from '../../../components/table';
import { useBoolean } from '../../../hooks/useBoolean';
import { useDebounce } from '../../../hooks/useDebounce';
import { useFilters } from '../../../hooks/useFilters';
import { TableRow } from './components/tableRow';
import { TableToolbar } from './components/tableToolbar';
import { IClassFilters } from './interfaces';
import { TABLE_HEAD } from './mock/tableHeader';

export const ClassGrid = () => {
	const table = useTable({
		defaultRowsPerPage: 10,
	});

	const { rowsPerPage, page } = table;

	const isLoading = useBoolean(false);
	const router = useRouter();

	const classRepository = useClassRepository();

	const [tableData, setTableData] = useState<IClasseEntity[]>([]);

	const { filters, onFilters } = useFilters<IClassFilters>({
		initialFilters: {
			search: '',
		},
		onResetPage: table.onResetPage,
	});

	const debouncedSearch = useDebounce(filters.search);

	const dataInPage = tableData.slice(
		table.page * table.rowsPerPage,
		table.page * table.rowsPerPage + table.rowsPerPage,
	);

	const queryDataTable = async () => {
		isLoading.onTrue();

		try {
			const dataClass = await classRepository.getAll(debouncedSearch);

			if (dataClass.success) setTableData(dataClass.data || []);
			else
				enqueueSnackbar('Estabelecimento Não Encontrado', {
					variant: 'error',
				});
		} catch (error) {
			console.error(error);
			enqueueSnackbar('Erro Interno do Servidor!', { variant: 'error' });
		}

		isLoading.onFalse();
	};

	const queryDeleteClass = async (itemsSelectedDeletion: Array<string>) => {
		const results: any[] = [];

		await itemsSelectedDeletion.reduce(async (previousPromise, id) => {
			await previousPromise;
			try {
				const data = await classRepository.delete(id);
				results.push(data);
			} catch (error) {
				console.error(error);
				enqueueSnackbar('Erro Interno do Servidor!', {
					variant: 'error',
				});
			}
		}, Promise.resolve());

		const isErrorReq = results.some((result) => !result);

		if (isErrorReq) enqueueSnackbar('Erro ao deletar item!');
		else enqueueSnackbar('Items Deletados com Sucesso!');
	};

	const handleDeleteRow = useCallback(
		async (id: string) => {
			await queryDeleteClass([id]);
			setTableData(tableData.filter((row) => row.id !== id));
			table.onUpdatePageDeleteRow(dataInPage.length);
		},
		[dataInPage.length, table, tableData],
	);

	const handleEditRow = useCallback(
		(id: string) => {
			router.push(Routes.classEdit(id));
		},
		[router],
	);

	useEffect(() => {
		queryDataTable();
	}, [rowsPerPage, page, debouncedSearch, filters]);

	const renderTableContent = () => {
		if (tableData.length > 0)
			return tableData.map((row) => (
				<TableRow
					key={row.id}
					row={row as any}
					selected={table.selected.includes(String(row.id))}
					onSelectRow={() => table.onSelectRow(String(row.id))}
					onDeleteRow={() => handleDeleteRow(row.id!)}
					onEditRow={() => handleEditRow(row.id!)}
					filters={filters}
				/>
			));
	};

	return (
		<Card sx={{ width: '70vw' }}>
			<TableToolbar filters={filters} onFilters={onFilters} />
			<TableContainer
				sx={{
					height: '45vh',
					maxHeight: '45vh',
					overflow: 'auto',
					scrollbarColor: '#888 transparent',
				}}
			>
				<Table size='small'>
					<TableHead
						order={table.order}
						orderBy={table.orderBy}
						headLabel={TABLE_HEAD}
						rowCount={tableData.length}
						numSelected={table.selected.length}
						onSort={table.onSort}
						onSelectAllRows={(checked) =>
							table.onSelectAllRows(
								checked,
								tableData.map((row: any) => row.id),
							)
						}
					/>
					<TableBody>
						{isLoading.value ? (
							<GridLoading
								columns={TABLE_HEAD.length}
								rowsPerPage={table.rowsPerPage}
							/>
						) : (
							renderTableContent()
						)}
					</TableBody>
				</Table>
			</TableContainer>
			{/* <TablePaginationCustom
				count={dataInPage.length}
				page={table.page}
				rowsPerPage={table.rowsPerPage}
				onPageChange={table.onChangePage}
				onRowsPerPageChange={table.onChangeRowsPerPage}
				dense
			/> */}
		</Card>
	);
};
