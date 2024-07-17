import { JobItem } from "../../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "../layout/Spinner";
import { useActiveId } from "../../lib/hooks";

type JobListProps = {
  jobItems: JobItem[],
  isLoading: boolean
}

export function JobList({ jobItems, isLoading }: JobListProps) {
  const activeId = useActiveId()

  return <ul className="job-list">
    {isLoading && <Spinner />}
    {!isLoading && jobItems.map(job => <JobListItem key={job.id} job={job} isActive={job.id === activeId} />)}
  </ul>;
}

export default JobList;
