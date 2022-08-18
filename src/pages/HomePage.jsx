import { Navbar } from '../components/Navbar';
import { Main } from '../components/Main.jsx';

export const HomePage = () => {
    return (
        <>
          <Navbar />
           
          <Main>

            <h3 className="h3 mx-5 my-5 px-3 text-start">Welcome Lionel!</h3>
            <h6 className="h4 my-2 mx-5 px-3 ">Testing with React + Vite </h6>

          </Main>
        </>
    )
}