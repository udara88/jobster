
import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange,clearFilters } from '../features/alljobs/alljobsSlice';




function SearchContainer() {

  const {isLoading,search,searchStatus,searchType,sort,sortOptions} = useSelector((store)=> store.allJobs)
  const dispatch = useDispatch()

  const {jobTypeOptions,jobType,statusOptions} = useSelector((store)=> store.job)

   const handleSearch = (e) =>{
  
     if (isLoading)return

    const name = e.target.name
    const value = e.target.value

    dispatch(handleChange({name,value}))


   }
   const handleSubmit = (e) =>{
     e.preventDefault()

     dispatch(clearFilters())

   }



  return <Wrapper>
     <div className="form">
      <h4>search form</h4>
      <div className="form-center">
         {/* search position */}
        <FormRow 
        type='text' 
        name='search' 
        value={search}  
        handleChange ={handleSearch}
        />
         {/* seacrh by status */}
         <FormRowSelect  labelText = 'status' name='searchStatus' value={searchStatus} handleChange={handleSearch} list ={['all',...statusOptions]}/>

         {/* seacrh by type */}
          <FormRowSelect  labelText = 'type' name='searchType' value={searchType} handleChange={handleSearch} list ={jobTypeOptions}/>

          {/* sort */}

           <FormRowSelect   name='sort' value={sort} handleChange={handleSearch} list ={sortOptions}/>
           <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit} >clear filters</button>



      </div>
     </div>
  </Wrapper>
}

export default SearchContainer