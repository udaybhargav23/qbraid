import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
    reducerPath: "chatApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.qbraid.com/api/',
        prepareHeaders: (headers) => {
            const apiKey = localStorage.getItem('qbraidApiKey');
            if (apiKey) {
                headers.set('api-key', apiKey); //Correct API Key Header
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getModels: builder.query({
            query: () => 'chat/models', //Fetch all available models
        }),
        sendMessage: builder.mutation({
            query: ({ prompt, model }) => ({
                url: 'chat',
                method: 'POST',
                body: { prompt, model, stream: false }, // ✅ Send chat message
            }),
        }),
    }),
});

export const { useLazyGetModelsQuery, useSendMessageMutation } = chatApi;
