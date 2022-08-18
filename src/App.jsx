import './App.css';
import { Routes , Route  } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { StudentsPage } from './pages/StudentsPage';
import { UsersPage } from './pages/UsersPage';
import { CreateCoursePage } from './pages/CreateCoursePage';
import { CreateStudentPage } from './pages/CreateStudentPage';
import { CreateUserPage } from './pages/CreateUserPage';
import { StudentPage } from './pages/StudentPage';
import { UserPage } from './pages/UserPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={ <HomePage />} />
        <Route path="/login" element={ <LoginPage />} />
        <Route path="/students">
          <Route index element={ <StudentsPage/> } />
          <Route path=":id" element={<StudentPage/> }/>
        </Route> 
        <Route path="/users">
          <Route index element={<UsersPage /> }/>
          <Route path=":id" element={<UserPage/>}/>
        </Route>
        <Route path="/course/new" element={<CreateCoursePage/>} />
        <Route path="/student/new" element={<CreateStudentPage />} />
        <Route path="/user/new" element={<CreateUserPage />} />
      </Routes>
    </>
  )
}

export default App
