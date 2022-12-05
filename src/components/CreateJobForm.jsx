import React from 'react';
import './CreateJobForm.css';
import Form from './Form';
import { createJob } from '../api-wrapper/jobs';

const CreateJobForm = (props) => {
  const { setUserJobs } = props;

  const fields = [
    { name: 'Company', type: 'text', placeholder: 'Microsoft' },
    { name: 'Position', type: 'text', placeholder: 'Software Engineer' },
    {
      name: 'Status',
      type: 'radio',
      radiogroup: [
        { value: 'interview' },
        { value: 'pending' },
        { value: 'declined' },
      ],
    },
    { name: 'Location', type: 'text', placeholder: 'Chicago, IL' },
    { name: 'Experience', type: 'text', placeholder: '3+ years Java' },
    { name: 'Link', type: 'text', placeholder: 'https://www.linkedin.com/' },
  ];

  const onSubmit = async (fieldArgs) => {
    const token = localStorage.getItem('token');
    const job = await createJob(fieldArgs, token);
    if (!job) return;
    setUserJobs((currJobs) => {
      const curr = currJobs;
      return [...curr, job.job];
    });
  };

  return (
    <div className='create-job-form'>
      <Form
        title='Add Job'
        fields={fields}
        onSubmit={onSubmit}
        clearOnSubmit={true}
      ></Form>
    </div>
  );
};

export default CreateJobForm;
