import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { WorkStatus } from "../../shared/types";
import { NavDispatch, NavRootState } from "../store";
import { updateWorkStatus } from "../store/userSlice";

export const UserAvatar = () => {
  const { profile } = useSelector((state: NavRootState) => state.user);
  const dispatch = useDispatch<NavDispatch>();

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

  // for production implementation this would be in the translation files, so I'm not worrying too much
  // about duplication between components
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

  return (
    <div className="relative">
      <Listbox value={profile.workStatus} onChange={handleStatusChange}>
        <ListboxButton
          title="Select your current work status"
          className={clsx(
            "flex grow items-center gap-2 w-full rounded-lg cursor-pointer",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:outline-offset-4 data-focus:outline-blue-500"
          )}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col items-start w-full h-full">
            <span className="text-left font-medium text-sm">
              {profile.name}
            </span>
            <div className="flex flex-row w-full justify-start">
              <div className="flex grow text-left text-xs text-gray-600">
                {statusLabels[profile.workStatus]}
              </div>
              <ChevronDownIcon
                className="flex pointer-events-none size-4 fill-gray"
                aria-hidden="true"
              />
            </div>
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor="top start"
          className={clsx(
            "w-sm rounded-xl border border-gray-200 bg-white p-1 [--anchor-gap:--spacing(4)] focus:outline-none",
            "transition duration-100 ease-in data-leave:data-closed:opacity-0"
          )}
        >
          {selectOptions.map((option) => (
            <ListboxOption
              key={option.id}
              value={option.id}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-blue-50"
            >
              <CheckIcon className="invisible size-4 fill-blue-500 group-data-selected:visible" />
              <div>{option.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};
