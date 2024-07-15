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