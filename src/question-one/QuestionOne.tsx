import React, { useState } from "react"
import { IDataService, DateFormatOption } from '../common/types'

import { SectionGroup } from "../components/section/SectionGroup"

import "./QuestionOne.css"

export const QuestionOne: React.FC<{ service: IDataService }> = ({ service }) => {
  const [isSearchFieldValid, setIsSearchFieldValid] = useState<boolean>(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchFieldTouched, setIsSearchFieldTouched] = useState<boolean>(false);

  const handleOnChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const searchTerm: string = event.currentTarget.value.trim();

    const leastNumberOfCharsToSearch: number = 2;

    if (searchTerm.length > leastNumberOfCharsToSearch) {
      setIsSearchFieldValid(true);

      setSearchTerm(searchTerm);

      const result = await service.getJobsWithSearchTerm(searchTerm);

      setJobs(result);
    } else {
      setIsSearchFieldValid(false);

      setSearchTerm('');

      setJobs([]);
    }
  }

  const handleOnFocus = (): void => {
    setIsSearchFieldTouched(true);
  }

  const dateFormatOption: DateFormatOption = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  return (
    <SectionGroup>
      <form className='search-form'>
        <div>
          <label className='search-field-label' htmlFor='searchField'>Search</label>

          <input className='search-field-input' type='text' id='searchField' name='searchField' onChange={handleOnChange} onFocus={handleOnFocus} placeholder="Job's name"></input>
        </div>

        {(isSearchFieldTouched && !isSearchFieldValid) ? <p className="error-message">Please enter at least 3 characters.</p> : null}
      </form>

      <div className="job-list">
        <h3>List of jobs:</h3>

        {jobs.length > 0 && jobs.map((job) => <div className='job-info'>
          <p><span className='bold-text'>Job's name: </span>{job.name}</p>
          <p><span className='bold-text'>Start date: </span>{new Date(job.start).toLocaleString("en-US", dateFormatOption)}</p>
          <p><span className='bold-text'>End date: </span>{new Date(job.end).toLocaleString("en-US", dateFormatOption)}</p>
          <p><span className='bold-text'>Contact ID: </span>{job.contactId}</p>
        </div>)}

        {(searchTerm && jobs.length === 0) && <p className='error-message'>Sorry, there aren't any jobs that have the name: "{searchTerm}"</p>}
      </div>
    </SectionGroup>
  )
}
