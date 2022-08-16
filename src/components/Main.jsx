import { SideBar } from './SideBar';
import { SidebarContextProvider } from '../context/SidebarContext';

export const Main = ( { children } ) => {
    return (
        <main className="w-100 d-flex">

            <SidebarContextProvider>
                 <SideBar />
            </SidebarContextProvider>

            <div className="w-85">
                {children}
            </div>

        </main>
    )
}