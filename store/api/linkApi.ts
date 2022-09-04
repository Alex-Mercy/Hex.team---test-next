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

export type ShortLink = {
  link: string
  token: string
}

export const linkApi = createApi({
  reducerPath: 'linkApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://79.143.31.216/' }),
  tagTypes: ['Link'],
  endpoints: (build) => ({
    getLinks: build.query<LinkResponseType[], string>({
      query: (token) => ({
        url: `statistics?order=asc_short&offset=0`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Link'],
    }),
    shortLink: build.mutation<LinkResponseType, ShortLink>({
      query: ({ link, token }) => ({
        url: `link=${link}`,
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Link'],
    }),
  }),
})
