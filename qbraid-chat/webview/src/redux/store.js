import { configureStore } from "@reduxjs/toolkit";
import { chatApi } from "../api/chatApi";
import { deviceApi } from "../api/deviceApi";


const store = configureStore({
    reducer: {
        [chatApi.reducerPath]: chatApi.reducer,
        [deviceApi.reducerPath]: deviceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(chatApi.middleware)
            .concat(deviceApi.middleware)
});

export default store;