import { Navbar } from '../components/Navbar';
import { Main } from '../components/Main';
import React , { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const ERROR_ACTIONS = {
    SET_NAME : "set-name",
    SET_EMAIL : "set-email",
    SET_PWD : "set-pwd",
    SET_CON : "set-confirm",
    SET_ROLE : "set-role",
    SET_PWD_N_CON : 'set-pwd-n-con'
}

export function errorReducer( state ,  action )
{
    switch( action.type )
    {
        case ERROR_ACTIONS.SET_NAME : 
            return { ...state , name : action.payload };
        case ERROR_ACTIONS.SET_EMAIL : 
            return { ...state , email : action.payload };
        case ERROR_ACTIONS.SET_PWD : 
            return { ...state , pwd : action.payload };
        case ERROR_ACTIONS.SET_CON : 
            return { ...state , confirm : action.payload  };
        case ERROR_ACTIONS.SET_ROLE : 
            return { ...state , role : action.payload };
        case ERROR_ACTIONS.SET_PWD_N_CON  : 
            return { ...state , pwd : action.payload , confirm : action.payload }
        default : 
            return state;
    }
}

export const CreateUserPage = () => {

    

    const [ error , dispatch ] = useReducer( errorReducer , {
        name : "",
        email : "",
        pwd : "",
        confirm : "",
        role : ""
    } );

    const [ data , setData ] = useState({
        name : "",
        email : "",
        pwd : "",
        confirmPwd : "",
        role : "",
    });

    const [ isRegistering , setIsRegistering ] = useState(false);

    const navigate = useNavigate();


    const validate = () => {

        data.name == "" 
        ? dispatch( { type :  ERROR_ACTIONS.SET_NAME , payload : "Username must not be empty!"} )
        : dispatch( { type : ERROR_ACTIONS.SET_NAME  , payload : "" } );

        data.email == ""
        ? dispatch( { type : ERROR_ACTIONS.SET_EMAIL , payload : "Email must not be empty ! " } )
        : dispatch( { type : ERROR_ACTIONS.SET_EMAIL , payload : "" } );

        data.pwd == ""
        ? dispatch( { type : ERROR_ACTIONS.SET_PWD , payload : "Password must not be empty! " } )
        : dispatch( { type : ERROR_ACTIONS.SET_PWD , payload : "" } )


        data.confirmPwd == ""
        ? dispatch( { type : ERROR_ACTIONS.SET_CON , payload : "Confirm-passowrd must not be empty!" } )
        : dispatch( { type : ERROR_ACTIONS.SET_CON , payload : "" } )

        data.role == ""
        ? dispatch( { type : ERROR_ACTIONS.SET_ROLE , payload : "Role must be choice!" } )
        : dispatch( { type : ERROR_ACTIONS.SET_ROLE , payload : "" } )

        if( data.pwd != "" && data.confirmPwd != "" && data.pwd  != data.confirmPwd )
        {
            dispatch( { type : ERROR_ACTIONS.SET_PWD_N_CON , payload : "Password & confirm-password do not match!" } );
        }

    }

    
    const handleRegister = async (e) => {
        e.preventDefault();

        validate();

        if( data.name != "" &&  data.email != "" && data.pwd != "" && data.confirmPwd != "" && data.role != "" && data.pwd == data.confirmPwd )
        {
            let isDuplicate = false;

            fetch("http://localhost:3000/users")
            .then( res => res.json() )
            .then( ( users  = []  ) => {
                
                for( let user  of users )
                {
                    if( user.email == data.email )
                    {
                        isDuplicate = true;
                        break;
                    }
                }

                if( !isDuplicate )
                {
                    setIsRegistering( true );
                    fetch( "http://localhost:3000/users" , {
                        method : "POST",
                        body : JSON.stringify({
                            name : data.name,
                            email : data.email,
                            password : data.pwd,
                            role : data.role
                        }),
                        headers : {
                            "Content-type" : "application/json"
                        }
                    } )
                    .then( res => res.json())
                    .then( data => {
                        if( data != null )
                        {
                            setIsRegistering( false );
                            alert("Successfully Registered!");
                            setData({
                                name : "",
                                email :  "",
                                pwd : "",
                                confirmPwd : "",
                                role : ""
                            });
                        }
                    })

                }
                else
                {
                    dispatch( { type : ERROR_ACTIONS.SET_EMAIL , payload : "Duplicate email!"} );
                }

            })
            
        }
        
    }

    return (
        <>
           <Navbar />
          
           <Main>

            <h3 className="h3 mx-5 my-5 px-3 text-center">Register User </h3>

            <form onSubmit={handleRegister} className="form w-50 mx-auto">
                <div className="form-group my-3">
                    <label htmlFor="" className="form-label">Username</label>
                    <input
                     onChange={ e => { setData( prev => {
                        return {
                            ...prev , 
                            name : e.target.value,
                        }
                     } )} }
                     value={data.name} type="text" className="form-control" placeholder='Enter username'/>
                    <span id="error">{ error.name }</span>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="" className="form-label">Email</label>   
                    <input
                    onChange={ e => setData( prev => {
                        return {
                            ...prev,
                            email : e.target.value
                        }
                    })}
                    value={data.email} type="email" className="form-control" placeholder='Enter email' />
                    <span id="error">{ error.email }</span>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="" className="form-label">Password</label>
                    <input
                    onChange={ e => setData( prev => {
                        return {
                            ...prev,
                            pwd : e.target.value
                        }
                    }) }
                    value={data.pwd} type="password" className="form-control" placeholder='Enter password' />
                    <span id="error">{ error.pwd }</span>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="" className="form-label">Confirm-password</label>
                    <input
                    onChange={ e => setData( prev => {
                        return {
                            ...prev,
                            confirmPwd : e.target.value
                        }
                    }) }
                    value={data.confirmPwd} type="password" className="form-control" placeholder='Enter confirm password' />
                    <span id="error">{  error.confirm }</span>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="" className="form-label">Role</label>
                    <select
                    onChange={ e => setData( prev => {
                        return {
                            ...prev,
                            role : e.target.value
                        }
                    } ) }
                    name="" id="" className="form-select" >
                        <option value="0">User</option>
                        <option value="1">Admin</option>
                    </select>
                    <span id="error">{ error.role  }</span>
                </div>

                <div className="form-group">
                    <button type='submit' className="btn btn-primary w-100">
                        {
                            isRegistering
                            ? "Registering..."
                            : "Register"
                        }
                    </button>
                </div>
            </form>

            <br />
            <br />
           </Main>
        </>
    )
            
}