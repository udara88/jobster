
import { configureStore  } from '@reduxjs/toolkit'
import alljobsSlice from './features/alljobs/alljobsSlice';
import jobSlice from './features/job/jobSlice';
import userSlice from './features/user/userSlice'





export const store  = configureStore({
    reducer:{
        user: userSlice,
        job:jobSlice,
        allJobs:alljobsSlice

    },
    
})