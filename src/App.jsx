import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import WeatherApp from "./pages/WeatherApp";
import AppLayout from "./layout/AppLayout";

const routeConfig = [
  { path: "/", element: <Home /> },
  { path: "/weather-app", element: <WeatherApp /> },
];

const App = () => {
  const routeResult = useRoutes(routeConfig);
  return <AppLayout>{routeResult}</AppLayout>;
};

export default App;
