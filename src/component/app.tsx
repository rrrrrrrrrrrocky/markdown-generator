import { initializeApp, initializeGlobalApp } from "@/app-initializer";

import HomeContainer from "./home-container/_home-container";

initializeGlobalApp();
const App = () => {
  initializeApp();
  return <HomeContainer />;
};

export default App;
