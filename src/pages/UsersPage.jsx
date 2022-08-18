import { Navbar } from '../components/Navbar';
import { Main } from '../components/Main.jsx';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const UsersPage = () => {

    const [ users , setUsers ] = useState([]);
    const [ isLoading , setIsLoading ] = useState(false);

    const [ search , setSearch ] = useState({
        id : "",
        name : ""
    });

    const [ isSearching , setIsSearching ] = useState(false);

    const navigate = useNavigate();

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

    function fetchById()
    {
        setIsSearching( true );
        fetch(`http://localhost:3000/users?id_like=${search.id}`)
        .then( res => res.json() )
        .then( users => {
            setIsSearching( false );
            setUsers( users );
        });
    }

    function fetchByName()
    {
        setIsSearching( true );
        fetch(`http://localhost:3000/users?name_like=${search.name}`)
        .then( res => res.json() )
        .then( users => {
            setIsSearching( false );
            setUsers( users );
        });
    }

    function fetchByIdAndName()
    {
        setIsSearching( true );
        fetch(`http://localhost:3000/users?id_like=${search.id}&name_like=${search.name}`)
        .then( res => res.json() )
        .then( users => {
            setIsSearching( false );
            setUsers( users );
        });
    }

    function handleSearch( e )
    {
        e.preventDefault();
        
        if( search.id != "" && search.name == "" )
        {
           fetchById();
        }

        else if( search.id == "" && search.name != "" )
        {
            fetchByName();
        }

        else if( search.id != "" && search.name != "" )
        {
            fetchByIdAndName();
        }

        else{
            fetchUsers();
        }
        
        setSearch({
            id : "",
            name : ""
        })
    }

    useEffect(() => {
        fetchUsers();
    } , [] );
    

    return (
        <>  
         <Navbar
          user={authUser}
         />
        
         <Main>
            
            <h3 className="h3 mx-5 my-5 px-3 text-center">Users Management</h3>

            <form onSubmit={handleSearch} className='d-flex gap-3 w-75 mx-auto'>
                <div>
                    <input
                      value={search.id}
                      onChange={ e => {
                        setSearch( prevSearch => {
                            return { ...prevSearch , id : e.target.value }
                        })
                      }}
                      type="text" className="form-control" placeholder='User Id' />
                </div>

                <div>
                    <input
                     value={search.name}
                     onChange={ e => {
                        setSearch( prevSearch => {
                            return { ...prevSearch , name : e.target.value }
                        })
                     }}
                     type="text" className="form-control" placeholder="User Name" />
                </div>

                <div className='d-flex align-items-center gap-2'>
                    <button type='submit' className="btn btn-success btn-sm fw-bold">
                        {
                            isSearching
                            ? "Searching..."
                            : "Search"
                        }
                    </button>

                    <Link to="/user/new" className='btn btn-secondary btn-sm fw-bold'>Add</Link>
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
                      : users.length == 0
                        ? <tr><td colSpan="3" className='text-center fw-bold h6'>There is no user to show!</td></tr>
                        : users.map( user => {
                            return (
                                <tr key={user.id}>
                                    <td className='fw-bold'>{user.id}</td>
                                    <td className='fw-bold'>{user.name}</td>
                                    <td className='gap-1'>
                                        <Link to={"/users/"+user.id} className="fw-bold btn btn-success btn-sm mx-1">Update</Link>
                                        <a 
                                        onClick={ () => deleteUser(user.id)}
                                        className="btn btn-danger btn-sm mx-1 fw-bold">Delete</a>
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