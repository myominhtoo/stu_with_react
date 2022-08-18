import { useEffect, useState } from "react"
import { NavLink, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage.js';

export const Navbar = ( { user } ) => {

    const [ date , setDate ] = useState();

    const navigate = useNavigate();

    const getDate = () => {
        const date = new Date();
        let year = date.getFullYear();
        let month = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"][date.getMonth()];
        let day = date.getDate();

        return `${year}-${month}-${day}`;
    }

    const handleLogout = () => {
        
        if( confirm("Are you sure to logout?"))
        {
            const { remove } = useLocalStorage();
            remove("user");
            navigate("/login?status=Successfully Logout!");
        }

    }

    useEffect(() => {
        
        setDate(getDate());

    } , [] );

    return (
        <header className="navbar navbar-expand shadow-sm">
            <div className="container px-5">
                <NavLink to="/home" className="h4 navbar-brand">Home</NavLink>

                <ul className="navbar-nav d-flex  gap-2 h6 align-items-center">
                    <li className="text-capitalize">{user.name}</li>
                    <li>({date})</li>
                    <li onClick={ handleLogout } className="btn btn btn-sm btn-danger mx-3 fw-bold">Logout</li>
                </ul>   
            </div>
        </header>
    )
}