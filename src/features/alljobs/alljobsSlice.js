import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { logoutUser } from '../user/userSlice';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};


export const getAlljobs = createAsyncThunk('all/getJobs',async(_,thunkAPI)=>{

 const { page, search, searchStatus, searchType, sort } =
      thunkAPI.getState().allJobs;

 let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;



    if (search) {
      url =  url + `&search=${search}`
    }

  try {

    const resp = await customFetch.get(url)
    
    console.log(resp.data);
  
    return resp.data
    
  } catch (error) {

    if (error.response.status == 401) {
       
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue('Unauthorized! Logging out... ')
      
    }

    return thunkAPI.rejectWithValue(error.response.data.msg)
    
  }

})



export const showStats = createAsyncThunk('allJobs/showStats',

  async(_,thunkAPI)=>{
  try {

    const resp = await customFetch.get('/jobs/stats')
    console.log(resp.data);
    return resp.data
    
  } catch (error) {

      if (error.response.status === 401) {
         
        thunkAPI.dispatch(logoutUser())
        return thunkAPI.rejectWithValue('Unauthirized! Logging out...')
      }

    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
})

const allJobsSlice = createSlice({
    name:'allJobs',
    initialState,
    reducers:{
     handleChange:(state,{payload:{name,value}})=>{

      state.page = 1
      state[name] = value 
     },

     clearFilters:(state)=>{
      
      return {...state,...initialFiltersState}
     },
     changePage:(state,{payload})=>{
      state.page = payload
     }

    },
    extraReducers:{
      [getAlljobs.pending]:(state)=>{
        state.isLoading = true
      },

      [getAlljobs.fulfilled]:(state,{payload})=>{
        state.isLoading = false
        state.jobs = payload.jobs
        state.numOfPages = payload.numOfPages
        state.totalJobs = payload.totalJobs
      },
      [getAlljobs.rejected] :(state,{payload})=>{
        state.isLoading = false
        toast.error(payload)
      },

       [showStats.pending]:(state)=>{
        state.isLoading = true
      },

      [showStats.fulfilled]:(state,{payload})=>{
        state.isLoading = false
        state.stats = payload.defaultStats
        state.monthlyApplications = payload.monthlyApplications
      },
      [showStats.rejected] :(state,{payload})=>{
        state.isLoading = false
        toast.error(payload)
      }
    }

})


export const {handleChange,clearFilters,changePage} = allJobsSlice.actions
export default allJobsSlice.reducer



