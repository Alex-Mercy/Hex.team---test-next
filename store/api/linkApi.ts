import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export type FormValues = {
  username: string
  password: string
}

export type LinkResponseType = {
  id: number
  short: string
  target: string
  counter: number
}

export const linkApi = createApi({
  reducerPath: 'linkApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://79.143.31.216/' }),
  tagTypes: ['Link'],
  endpoints: (build) => ({
    getLinks: build.query<LinkResponseType[], string>({
      query: (token) => ({
        url: `http://79.143.31.216/statistics?order=asc_short&offset=0&limit=10`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Link'],
    }),
    shortLink: build.mutation<LinkResponseType, string>({
      query: (link) => ({
        url: `link=${link}`,
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${'UuMeVrg_U8JdqQnEGap8l3nO5G5JcbpOEkQp6pScMSRRbFaSVZPzPOe3WHZI2tFQUas'}`,
        },
      }),
      invalidatesTags: ['Link'],
    }),
  }),
})
