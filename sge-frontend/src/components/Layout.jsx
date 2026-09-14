import { Outlet } from  "react-router-dom";
import  NavBar  from "./Navbar";
import "./Layout.css";

//creamos una capa para poder agregar una barra donde cada apartado muestre a una pagina hija usando el Outlet
function Layout(){
    return (
        <>
            <NavBar/>

            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default Layout;