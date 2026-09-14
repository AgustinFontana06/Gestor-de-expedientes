import { StrictMode } from 'react' //ayuda a detectar posibles errores
import { createRoot } from 'react-dom/client'; //el que muestra el codigo react en un html 
import { BrowserRouter } from 'react-router-dom'; //este browser lo que permite es usar distintas urls para distintas paginas dentro del proyecto
//puedo conectar el apartado de login solo agregando una ruta como /login
import './index.css'
import App from './App.jsx' //importa el componente principal 

//browserRouter es importada por una libreria llamada React Rout, la cual brinda este componente
//se inicia la aplicacion creando la raiz del proyecto donde se renderizara toda a app, buscando ese elemento dentro del index
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  
    <App />
    </BrowserRouter>
  </StrictMode>,
)

//flujo: index.html -> getElementeById('root') -> createRoot -> Importar y renderizar App