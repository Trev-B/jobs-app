import React, { useState, useEffect } from 'react';
import { getAllUserJobs, downloadUserJobs } from '../api-wrapper/jobs';
import Job from './Job.jsx';
import './UserPage.css';
import CreateJobForm from './CreateJobForm';
import { useNavigate } from 'react-router-dom';

const UserPage = (props) => {
  const { loggedIn } = props;
  const [userJobs, setUserJobs] = useState();
  const nav = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      nav('/');
    }
    getUserJobs();
  }, []);

  const getUserJobs = async () => {
    const jobs = await getAllUserJobs(localStorage.getItem('token'));
    if (!!jobs) setUserJobs(jobs.jobs);
  };

  const sortJobs = (e) => {
    function compare(prop) {
      return function (a, b) {
        const s1 = a[prop].toLowerCase();
        const s2 = b[prop].toLowerCase();
        if (s1 < s2) {
          return -1;
        }
        if (s1 > s2) {
          return 1;
        }
        return 0;
      };
    }

    const sortedUserJobs = [...userJobs];
    switch (e.target.value) {
      case 'Position':
        sortedUserJobs.sort(compare('position'));
        break;
      case 'Company':
        sortedUserJobs.sort(compare('company'));
        break;
      case 'Location':
        sortedUserJobs.sort(compare('location'));
        break;
      case 'Status':
        sortedUserJobs.sort(compare('status'));
        break;
      default:
        break;
    }
    setUserJobs(sortedUserJobs);
  };

  const searchJobs = async (e) => {
    e.preventDefault();
    setUserJobs(null);
    const target = e.target[0].value;
    const jobsFetch = await getAllUserJobs(localStorage.getItem('token'));
    const jobs = jobsFetch.jobs.filter((job) => {
      return Object.values(job).join('').includes(target);
    });
    // sort before setting
    setUserJobs(jobs);
  };

  const downloadJobs = async (e) => {
    await downloadUserJobs(localStorage.getItem('token'));
  };

  return (
    <div className='user-page'>
      <CreateJobForm setUserJobs={setUserJobs}></CreateJobForm>

      <div className='jobs-ctn'>
        <div className='filter-ctn'>
          <div className='job-search'>
            <form onSubmit={searchJobs}>
              <input type='text' placeholder='Search' />
              <button>Search</button>
            </form>
          </div>
          <div className='filter-ctn-right-side'>
            <button onClick={downloadJobs}>
              <p>Save as Excel file</p>
              <span>⭳</span>
            </button>
            <label>
              Sort By:{' '}
              <select name='filter' id='filter' onChange={sortJobs}>
                <option value='Position'>Position</option>
                <option value='Company'>Company</option>
                <option value='Status'>Status</option>
                <option value='Location'>Location</option>
              </select>
            </label>
          </div>
        </div>
        {!userJobs
          ? 'Loading...'
          : userJobs.map((job) => (
              <Job
                key={job._id}
                jobDetails={job}
                setUserJobs={setUserJobs}
              ></Job>
            ))}
        {!!userJobs && userJobs.length === 0 ? <h3>No Jobs</h3> : <></>}
      </div>
    </div>
  );
};

export default UserPage;
