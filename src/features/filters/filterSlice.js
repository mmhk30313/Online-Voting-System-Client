import { 
    createSlice 
} from "@reduxjs/toolkit";

const initialState = {
    status: "All",
    colors: [],
};

// create slice
const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        changeColor: (state, action) => {
            state.colors.push(action.payload);
        },
        changeStatus: (state, action) => {
            state.status = action.payload;
        },
        removeColor: (state, action) => {
            state.colors = state.colors.filter((color) => color !== action.payload);
        }
    },
});

export const { changeColor, removeColor, changeStatus } = filterSlice.actions;
export default filterSlice.reducer;
