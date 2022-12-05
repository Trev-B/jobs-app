import React, { useState, useEffect } from 'react';
import './Job.css';
import { updateJob, deleteJob } from '../api-wrapper/jobs';

const Job = (props) => {
  const { jobDetails, setUserJobs } = props;
  const {
    _id: id,
    position,
    company,
    status,
    location,
    experience,
    link,
  } = jobDetails;

  const [fields, setFields] = useState({
    company,
    position,
    status,
    location,
    experience,
    link,
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const inputs = document.querySelectorAll(`.input-${id}`);
    inputs.forEach((input) => {
      const inputName = input.id.split('-')[0];
      input.value = fields[inputName] || '';
      if (!fields[inputName]) {
        input.placeholder = '❌';
      }
      input.disabled = true;
    });
  }, []);

  const updateInput = (e) => {
    const inputId = e.target.id.split('-')[0];
    setFields((prevFields) => {
      return { ...prevFields, [inputId]: e.target.value };
    });
  };

  const editJob = () => {
    const inputs = document.querySelectorAll(`.input-${id}`);
    const editButton = document.querySelector(`.edit-btn-${id}`);

    inputs.forEach((input) => {
      if (input.classList.contains('job-edit'))
        input.classList.remove('job-edit');
      else input.classList.add('job-edit');

      input.disabled = !input.disabled;
    });

    if (editButton.classList.contains('edit-btn-on'))
      editButton.classList.remove('edit-btn-on');
    else editButton.classList.add('edit-btn-on');

    if (editing) updateUserJob();

    setEditing(!editing);
  };

  const updateUserJob = async () => {
    await updateJob(id, fields, localStorage.getItem('token'));
  };

  const deleteUserJob = async () => {
    const res = await deleteJob(id, localStorage.getItem('token'));
    if (res) {
      setUserJobs((prevJobs) => {
        return prevJobs.filter((job) => job._id !== id);
      });
    }
  };

  return (
    <div className='job'>
      <div className='job-details'>
        <label>
          Position:{' '}
          <input
            id={`position-${id}`}
            className={`input-${id} `}
            type='text'
            onChange={updateInput}
          />
        </label>

        <label>
          Company:{' '}
          <input
            id={`company-${id}`}
            className={`input-${id} `}
            type='text'
            onChange={updateInput}
          />
        </label>

        <label>
          Status:{' '}
          <input
            id={`status-${id}`}
            className={`input-${id} `}
            type='text'
            onChange={updateInput}
          />
        </label>

        <label>
          Location:{' '}
          <input
            id={`location-${id}`}
            className={`input-${id} `}
            type='text'
            onChange={updateInput}
          />
        </label>

        <label>
          Experience:{' '}
          <input
            id={`experience-${id}`}
            className={`input-${id} `}
            type='text'
            onChange={updateInput}
          />
        </label>

        <label>
          Link:{' '}
          <input
            id={`link-${id}`}
            className={`input-${id} `}
            type='text'
            onChange={updateInput}
          />
          {!fields.link ? (
            <></>
          ) : (
            <a target='_blank' rel='noreferrer' href={`${fields.link}`}>
              🔗
            </a>
          )}
        </label>
      </div>

      <div className='job-buttons'>
        <button className={`edit-btn edit-btn-${id}`} onClick={editJob}>
          {!editing ? 'Edit' : 'Update'}
        </button>
        <button
          className={`delete-btn delete-btn-${id}`}
          onClick={deleteUserJob}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Job;
