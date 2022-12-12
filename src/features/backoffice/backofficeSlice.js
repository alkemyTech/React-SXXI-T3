import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorAlert } from "../../Components/Feedback/AlertService";
import { apiONG } from "../../Services/apiONG";

export const getBackofficeInfo = createAsyncThunk(
    'backofice/info',
    async (route) => {
        const { data } = await apiONG.get(route);
        return data;
    }
)

const initialState = {
    isFetching: true,
    info: []
}

export const backofficeSlice = createSlice({
    name: 'backoffice',
    initialState,
    reducers: {
        cleanInfo: (state) => ({ ...state, info: [] })
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBackofficeInfo.pending, (state) => {
                state = { ...state, isFetching: true };
            })
            .addCase(getBackofficeInfo.fulfilled, (state, action) => {
                const { payload: { error, data } } = action;
                if (error) {
                    const errorMessage =
                        error?.response?.data?.message
                        || error.message;

                    return errorAlert(errorMessage);
                }
                return state = { isFetching: false, info: data }

            })
            .addCase(getBackofficeInfo.rejected, (state, action) => {
                const { error } = action;

                let errorMessage =
                    error?.response?.data?.message
                    || error.message;

                errorMessage === 'Request failed with status code 404'
                    ? errorMessage = 'Oops! Algo salió mal'
                    : errorMessage = 'No tienes conexión a internet'

                errorAlert(errorMessage);
            })
    }
})

export const selectBackoffice = (state) => state.backoffice

export const { cleanInfo } = backofficeSlice.actions;

export default backofficeSlice.reducer;