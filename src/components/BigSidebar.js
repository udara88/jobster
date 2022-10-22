import NavLinks from './NavLinks';
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useSelector } from 'react-redux';

function BigSidebar() {


  const {isSideBarOpen} = useSelector(store=> store.user)
  return (
    <Wrapper>
      <div className={isSideBarOpen ? 'sidebar-container show-sidebar':'sidebar-container'}>
        <div className="content">
        <header><Logo/></header>
        <NavLinks />
      </div>
      </div>
      
    </Wrapper>
  )
}

export default BigSidebar