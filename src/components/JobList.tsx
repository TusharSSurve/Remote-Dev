import JobListItem from "./JobListItem";

export function JobList({ jobItems }) {
  return <ul className="job-list">
    {jobItems.map(job => <JobListItem job={job} />)}
  </ul>;
}

export default JobList;
