import { Navbar } from '../components/Navbar';
import { Main } from '../components/Main';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';

export const ERROR_ACTIONS = {
  SET_NAME : "set-name",
  SET_DOB : "set-dob",
  SET_GENDER : "set-gender",
  SET_EDUCATION : "set-education",
  SET_COURSE : "set-courses",
  SET_ALL : "set-all"
}

export const errorReducer = ( state , action ) => {

  switch( action.type )
  {
    case ERROR_ACTIONS.SET_NAME : 
       return { ...state , name : action.payload };
    case ERROR_ACTIONS.SET_DOB : 
       return { ...state , dob : action.payload };
    case ERROR_ACTIONS.SET_GENDER : 
      return { ...state , gender :  action.payload };
    case ERROR_ACTIONS.SET_EDUCATION : 
      return { ...state , education : action.payload  };
    case ERROR_ACTIONS.SET_COURSE : 
      return { ...state , courses :  action.payload };
    case ERROR_ACTIONS.SET_ALL : 
      return { name : action.payload , education : action.payload , gender : action.payload , dob : action.payload , courses : action.payload }
    default :
      return state;
    }

}

export const CreateStudentPage = () => {

    const [ courses , setCourses ] = useState([]);
    const [ isCourseLoading , setIsCourseLoading ] = useState(false);
    const [ isRegisterLoading , setIsRegisterLoading ] = useState(false);
    const [ student , setStudent ] = useState({
      name : "",
      dob : "",
      gender : "",
      education : "0",
      attendCourses : [],
    });

    const [ error , dispatch ] = useReducer( errorReducer , {
      name : "",
      gender : "",
      dob : "",
      education : "",
      courses : ""
    });

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

    const fetchCourses = () => {
      setIsCourseLoading(true);
      fetch("http://localhost:3000/courses")
      .then( res => res.json())
      .then( courses => {

        setCourses(courses);
        
        setIsCourseLoading( false );
      })
    }

    const validate = () => {

      student.name == ""
      ? dispatch( { type : ERROR_ACTIONS.SET_NAME , payload : "Student's name must not be empty!" } )
      : dispatch( { type : ERROR_ACTIONS.SET_NAME , payload : "" } );

      student.dob == ""
      ? dispatch( { type : ERROR_ACTIONS.SET_DOB , payload : "DOB must not be empty!"} )
      : dispatch( { type : ERROR_ACTIONS.SET_DOB , payload : "" } )

      student.education == "0"
      ? dispatch( { type : ERROR_ACTIONS.SET_EDUCATION , payload : "Education must be chosen!" } )
      : dispatch( { type : ERROR_ACTIONS.SET_EDUCATION , payload : "" } )

      student.gender == ""
      ? dispatch( { type : ERROR_ACTIONS.SET_GENDER , payload : "Gender must be chosen!" } )
      : dispatch( { type : ERROR_ACTIONS.SET_GENDER , payload : "" } )

      student.attendCourses.length == 0
      ? dispatch( { type : ERROR_ACTIONS.SET_COURSE , payload : "Attend-course must be chosen at least one!" } )
      : dispatch( { type : ERROR_ACTIONS.SET_COURSE , payload : "" } )

    }

    const handleRegister = ( e ) => {

      e.preventDefault();

      validate();

      if( student.name != "" && student.dob != "" && student.gender != "" && student.education != "0" && student.attendCourses.length != 0)
      {

        setIsRegisterLoading(true);

        fetch("http://localhost:3000/students" , {
          method : "post",
          headers : {
            "Content-type" : "application/json"
          },
          body : JSON.stringify(student)
        } )
        .then( res => {

          setIsRegisterLoading(false);

          if( res.ok )
          {
            alert("Successfully Registered!");
            setStudent( {
              name : "",
              dob : "",
              gender : "",
              education : "0",
              attendCourses : []
            } )
          }
          else{
            dispatch( {  type : ERROR_ACTIONS.SET_ALL , payload : "Something went wrong!"} );
          }

        } )
        
      }

    }

    useEffect(() => {
      fetchCourses();
    } , [] );


    return (
        <>
           <Navbar
            user={authUser}
           />
          
           <Main>
             
            <h3 className="h3 mx-5 my-5 px-3 text-center">Register Student</h3>

            <form onSubmit={handleRegister} className="form w-50 mx-auto">

                <div className="form-group my-3">
                    <label htmlFor="" className="form-label">Name</label>
                    <input
                      value={student.name}
                      onChange={ e => setStudent( prevStudent => {
                        return { ...prevStudent , name : e.target.value }
                      })}
                      type="text" className="form-control" placeholder="Enter student's name " />
                    <span id="error">{error.name}</span>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="" className="form-label">DOB</label>
                    <input
                      value={student.dob}
                      onChange={ e => setStudent( prevStudent => {
                        return { ...prevStudent , dob : e.target.value }
                      })}
                      type="date" className="form-control" placeholder="Enter student's dob" />
                    <span id="error">{error.dob}</span>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="" className="form-label">Gender</label>
                    
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex gap-1 align-items-center">
                          <input
                          value="0"
                          onChange={ e => setStudent( prevStudent => {
                            return { ...prevStudent , gender : e.target.value } 
                          })}
                          checked={ student.gender == "0" ? true : false }
                          type="radio" name='gender' id='male' className='form-check' />
                          <label htmlFor="male" className="form-label">Male</label>
                      </div>

                      <div className="d-flex gap-1 align-items-center">
                          <input
                          type="radio"
                          value="1"
                          onChange={ e => setStudent( prevStudent => {
                            return { ...prevStudent , gender : e.target.value } 
                          })}
                          checked={ student.gender == "1" ? true : false }
                          name='gender' id='female' className="form-check" />
                          <label htmlFor="female" className="form-label">Female</label>
                      </div>
                    </div>
                    <span id="error">{error.gender}</span>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="" className="form-label">Education</label>
                    
                    <select
                    value={student.education} 
                    onChange={ e => setStudent( prevStudent => {

                      return { ...prevStudent , education : e.target.value }

                    } )}
                    name="" id="" className="form-select">
                      <option value="0" disabled>Choose Education</option>
                      <option value="1">Diploma In IT</option>
                      <option value="2">Bachelor In It</option>
                      <option value="3">Master In It</option>
                    </select>
                    <span id="error">{error.education}</span>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="" className="form-label">Attend Courses</label>
                    
                    <div className="d-flex gap-3 flex-wrap">
                    { 
                      isCourseLoading 
                      ? <h6 className="h6 text-center">Loading...</h6>
                      : courses.map( course => {

                        return (
                          <div key={course.id} className="d-flex gap-1 align-items-center">
                            <label htmlFor={course.id} className="form-label text-capitalize">{course.name}</label>
                            <input  
                              onChange={ e => {
                                setStudent( prevStudent => {
                                  let attendCourses = [...prevStudent.attendCourses];
                              
                                  let curCourse = e.target.value;

                                  if( attendCourses.includes(curCourse))
                                  {
                                    attendCourses = attendCourses.filter( course => {
                                      return course != curCourse;
                                    })
                                  }
                                  else
                                  {
                                      attendCourses.push(curCourse)
                                  }
                                  
                                  return { ...prevStudent , attendCourses : attendCourses }

                                })
                              }}
                              value={course.id}
                              checked={ student.attendCourses.includes(course.id) ? true : false  }
                              type="checkbox" id={course.id} className="form-check" />
                          </div>
                        )

                      })
                    }
                    </div>

                    <span id="error">{error.courses}</span>

                </div>

                <div className="form-group my-3">
                    <button type='submit' className="btn btn-primary w-100">
                      {
                        isRegisterLoading 
                        ? "Loading..."
                        : "Register"
                      }
                    </button>
                </div>

            </form>

            <br /><br />

           </Main>
        </>
    )
}