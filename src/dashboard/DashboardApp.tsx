import { Provider } from "react-redux";
import { dashboardStore } from "./store";
import { Dashboard } from "./components/Dashboard";
import { WorkStatusDashboardListener } from "./listeners/WorkStatusDashboardListener";

export const DashboardApp = () => {
  return (
    <Provider store={dashboardStore}>
      <WorkStatusDashboardListener />
      <Dashboard />
    </Provider>
  );
};
