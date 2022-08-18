import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Main } from '../components/Main.jsx';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect , useState , useReducer  } from 'react';
import { useNavigate } from 'react-router-dom';
import { ERROR_ACTIONS , errorReducer } from './CreateUserPage.jsx';


export const UserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ error , dispatch ] = useReducer( errorReducer , {
        name : "",
        email : "",
        pwd : "",
        confirm : "",
        role : ""
    } );

    const [ isLoading , setIsLoading ] = useState(false);
    const [ user , setUser ] = useState({
        confirmPwd : "",
    });

    const [ authUser , setAuthUser ] = useState({});

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


    function fetchUser()
    {
        setIsLoading(true);

        fetch(`http://localhost:3000/users/${id}`)
        .then( res => res.json() )
        .then( user => {
            if( user != null ) setIsLoading(false); 

            setUser( prevUser => {
                return { ...prevUser , ...user }
            });
        })
    }

    const validate = () => {

        user.name == "" 
        ? dispatch( { type :  ERROR_ACTIONS.SET_NAME , payload : "Username must not be empty!"} )
        : dispatch( { type : ERROR_ACTIONS.SET_NAME  , payload : "" } );

        user.email == ""
        ? dispatch( { type : ERROR_ACTIONS.SET_EMAIL , payload : "Email must not be empty ! " } )
        : dispatch( { type : ERROR_ACTIONS.SET_EMAIL , payload : "" } );

        user.password == ""
        ? dispatch( { type : ERROR_ACTIONS.SET_PWD , payload : "Password must not be empty! " } )
        : dispatch( { type : ERROR_ACTIONS.SET_PWD , payload : "" } )


        user.confirmPwd == ""
        ? dispatch( { type : ERROR_ACTIONS.SET_CON , payload : "Confirm-passowrd must not be empty!" } )
        : dispatch( { type : ERROR_ACTIONS.SET_CON , payload : "" } )

        user.role == ""
        ? dispatch( { type : ERROR_ACTIONS.SET_ROLE , payload : "Role must be choice!" } )
        : dispatch( { type : ERROR_ACTIONS.SET_ROLE , payload : "" } )

        if( user.password != "" && user.confirmPwd != "" && user.password  != user.confirmPwd )
        {
            dispatch( { type : ERROR_ACTIONS.SET_PWD_N_CON , payload : "Password & confirm-password do not match!" } );
        }

    }

    function handleUpdate(e)
    {
        e.preventDefault();

        validate();

        if( user.name != "" && user.email != "" && user.password != "" && user.confirmPwd != "" && user.role != "" && user.password == user.confirmPwd  )
        {

            fetch(`http://localhost:3000/users`)
            .then( res => res.json() )
            .then( users => {
                if( users != null )
                {
                    let isDuplicate = false;

                    for( let usr of users )
                    {
                        if( usr.email == user.email && usr.id != user.id )
                        {
                            isDuplicate = true;
                            break;
                        }
                    }

                    if( isDuplicate )
                    {
                        dispatch( { type : ERROR_ACTIONS.SET_EMAIL , payload : "Duplicate email!"} );
                    }
                    else
                    {
                        fetch(`http://localhost:3000/users/${user.id}` , {
                            method : "put",
                            headers : {
                                "Content-type" : "application/json"
                            },
                            body : JSON.stringify({
                                name : user.name,
                                email : user.email,
                                password : user.password,
                                role : user.role
                            })
                        })
                        .then(  res => {
                            if(res.ok)
                            {
                                alert("Successfully Updated!");
                                navigate("/users");
                            }
                        })
                    }
                }
            }) 
        }
    }

    useEffect(() => {

        fetchUser();

    } , [] );

    return (
        <>
         <Navbar
          user={authUser}
         />
         
         <Main>
            
            <h3 className="h3 mx-5 my-5 px-3 text-center">Update User</h3>

            <div className='w-auto h-auto'>
                {
                    isLoading 
                    ? <h3 className="h3 text-center">Loading....</h3>
                    :  <form onSubmit={handleUpdate} className="form w-50 mx-auto">
                            <div className="form-group my-3">
                                <label htmlFor="" className="form-label">Username</label>
                                <input
                                onChange={ e => { setUser( prev => {
                                    return {
                                        ...prev , 
                                        name : e.target.value,
                                    }
                                } )} }
                                value={user.name} type="text" className="form-control" placeholder='Enter username'/>
                                <span id="error">{ error.name }</span>
                            </div>

                            <div className="form-group my-3">
                                <label htmlFor="" className="form-label">Email</label>   
                                <input
                                onChange={ e => setUser( prev => {
                                    return {
                                        ...prev,
                                        email : e.target.value
                                    }
                                })}
                                value={user.email} type="email" className="form-control" placeholder='Enter email' />
                                <span id="error">{ error.email }</span>
                            </div>

                            <div className="form-group my-3">
                                <label htmlFor="" className="form-label">Password</label>
                                <input
                                onChange={ e => setUser( prev => {
                                    return {
                                        ...prev,
                                    password : e.target.value
                                    }
                                }) }
                                value={user.password} type="password" className="form-control" placeholder='Enter password' />
                                <span id="error">{ error.pwd }</span>
                            </div>

                            <div className="form-group my-3">
                                <label htmlFor="" className="form-label">Confirm-password</label>
                                <input
                                onChange={ e => setUser( prev => {
                                    return {
                                        ...prev,
                                        confirmPwd : e.target.value
                                    }
                                }) }
                                value={user.confirmPwd} type="password" className="form-control" placeholder='Enter confirm password' />
                                <span id="error">{  error.confirm }</span>
                            </div>

                            <div className="form-group my-3">
                                <label htmlFor="" className="form-label">Role</label>
                                <select
                                onChange={ e => setUser( prev => {
                                    return {
                                        ...prev,
                                        role : e.target.value
                                    }
                                } ) }
                                value={user.role}
                                name="" id="" className="form-select" >
                                    <option value="0">User</option>
                                    <option value="1">Admin</option>
                                </select>
                                <span id="error">{ error.role  }</span>
                            </div>

                            <div className="form-group">
                                <button type='submit' className="btn btn-primary w-100">Register</button>
                            </div>
                        </form>
                }
            </div>

            <br />
            <br />

         </Main>
        </>
    )
}