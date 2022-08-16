import { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom';

export const Navbar = () => {

    const [ date , setDate ] = useState();

    const getDate = () => {
        const date = new Date();
        let year = date.getFullYear();
        let month = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"][date.getMonth()];
        let day = date.getDate();

        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        
        setDate(getDate());

    } , [] );

    return (
        <header className="navbar navbar-expand shadow-sm">
            <div className="container px-5">
                <NavLink to="/" className="h4 navbar-brand fw-bold">Home</NavLink>

                <ul className="navbar-nav d-flex flex-column h6 fw-bold">
                    <li>Lionel</li>
                    <li>{date}</li>
                </ul>
            </div>
        </header>
    )
}