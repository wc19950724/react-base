import { BrowserRouter, useRoutes } from "react-router-dom";

import Layout from "./layout";
import { routes } from "./router";

const App = () => {
  const GetRoutes = () => useRoutes(routes);
  return (
    <BrowserRouter>
      <Layout>
        <GetRoutes />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
