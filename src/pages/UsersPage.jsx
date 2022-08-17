import { Navbar } from '../components/Navbar';
import { Main } from '../components/Main.jsx';
import { useEffect, useState } from 'react';

export const UsersPage = () => {

    const [ users , setUsers ] = useState([]);

    function fetchUsers()
    {
        fetch("http://localhost:3000/users")
        .then( res => res.json())
        .then( datas => {
            setUsers(datas);
        })
    }

    useEffect(() => {
        fetchUsers();
    } , [] );
    

    return (
        <>  
         <Navbar />
        
         <Main>
            
            <h3 className="h3 mx-5 my-3 px-3 text-center">Users Management</h3>
        
            <table className="mx-auto my-5 table table-striped w-75  table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { users.map( user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td className='fw-bold'>{user.name}</td>
                                <td className='gap-1'>
                                    <a href="" className="btn btn-success btn-sm mx-1">Update</a>
                                    <a href="" className="btn btn-danger btn-sm mx-1">Delete</a>
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