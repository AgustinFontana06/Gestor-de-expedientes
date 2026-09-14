import { useState } from 'react' //hook de react, le agrega estado a un componente, y cuando el elemento cambia se renderiza
import { Routes, Route } from "react-router-dom"
import './App.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Expedientes from "./pages/expedientes/Expedientes";
import ExpedienteDetalle from "./pages/expedientes/ExpedienteDetalle";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Layout from "./components/Layout";
import ModificarExpediente from "./pages/expedientes/ModificarExpediente";
import TramiteDetalle from "./pages/tramites/TramiteDetalle";
import ModificarTramite from "./pages/tramites/ModificarTramite";
import Usuarios from "./pages/usuarios/Usuarios";
import UsuarioDetalle from "./pages/usuarios/UsuarioDetalle";
import ModificarDatos from "./pages/perfil/ModificarDatos";
import MiPerfil from "./pages/perfil/MiPerfil";

function App(){
  return (
    //aca se crean las rutas, las rutas publicas no se necesita que el usuario este autenticado/autorizado para acceder

    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/expedientes" element={<Expedientes/>}/>
        <Route path="/expedientes/:id" element={<ExpedienteDetalle/>}/>
        <Route path="/tramites/:id" element={<TramiteDetalle/>}/>
        <Route path="/expedientes/:id/modificar" element={<ModificarExpediente/>} />
        <Route path="/tramites/:id/modificar" element={<ModificarTramite/>}></Route>
        <Route path="/perfil" element={<MiPerfil/>}></Route>
        <Route path="/perfil/modificardatos" element={<ModificarDatos/>}></Route>
        <Route path="/usuarios" element={<AdminRoute><Usuarios/></AdminRoute>}></Route>
        <Route path="/usuarios/:id" element={<UsuarioDetalle/>}></Route>
      </Route>
    </Routes>

  )
}

export default App;
