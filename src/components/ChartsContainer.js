import BarChartComponent from './BarChartComponent';
import AreaChartComponent from './AreaChartComponent';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useSelector } from 'react-redux';
import { useState } from 'react';



const  ChartsContainer = () => {

  const [barChart,setBarChart] = useState(true)
  const {monthlyApplications:data} = useSelector((store)=> store.allJobs)

  return <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button'  onClick={()=> setBarChart(!barChart)}>

        {barChart ? 'Bar Chart':'Area Chart'}
      </button>

        {barChart ? <AreaChartComponent data={data} /> : <BarChartComponent data={data}/>}

    </Wrapper>
  
}

export default ChartsContainer