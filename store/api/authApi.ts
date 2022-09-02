import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export type FormValues = {
  username: string
  password: string
}

type LoginResponseType = {
  data: {
    access_token: string
    token_type: string
  }
}

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
    login: build.mutation<LoginResponseType, FormValues>({
      query: ({ username, password }) => ({
        url: `login`,
        method: 'POST',
        body: new URLSearchParams({
          username,
          password,
        }),
      }),
      invalidatesTags: ['Auth'],
    }),
    register: build.mutation<any, FormValues>({
      query: ({ username, password }) => ({
        url: `register?username=${username}&password=${password}`,
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})
