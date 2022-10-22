import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar,toggleDropDown,logoutUser } from '../features/user/userSlice';

function Navbar() {

  const {user,showLogout} = useSelector(store => store.user)
  const dispatch = useDispatch()



  const toggle = ()=>{
    dispatch(toggleSideBar())
  }

  const toggleLogout = ()=>{
    dispatch(toggleDropDown())
  }


  return (
      <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => console.log('')}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown   onClick={toggleLogout}/>
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type='button'
              className='dropdown-btn'
              onClick={()=>dispatch(logoutUser('Logging out...'))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar

