import { useParams } from 'react-router-dom';
import { Main } from '../components/Main';
import { Navbar } from '../components/Navbar';

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