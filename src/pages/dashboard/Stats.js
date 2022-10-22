import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showStats } from '../../features/alljobs/alljobsSlice'
import { StatsContainer, Loading, ChartsContainer } from '../../components';
import { useSelector } from 'react-redux';



const  Stats = () => {

   const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch()



  useEffect(()=>{

 dispatch(showStats())

  },[])

  return <>
  
  <StatsContainer/>
  {monthlyApplications.length > 0 && <ChartsContainer/>}
   
  </>
}

export default Stats