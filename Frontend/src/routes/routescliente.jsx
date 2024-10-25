
import CrearUsuario from "../CrearUsuario/CrearUsuario";
import VistaUsuario from "../Vistausuario/vistausuario"; // Corrige el nombre aquí

export const routescliente = [
  {
    path: "/crearUsuario",
    element: (
      <>
        
        <CrearUsuario />
      </>
    ),
  },
  {
    path: "/vistaUsuario",
    element: (
      <>
        
        <VistaUsuario /> 
      </>
    ),
  },
];
