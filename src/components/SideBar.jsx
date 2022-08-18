import { NavLink } from 'react-router-dom';
import {  useSidebarContext , useSidebarToggleContext } from '../context/SidebarContext.jsx';

export const SideBar = () => {

    const  isShow = useSidebarContext();
    const toggleShow = useSidebarToggleContext();
    
    return (
        <nav className="w-15 px-3 py-3 d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-1">
                <span onClick={toggleShow} className="h6 shadow-sm btn-sm p-2 rounded" id="link">Class Management { isShow ? <i className="fa-solid fa-chevron-down"></i>  : <i className="fa-solid fa-chevron-right"></i> } </span>      
                {
                    isShow && 
                    <div className="d-flex flex-column">
                        <NavLink to="/course/new" className="h6 shadow-sm btn-sm p-2 rounded" id="link">Register Course</NavLink>
                        <NavLink to="/student/new" className="h6 shadow-sm btn-sm p-2 rounded" id="link">Register Student</NavLink>
                        <NavLink to="/students" className="h6 shadow-sm btn-sm p-2 rounded" id="link">Student Management</NavLink>
                    </div>
                }
            </div>

            <div className="d-flex">
                <NavLink to="/users" className="h6 shadow-sm btn-sm p-2 rounded w-100" id="link">User Management</NavLink>
            </div>
        </nav>
    )
}