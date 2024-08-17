import { initializeGlobalApp } from "@/app-initializer";
import HomeContainer from "./home-container/home-container";

initializeGlobalApp();

const App = () => {
  return <HomeContainer />;
};

export default App;
