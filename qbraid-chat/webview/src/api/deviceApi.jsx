import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deviceApi = createApi({
    reducerPath: "deviceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.qbraid.com/api/',
        prepareHeaders: (headers) => {
            const apiKey = localStorage.getItem('qbraidApiKey');
            if (apiKey) {
                headers.set('api-key', apiKey); // Attach API key to headers
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getDevices: builder.query({
            query: (params) => {
                const filteredParams = Object.fromEntries(
                    Object.entries(params).filter(([_, value]) => value !== '' && value !== undefined)
                );

                return {
                    url: 'quantum-devices',
                    params: filteredParams,
                };
            },
        }),
    }),
});

export const { useLazyGetDevicesQuery } = deviceApi;
