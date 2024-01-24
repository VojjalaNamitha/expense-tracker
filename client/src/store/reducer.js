import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    transaction: []
};

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        getTransactions: (state) => {
            // get transaction code
        }
    }
});

export const { getTransactions } = expenseSlice.actions;
export const expenseReducer = expenseSlice.reducer;
