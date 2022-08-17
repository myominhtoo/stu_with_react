import { Navbar } from '../components/Navbar';
import { Main } from '../components/Main';

export const CreateCoursePage = () => {
    return (
        <>
           <Navbar />
        
           <Main>
                
                <h3 className="h3 mx-5 my-5 px-3 text-center">Register Course</h3>

                <form className="form w-50 mx-auto"></form>

           </Main>
        </>
    )
}