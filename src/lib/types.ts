export type ChildrenProps = {
  children: React.ReactNode
}

export type JobItem = {
  id: number,
  relevanceScore: number,
  badgeLetters: string,
  title: string,
  company: string,
  daysAgo: number,
}

export type EJobItem = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  location: string;
  salary: string;
  coverImgURL: string;
  companyURL: string;
}

export type SortBy = 'relevant' | 'recent';