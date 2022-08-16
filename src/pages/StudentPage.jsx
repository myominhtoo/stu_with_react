import { useParams } from 'react-router-dom';
import { Main } from '../components/Main';

export const StudentPage = () => {
    const { id } = useParams();
    return (
        <>
         <Navbar />
         
         <Main>
            <h1>student page {id}</h1>
         </Main>
        </>
    )
}