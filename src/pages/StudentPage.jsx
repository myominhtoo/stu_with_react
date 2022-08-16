import { useParams } from 'react-router-dom';

export const StudentPage = () => {
    const { id } = useParams();
    return (
        <>
         <h1>Student {id} Page</h1>
        </>
    )
}