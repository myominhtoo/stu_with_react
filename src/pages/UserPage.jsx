import { useParams } from 'react-router-dom';

export const UserPage = () => {
    const { id } = useParams();
    return (
        <>
         <h1>User {id} Page</h1>
        </>
    )
}