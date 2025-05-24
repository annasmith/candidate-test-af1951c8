import { Provider } from "react-redux";
import { navStore } from "./store";
import { Navigation } from "./components/Navigation";
import { WorkStatusNavigationListener } from "./listeners/WorkStatusNavigationListener";

export const NavigationApp = () => {
  return (
    <Provider store={navStore}>
      <WorkStatusNavigationListener />
      <Navigation />
    </Provider>
  );
};
