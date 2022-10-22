import customFetch from '../../utils/axios';
import { clearValues} from './jobSlice';
import { getAlljobs } from '../alljobs/alljobsSlice';
import { logoutUser } from '../user/userSlice';




export  const createJobThunk = async(job,thunkAPI)=>{

  try {
    const resp =  await customFetch.post('/jobs',job)
    
      thunkAPI.dispatch(clearValues())
      return resp.data.msg

  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue('Unauthorized! Logging out... ')
      
    }

    return thunkAPI.rejectWithValue(error.response.data.msg)
    
  }
  
}

export const deleteJobThunk =  async(jobId,thunkAPI)=>{
  try {

    const resp = await customFetch.delete(`/jobs/${jobId}`)
     
     thunkAPI.dispatch(getAlljobs())
    return resp.data.msg;
    
  } catch (error) {
    
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }

}

export const editJobThunk = async({Id,job},thunkAPI)=>{


  try {

    const resp = await customFetch.patch(`/jobs/${Id}`,job)

    thunkAPI.dispatch(clearValues())
    return resp.data
    
  } catch (error) {
    console.log(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }



}