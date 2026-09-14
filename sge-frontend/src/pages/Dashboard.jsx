import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(){

    const navigate = useNavigate();

    const name = localStorage.getItem("nombre");

    return(
    <>
        <h1>Bienvenido, {name} </h1>

    </>
    );
}

export default Dashboard;