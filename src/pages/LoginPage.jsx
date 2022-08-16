import { useEffect } from "react";

export const LoginPage = () => {

    useEffect( () => {
      document.title = "login";
    });

    return (
        <>
          <h1>Login page</h1>
        </>
    )   
}