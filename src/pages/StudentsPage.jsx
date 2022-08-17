import { Navbar } from '../components/Navbar';
import { Main } from '../components/Main';
import { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';

export const StudentsPage = () => {

    const [ students , setStudents ] = useState([]);
    const [ courses , setCourses ] = useState([]);
    const [ isLoading , setIsLoading ] = useState(false);

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


    useEffect(() => {
      fetchStudents();
    } , [] );

    return (
        <>
          <Navbar />
          
          <Main>

            <h3 className="h3 mx-5 my-5 px-3 text-center">Students Management</h3>

            <form className='d-flex gap-3 w-75 mx-auto'>
                <div>
                    <input type="text" className="form-control" placeholder='Student Id' />
                </div>

                <div>
                    <input type="text" className="form-control" placeholder="Student's Name" />
                </div>

                <div>
                    <input type="text" className="form-control" placeholder="Course Name" />
                </div>

                <div className='d-flex align-items-center gap-2'>
                    <button type='submit' className="btn btn-success btn-sm fw-bold">Search</button>

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