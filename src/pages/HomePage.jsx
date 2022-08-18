import { Navbar } from '../components/Navbar';
import { Main } from '../components/Main.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const HomePage = () => {

    const [ search , setSearch ] = useSearchParams();

    const [ authUser , setAuthUser ] = useState({});
    
    const navigate = useNavigate();

    const { get } = useLocalStorage();
  
    useEffect(() => {

      if( get("user") == null )
      {
        navigate("/login?status=Please continue to login!" , { replace : true } );
      }
      else{
        setAuthUser(get("user"));
      }
      
    } , [] );
    
    return (
        <>
          <Navbar
           user={authUser}
          />
           
          <Main>

            <h3 className="h5 mx-5 my-5 px-3 text-start"> <span className='text-success h5'>{search.get("status")}</span> Welcome <span className='text-capitalize'>{authUser.name}</span> !</h3>
            <h6 className="h6 my-3 mx-5 px-3 ">Testing with React + Vite </h6>

          </Main>
        </>
    )
}