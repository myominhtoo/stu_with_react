import { Navbar } from '../components/Navbar';
import { Main } from '../components/Main.jsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const UsersPage = () => {

    const [ users , setUsers ] = useState([]);
    const [ isLoading , setIsLoading ] = useState(false);

    function fetchUsers()
    {
        setIsLoading(true);
        fetch("http://localhost:3000/users")
        .then( res => res.json())
        .then( datas => {
           if(datas != null )  setIsLoading(false);
            setUsers(datas);
        })
    }

    function deleteUser( id )
    {
        if(confirm("Are you sure to delete?"))
        {
            fetch(`http://localhost:3000/users/${id}` , {
            method : "delete",
            })
            .then( res => {
                if(res.ok) fetchUsers();
            })
        }
    }

    useEffect(() => {
        fetchUsers();
    } , [] );
    

    return (
        <>  
         <Navbar />
        
         <Main>
            
            <h3 className="h3 mx-5 my-5 px-3 text-center">Users Management</h3>

            <form className='d-flex gap-3 w-75 mx-auto'>
                <div>
                    <input type="text" className="form-control" placeholder='User Id' />
                </div>

                <div>
                    <input type="text" className="form-control" placeholder="User Name" />
                </div>

                <div className='d-flex align-items-center gap-2'>
                    <button type='submit' className="btn btn-success btn-sm">Search</button>

                    <Link to="/user/new" className='btn btn-secondary btn-sm'>Add</Link>
                </div>
            </form>

            <table className="mx-auto my-2 table table-striped w-75  table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { isLoading 
                      ? <tr><td colSpan="3" className='fw-bold text-center'>Loading</td></tr>
                      : users.map( user => {
                        return (
                            <tr key={user.id}>
                                <td className='fw-bold'>{user.id}</td>
                                <td className='fw-bold'>{user.name}</td>
                                <td className='gap-1'>
                                    <Link to={"/users/"+user.id} className="btn btn-success btn-sm mx-1">Update</Link>
                                    <a 
                                    onClick={ () => deleteUser(user.id)}
                                    className="btn btn-danger btn-sm mx-1">Delete</a>
                                </td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
           
         </Main>
        </>
    )
}