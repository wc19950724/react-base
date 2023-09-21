import { HashRouter, useRoutes } from "react-router-dom";

import Layout from "./layout";
import { routes } from "./router";

const App = () => {
  const GetRoutes = () => useRoutes(routes);
  return (
    <HashRouter>
      <Layout>
        <GetRoutes />
      </Layout>
    </HashRouter>
  );
};

export default App;
