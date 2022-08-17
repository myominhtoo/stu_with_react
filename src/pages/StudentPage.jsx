import { useEffect , useReducer, useState  } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { Main } from '../components/Main';
import { Navbar } from '../components/Navbar';
import { errorReducer , ERROR_ACTIONS } from './CreateStudentPage.jsx';

export const StudentPage = () => {
    const { id } = useParams();

    const [ student , setStudent ]  = useState({});
    const [ isStudentLoading , setIsStudentLoading ] = useState(false);

    const [ courses , setCourses ] = useState([]);
    const [ isCourseLoading , setIsCourseLoading ] = useState(false);

    const [ isUpdating , setIsUpdating ] = useState(false);
    const [ isDeleting , setIsDeleting ] = useState(false);

    const [ error , dispatch ] = useReducer( errorReducer , {
        name : "",
        dob : "",
        gender : "",
        education : "",
        courses : "",
    });

    const navigate = useNavigate();

    const fetchCourses = () => {
        setIsCourseLoading( true );
        fetch("http://localhost:3000/courses")
        .then( res => res.json() )
        .then( courses => {
            setIsCourseLoading( false );
            setCourses(courses);
        })
    }

    const fetchStudent = () => {
        setIsStudentLoading( true );
        fetch(`http://localhost:3000/students/${id}`)
        .then( res => res.json() )
        .then( student => {
            if( student != null )
            {
                setIsStudentLoading( false );
                setStudent( student );
            }
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

    const handleUpdate = ( e ) => {

        e.preventDefault();

        validate();

        if(  student.name != "" && student.dob != "" && student.gender != "" && student.education != "0" && student.attendCourses.length != 0 )
        {
            setIsUpdating( true );
            fetch(`http://localhost:3000/students/${id}` , {
                method :  "put",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({
                    name : student.name,
                    gender : student.gender,
                    education : student.education,
                    dob : student.dob,
                    attendCourses : student.attendCourses
                })
            })
            .then( res => {
                setIsUpdating(false);
                if( res.ok )
                {
                    alert("Successfully Updated!");
                    navigate("/students");
                }
                else{
                    dispatch( { type : ERROR_ACTIONS.SET_ALL , payload : "Something went wrong!"} );
                }

            })
        }

    }

    const handleDelete = () => {
        if( confirm(`Are you sure to delete ${student.name} ? `))
        {
            setIsDeleting( true );
            fetch(`http://localhost:3000/students/${id}` , {
                method : "delete"
            })
            .then( res => {
                setIsDeleting( false );
                if( res.ok )
                {
                    alert("Successfully Deleted!");
                    navigate("/students");
                }
            })
        }
    }

    useEffect(() => {
        fetchCourses();
        fetchStudent();
    } , [] );

    return (
        <>
         <Navbar />
         
         <Main>
            
            <div className="w-auto h-auto">
                {
                    isStudentLoading 
                    ? ( 
                        <div className="d-flex justify-content-center align-items-center" style={{ height : "500px"}} >
                            <h6 className="h6 text-center my-5">Loading...</h6> 
                        </div>
                      )
                    : ( 
                        <div className='w-auto h-auto'>
                            <h3 className="h3 mx-5 my-3 px-3 text-center">{student.name}'s Details</h3>

                            <form onSubmit={handleUpdate} className="form w-50 mx-auto">

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
                                    <button onClick={ handleDelete } className="btn btn-danger w-50">
                                       {
                                            isDeleting
                                            ? "Deleting..."
                                            : "Delete"
                                       }
                                    </button>
                                    <button type='submit' className="btn btn-primary w-50 ">
                                        {
                                            isUpdating
                                            ? "Updating..."
                                            : "Update"
                                        }
                                    </button>
                                </div>

                            </form>

                            <br /><br />

                        </div>
                      )
                }
            </div>

         </Main>
        </>
    )
}