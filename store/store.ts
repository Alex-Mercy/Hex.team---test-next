import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { authApi } from './api/authApi'
import { linkApi } from './api/linkApi'

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [linkApi.reducerPath]: linkApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
