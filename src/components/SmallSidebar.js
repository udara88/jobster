import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSideBar } from '../features/user/userSlice';
import NavLinks from './NavLinks';



function SmallSidebar() {

  const {isSideBarOpen} = useSelector(store=> store.user)
  const dispatch = useDispatch()
   
  const toggle = ()=>{
    dispatch(toggleSideBar())
  }

  return (
    <Wrapper>
        <div className={isSideBarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          <button className='close-btn' onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>

          <NavLinks toggleSideBar ={toggle} />
         
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar