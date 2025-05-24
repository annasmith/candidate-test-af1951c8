import { Radio, RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { WorkStatus } from "../../shared/types";
import { DashboardDispatch, DashboardRootState } from "../store";
import { updateWorkStatus } from "../store/userSlice";

export const WorkStatusCard = ({ className = "" }: { className?: string }) => {
  const { profile } = useSelector((state: DashboardRootState) => state.user);
  const dispatch = useDispatch<DashboardDispatch>();

  const statusLabels: Record<WorkStatus, string> = {
    looking: "Currently looking for work",
    passive: "Passively looking for work",
    not_looking: "Don't want to hear about work",
  };

  const selectOptions: { id: WorkStatus; name: string }[] = [
    { id: "looking", name: statusLabels["looking"] },
    { id: "passive", name: statusLabels["passive"] },
    { id: "not_looking", name: statusLabels["not_looking"] },
  ];

  const dispatchWorkStatusEvent = (status: WorkStatus) => {
    const event = new CustomEvent("work-status-change", {
      detail: { workStatus: status },
    });
    window.dispatchEvent(event);
  };

  const handleStatusChange = (status: WorkStatus) => {
    dispatch(updateWorkStatus(status));
    dispatchWorkStatusEvent(status);
  };

  return (
    <div className={`bg-white rounded-lg p-6 h-full ${className}`}>
      <h3 className="text-lg font-medium mb-4 pb-3 border-b border-gray-200">
        Your Work Status
      </h3>
      <div>
        <RadioGroup
          value={profile.workStatus}
          onChange={handleStatusChange}
          aria-label="Select your current work status"
          className="space-y-2"
        >
          {selectOptions.map((option) => (
            <Radio
              key={option.id}
              value={option.id}
              className="group relative flex cursor-pointer rounded-lg px-5 py-4 transition bg-gray-100 focus:not-data-focus:outline-none data-checked:bg-blue-50 data-focus:outline data-focus:outline-blue-500 data-hover:bg-gray-200 data-hover:data-checked:bg-blue-100"
            >
              <div className="flex w-full items-center justify-between">
                <p>{option.name}</p>
                <CheckIcon className="size-6 fill-blue-500 opacity-0 transition group-data-checked:opacity-100" />
              </div>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
