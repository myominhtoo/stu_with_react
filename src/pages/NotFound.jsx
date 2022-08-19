import { Link } from 'react-router-dom';

export default function NotFound()
{
    return (
        <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ height : "100vh" , background : "#eee" }} >
            <h3 className="h3">Page Not Found | 404</h3>
            
            <div className="my-3">
                <Link to="/login">Go to login!</Link>
            </div>
        </div>
    )
}