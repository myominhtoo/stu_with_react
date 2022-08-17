import { Navbar } from '../components/Navbar';
import { Main } from '../components/Main';
import { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';

export const StudentsPage = () => {

    const [ students , setStudents ] = useState([]);
    const [ courses , setCourses ] = useState([]);
    const [ isLoading , setIsLoading ] = useState(false);

    const [ search , setSearch ] = useState({
      id : "",
      name : "",
      course: ""
    });

    const [ isSearching , setIsSearching ] = useState( false );

    const fetchCourses = () => {
      fetch("http://localhost:3000/courses")
      .then( res => res.json())
      .then( datas => setCourses(datas));
    }

    const fetchStudents = () => {
      setIsLoading(true);
      fetchCourses();
      fetch("http://localhost:3000/students")
      .then( res => res.json())
      .then( datas => {
        setIsLoading(false);
        setStudents(datas)
      } );
    }

    const searchStudents = () => {
        
      let targetAPI = `http://localhost:3000/students`;

      if( search.id != "" && search.name == "" && search.course == "" )
      {
        targetAPI += `?id_like=${search.id}`;
      }
      else if( search.id == "" && search.name != "" && search.course == "" )
      {
        targetAPI += `?name_like=${search.name}`;
      }
      else if( search.id == "" && search.name == "" && search.course != "" )
      {
        targetAPI += `?attendCourses_like=${search.course}`;
      }
      else if( search.id != "" && search.name != "" && search.course == "")
      {
        targetAPI += `?id_like=${search.id}&name_like=${search.name}`;
      }
      else if( search.id != "" && search.name == "" && search.course != "" )
      {
        targetAPI += `?id_like=${search.id}&attendCourses_like=${search.course}`;
      }
      else if( search.id == "" && search.name != "" && search.course != "" )
      {
        targetAPI += `?name_like=${search.name}&attendCourses_like=${search.course}`;
      }
      else if( search.id != "" && search.name  != "" && search.course != "" )
      {
        targetAPI += `?id_like=${search.id}&name_like=${search.name}&attendCourses_like=${search.course}`;
      }
      else{
        targetAPI = targetAPI;
      }

      setIsSearching( true );
      
      fetch(targetAPI)
      .then( res => res.json())
      .then( students => {
        if( students != null )
        {
          setIsSearching( false );
          setStudents( students );
        }
      })

    }

    const handleSearch = ( e ) => {
      
        e.preventDefault();

        searchStudents();

        setSearch({
          id : "",
          name : "",
          course : ""
        });
    }


    useEffect(() => {
      fetchStudents();
    } , [] );

    return (
        <>
          <Navbar />
          
          <Main>

            <h3 className="h3 mx-5 my-5 px-3 text-center">Students Management</h3>

            <form onSubmit={handleSearch} className='d-flex gap-3 w-75 mx-auto'>
                <div>
                    <input
                       value={search.id}
                       onChange={ e => {
                        setSearch( prevSearch => {
                          return { ...prevSearch , id : e.target.value }
                        })
                       }}
                       type="text" className="form-control" placeholder='Student Id' />
                </div>

                <div>
                    <input
                      value={search.name}
                      onChange={ e => {
                        setSearch( prevSearch => {
                          return { ...prevSearch , name : e.target.value }
                        })
                      }}
                      type="text" className="form-control" placeholder="Student's Name" />
                </div>

                <div>
                    <input
                       value={search.course}
                       onChange={ e => {
                        setSearch( prevSearch => {
                          return { ...prevSearch , course : e.target.value }
                        })
                       }}
                       type="text" className="form-control" placeholder="Course Name" />
                </div>

                <div className='d-flex align-items-center gap-2'>
                    <button type='submit' className="btn btn-success btn-sm fw-bold">
                      {
                        isSearching 
                        ? "Searching..."
                        : "Search"
                      }
                    </button>

                    <Link to="/student/new" className='btn btn-secondary btn-sm fw-bold'>Add</Link>
                </div>
            </form>

            <table className="mx-auto my-2 table table-striped w-75  table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Joined Courses</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                      isLoading
                      ? <tr><td className='text-center h6' colSpan="4">Loading...</td></tr>
                      : students.length == 0
                        ? <tr><td className='text-center h6' colSpan="4">There is no student to show!</td></tr>
                        : students.map( stu => {
                          return (
                              <tr key={stu.id}>
                                  <td className='fw-bold'>{stu.id}</td>
                                  <td className='fw-bold'>{stu.name}</td>
                                  <td className='gap-1'>
                                    { stu.attendCourses.map( c => {
                                      return courses.filter( course => course.id == c ).map( result => {
                                        return <span className='btn btn-sm btn-primary fw-bold mx-1 text-capitalize' key={result.id}>{result.name}</span>
                                      })
                                    })}
                                  </td>
                                  <td>
                                    <Link to={"/students/"+stu.id} className="btn btn-success btn-sm fw-bold">Detail</Link>
                                  </td>
                              </tr>
                          )
                        })
                    }
                </tbody>
            </table>

          </Main>
        </>
    )
}