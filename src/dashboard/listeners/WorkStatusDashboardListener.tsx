import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { WorkStatus } from "../../shared/types";
import { DashboardDispatch } from "../store";
import { updateWorkStatus } from "../store/userSlice";

// Component to listen for work status events from other micro-frontends
export const WorkStatusDashboardListener = () => {
  const dispatch = useDispatch<DashboardDispatch>();

  useEffect(() => {
    // listens for change in work status from the dashboard components
    const handleWorkStatusChange = (
      event: CustomEvent<{ workStatus: WorkStatus }>
    ) => {
      dispatch(updateWorkStatus(event.detail.workStatus));
    };

    window.addEventListener(
      "work-status-change",
      handleWorkStatusChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "work-status-change",
        handleWorkStatusChange as EventListener
      );
    };
  }, [dispatch]);

  return null;
};
