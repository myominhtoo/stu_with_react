import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Main } from '../components/Main.jsx';

export const UserPage = () => {
    const { id } = useParams();
    return (
        <>
         <Navbar />
         
         <Main>
            <h1>users page {id}</h1>
         </Main>
        </>
    )
}