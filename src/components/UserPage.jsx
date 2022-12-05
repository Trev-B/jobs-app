import React, { useState, useEffect } from 'react';
import { getAllUserJobs } from '../api-wrapper/jobs';
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

  let getUserJobs = async () => {
    const jobs = await getAllUserJobs(localStorage.getItem('token'));
    if (!!jobs) setUserJobs(jobs.jobs);
  };

  return (
    <div className='user-page'>
      <CreateJobForm setUserJobs={setUserJobs}></CreateJobForm>
      <div className='jobs-ctn'>
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
