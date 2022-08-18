import { Navbar } from '../components/Navbar';
import { Main } from '../components/Main';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { useNavigate } from 'react-router-dom';
import { useReducer, useState , useEffect } from 'react';

export const COURSE_ERR_ACTION = {
    SET_ID : "set-id",
    SET_NAME : "set-name",
}

export const courseErrReducer = ( state , action ) => {
    
    switch( action.type )
    {
        case COURSE_ERR_ACTION.SET_ID : 
            return { ...state , id : action.payload }
        case COURSE_ERR_ACTION.SET_NAME : 
            return { ...state , name : action.payload }
        default : 
            return state;
    }

}

export const CreateCoursePage = () => {

    const [ course , setCourse ] = useState({
        id : "",
        name : ""
    });

    const [ error , dispatch ] = useReducer( courseErrReducer , {
        id : "",
        name : "",
    } );
    
    const [ isRegistering , setIsRegistering ] = useState( false );

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


    const validate = () => {
        course.id == ""
        ? dispatch( { type : COURSE_ERR_ACTION.SET_ID , payload : "Id must not be empty!" } )
        : dispatch( { type : COURSE_ERR_ACTION.SET_ID , payload : "" } )

        course.name == ""
        ? dispatch( { type : COURSE_ERR_ACTION.SET_NAME , payload : "Course name must not be empty!" } )
        : dispatch( { type : COURSE_ERR_ACTION.SET_NAME , payload : "" } )
    }

    const handleRegister = (e) => {

        e.preventDefault();

        validate();

        if( course.id != "" && course.name != "" )
        {
            fetch("http://localhost:3000/courses")
            .then( res => res.json())
            .then( courses => {

                let isDuplicate = false;

                if( courses != null && courses.length > 0 )
                {
                    for( let c of courses )
                    {
                        if( c.id == course.id )
                        {
                            isDuplicate = true;
                            break;
                        }
                    }
                }

                if(isDuplicate)
                {
                    dispatch( { type : COURSE_ERR_ACTION.SET_ID , payload : "Course Id must not be duplicate!" } );
                }
                else
                {
                    setIsRegistering(true);
                    fetch("http://localhost:3000/courses" , {
                        method : "post",
                        headers : {
                            "Content-type" : 'application/json'
                        },
                        body : JSON.stringify({
                            id : course.id,
                            name : course.name
                        })
                    } )
                    .then( res => {
                        setIsRegistering( false );
                        if(res.ok)
                        {
                            alert("Successfully Registered!");
                            
                            setCourse( prevCourse => {
                                return { ...prevCourse , id : "" , name : ""}
                            });
                        }
                    })
                }

            })

        }

    }

    return (
        <>
           <Navbar
            user={authUser}
           />
        
           <Main>
                
                <h3 className="h3 mx-5 my-5 px-3 text-center">Register Course</h3>

                <form onSubmit={ handleRegister} className="form w-50 mx-auto p-5">

                    <div className="form-group my-3">
                        <label htmlFor="" className="form-label">Course Id</label>
                        <input
                             value={course.id}
                             onChange={ e => setCourse( prevCourse => {
                                return { ...prevCourse , id : e.target.value }
                             }) }
                             type="text" className="form-control"  placeholder='Enter course id' />
                        <span id="error">{error.id}</span>
                    </div>

                    <div className="form-group my-3">
                        <label htmlFor="" className="form-label">Course Name</label>
                        <input
                            value={course.name}
                             onChange={ e => setCourse( prevCourse => {
                                return { ...prevCourse , name : e.target.value }
                             }) }
                             type="text" className="form-control" placeholder='Enter course name' />
                        <span id="error">{error.name}</span>
                    </div>

                    <div className="form-group my-3">
                        <button type='submit' className="btn btn-primary w-100">
                            {
                                isRegistering
                                ? "Registering..."
                                : "Register"
                            }
                        </button>
                    </div>

                </form>

           </Main>
        </>
    )
}