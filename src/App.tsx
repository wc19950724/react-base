import { BrowserRouter, useRoutes } from "react-router-dom";

import { routes } from "./router";

const App = () => {
  const GetRoutes = () => useRoutes(routes);
  return (
    <BrowserRouter>
      <GetRoutes />
    </BrowserRouter>
  );
};

export default App;
