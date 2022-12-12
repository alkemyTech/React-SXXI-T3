import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import backofficeReducer from "../features/backoffice/backofficeSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    backoffice: backofficeReducer
  }
});
