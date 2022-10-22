import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'
import customFetch from "../../utils/axios";
import { setUserToLOcalStorage,getUserFromLocalStorage, removUserFromLocalStorage } from "../../utils/localstrorage";
import {registerUserThunk,loginUserThunk,updateUserThunk} from './userThunk'



export const registerUser = createAsyncThunk('user/register',async(user,thunkAPI)=>{
    return registerUserThunk('/auth/register',user,thunkAPI)
})



export const loginUser = createAsyncThunk('user/login',async(user,thunkAPI)=>{


 return loginUserThunk('/auth/login',user,thunkAPI)

})

export const updateUser = createAsyncThunk('user/updateUser',
async(user,thunkAPI)=>{

  return updateUserThunk('auth/updateUser',user,thunkAPI)


})


const initialState = {
    isLoading:false,
    isSideBarOpen:true,
    showLogout:false,
    user:getUserFromLocalStorage(),


}


const userSlice =  createSlice({
    name:'user',
    initialState,
    reducers:{
      toggleSideBar:(state) =>{
        state.isSideBarOpen = !state.isSideBarOpen
      },
      toggleDropDown:(state) =>{
        state.showLogout =  !state.showLogout
      },

      logoutUser:(state,{payload}) =>{
        state.user =  null
        state.isSideBarOpen = false
        removUserFromLocalStorage()
        if (payload) {
          toast.success(payload)
        }
      },
       

    },
        extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      setUserToLOcalStorage(user)
      state.user = user;
     
      toast.success(`Hello There ${user.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [loginUser.pending]:(state)=>{
      state.isLoading = true
    },
    [loginUser.fulfilled]:(state,{payload})=>{

      console.log(payload);
      const {user} = payload
      state.isLoading = false
      state.user =  user
       setUserToLOcalStorage(user)
      toast.success(`Welcome back  ${user.name}`)
    },
    [loginUser.rejected]:(state,{payload})=>{
      state.isLoading = false
      toast.error(payload)
    },

    [updateUser.pending]:(state) =>{
      state.isLoading = true
    },
    [updateUser.fulfilled]:(state,{payload})=>{
      const {user} =  payload
      state.isLoading = false
      state.user = user
      setUserToLOcalStorage(user)
      toast.success(`User updated`)

    },
    [updateUser.rejected] :(state,{payload})=>{
      state.isLoading = false
      toast.error(payload)
    }
  
    
  }
})


export const {toggleSideBar,toggleDropDown,logoutUser}  = userSlice.actions
export default userSlice.reducer