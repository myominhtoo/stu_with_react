import { useEffect , useReducer, useState  } from "react";
import { errorReducer , ERROR_ACTIONS } from './CreateUserPage';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { useNavigate, useSearchParams } from "react-router-dom";

export const LoginPage = () => {

    const [ user , setUser ] = useState({
      email : "",
      password : ""
    });

    const [ isLogging , setIsLogging ] = useState(false);

    const [ error , dispatch ] = useReducer( errorReducer , {
      email : "",
      pwd : "",
    } );

    const [ search , setSearch ] = useSearchParams();

    const navigate = useNavigate();

    const validate = () => {
      
      user.email == ""
      ? dispatch( { type : ERROR_ACTIONS.SET_EMAIL , payload : "Email must not be empty!" } )
      : dispatch( { type : ERROR_ACTIONS.SET_EMAIL , payload : ""  } );

      user.password == ""
      ? dispatch( { type : ERROR_ACTIONS.SET_PWD , payload : "Password must not be empty!" } )
      : dispatch( { type : ERROR_ACTIONS.SET_PWD , payload : "" } )
    }

    const handleLogin = (e) => {

        e.preventDefault();
        
        validate();

        if( user.email != ""  && user.password != "" )
        {
          setIsLogging( true );

          fetch(`http://localhost:3000/users?email=${user.email}`)
          .then( res => res.json() )
          .then( usr => {

            setIsLogging( false );
             
            if( usr.length == 0 )
            {
              dispatch( { type : ERROR_ACTIONS.SET_EMAIL , payload : "Invalid email address!" } );
            }
            else
            {
              if( usr[0].password == user.password )
              {
                
                const { set } = useLocalStorage();
                set( "user" , usr[0]);
            
                navigate("/home?status=Successfully Loggined!" , { replace : true } );

              }
              else
              {
                dispatch( { type : ERROR_ACTIONS.SET_EMAIL , payload : "" });
                dispatch( { type : ERROR_ACTIONS.SET_PWD , payload : "Email & password do not match!" } );
              }

            }
            
          })

        }


    }

    useEffect( () => {
      document.title = "login";
    });

    return (
       <main id="login-main" className="container-fluid mx-auto d-flex justify-content-center align-items-center row">
          <div className="col-xl-4 col-md-6 col-none-8 p-5 card">

            <header className="card-header">
              <h4 className="h4 text-center">Login Your Account!</h4>
              <h6 className="h6 text-center text-danger">{search.get("status")}</h6>
            </header>

            <form onSubmit={ handleLogin } className="card-body">
              <div className="form-group my-2">
                <label htmlFor="" className="form-label">Email</label>
                <input
                 value={user.email}
                 onChange={ e => setUser( prevUser => {
                  return { ...prevUser , email : e.target.value }
                 })}
                 type="email" className="form-control" placeholder="Enter email address" autoFocus />
                 <label id="error">{error.email}</label>
              </div>

              <div className="form-group my-2">
                <label htmlFor="" className="form-label">Password</label>
                <input
                  value={user.password}
                  onChange={ e => setUser( prevUser => {
                    return { ...prevUser , password : e.target.value }
                  }) }
                  type="text" className="form-control" placeholder="Enter password" />
                  <label id="error">{error.pwd}</label>
              </div>

              <div className="form-group my-3">
                <button type="submit" className="btn btn-primary w-100">
                  {
                    isLogging
                    ? "Logging..."
                    : "Login"
                  }
                </button>
              </div>
            </form>

          </div>
       </main>
    )   
}