export interface Job {
  id: number
  contactId: number
  start: string
  end: string
  location: string
  name: string
}

export interface IDataService {
  getJobs: () => Promise<Pick<Job, 'name' | 'start' | 'end'>[]>
  getJobsWithSearchTerm: (searchTerm: string) => Promise<Pick<Job, 'name' | 'start' | 'end'>[]>
}

export interface DateFormatOption {
  weekday: string,
  year: string,
  month: string,
  day: string,
  hour: string,
  minute: string
}