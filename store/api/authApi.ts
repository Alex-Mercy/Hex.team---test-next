import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { FormValues } from '../../pages/login'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://79.143.31.216/' }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    // getIsAuthorized: build.query<MeResponseDataType, void>({
    //     query: () => ({
    //         url: 'auth/me',
    //         credentials: 'include',
    //         headers: {
    //             "API-KEY": apiKey
    //         },
    //     }),
    //     transformResponse: (response: MeResponseType) => response.data,
    //     providesTags: ['Auth']
    // }),
    login: build.mutation<any, FormValues>({
      query: ({ username, password }) => ({
        url: `login`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      }),
      invalidatesTags: ['Auth'],
    }),
    register: build.mutation<any, FormValues>({
      query: ({ username, password }) => ({
        url: `register`,
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})
