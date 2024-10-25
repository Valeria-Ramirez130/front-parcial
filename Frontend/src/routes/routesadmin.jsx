import Admin from "../admin/admin"; // Asegúrate de que el nombre del componente empiece con mayúscula

export const routesadmin = [
  {
    path: "/admin",
    element: (
      <>
        <Admin />
      </>
    ),
  },
];
