import { RecentJobs } from "./RecentJobs";
import { StatsSummary } from "./StatsSummary";
import { WorkStatusCard } from "./WorkStatusCard";

export const Dashboard = () => {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl mb-2">Welcome to your Dashboard</h1>
        <p className="text-base text-gray-700">
          Track your freelance business at a glance
        </p>
      </header>

      <StatsSummary />

      <div className="grid md:grid-cols-3 sm:grid-cols-1 sm:gap-y-6 md:gap-6">
        <WorkStatusCard className="h-full" />
        <RecentJobs className="col-span-2 h-full" />
      </div>
    </div>
  );
};
