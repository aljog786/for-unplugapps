import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeaderData, DetailRow } from '../types';

interface SalesState {
    header: HeaderData;
    rows: DetailRow[];
}

const initialState: SalesState = {
    header: {
        vrNo: 0,
        vrDate: new Date().toISOString().split('T')[0],
        status: 'A',
        acName: '',
    },
    rows: [
        { id: 1, srNo: 1, itemCode: '', itemName: '', description: '', qty: 0, rate: 0, amt: 0 },
    ],
};

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        setHeaderField: <K extends keyof HeaderData>(
            state: SalesState,
            action: PayloadAction<{ field: K; value: HeaderData[K] }>
        ) => {
            const { field, value } = action.payload;
            (state.header as any)[field] = value;
        },
        setHeaderData: (state: SalesState, action: PayloadAction<HeaderData>) => {
            state.header = action.payload;
        },
        addRow: (state: SalesState) => {
            const lastRow = state.rows[state.rows.length - 1];
            const newSrNo = lastRow ? lastRow.srNo + 1 : 1;
            state.rows.push({
                id: Date.now(),
                srNo: newSrNo,
                itemCode: '',
                itemName: '',
                description: '',
                qty: 0,
                rate: 0,
                amt: 0,
            });
        },
        removeRow: (state: SalesState, action: PayloadAction<number>) => {
            state.rows = state.rows.filter((row: DetailRow) => row.id !== action.payload);
            state.rows.forEach((row: DetailRow, index: number) => {
                row.srNo = index + 1;
            });
        },
        updateRowField: <K extends keyof DetailRow>(
            state: SalesState,
            action: PayloadAction<{ id: number; field: K; value: DetailRow[K] }>
        ) => {
            const { id, field, value } = action.payload;
            const row = state.rows.find((r: DetailRow) => r.id === id);
            if (row) {
                (row as any)[field] = value;
                if (field === 'qty' || field === 'rate') {
                    row.amt = Number(row.qty) * Number(row.rate);
                }
            }
        },
        updateRowFromItem: (
            state: SalesState,
            action: PayloadAction<{ id: number; itemCode: string; itemName: string }>
        ) => {
            const { id, itemCode, itemName } = action.payload;
            const row = state.rows.find((r: DetailRow) => r.id === id);
            if (row) {
                row.itemCode = itemCode;
                row.itemName = itemName;
            }
        },
        setRows: (state: SalesState, action: PayloadAction<DetailRow[]>) => {
            state.rows = action.payload;
        },
        resetSales: (state: SalesState) => {
            state.header = {
                ...initialState.header,
                vrDate: new Date().toISOString().split('T')[0]
            };
            state.rows = [...initialState.rows];
        },
    },
});

export const {
    setHeaderField,
    setHeaderData,
    addRow,
    removeRow,
    updateRowField,
    updateRowFromItem,
    setRows,
    resetSales,
} = salesSlice.actions;

export default salesSlice.reducer;
