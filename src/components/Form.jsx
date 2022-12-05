import React, { useState } from 'react';
import './Form.css';
import Input from './Input';

const Form = (props) => {
  const { title, fields, onSubmit, clearOnSubmit } = props;
  const [inputFields, setInputFields] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    onSubmit(inputFields);
    if (!!clearOnSubmit) {
      const form = document.querySelector('.form');
      form.reset();
      setInputFields({});
    }
  };

  const updateInput = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  return (
    <div className='form-ctn'>
      <h2>{title}</h2>
      <form className='form' onSubmit={submit}>
        {fields.map((field) => {
          return (
            <Input
              inputProps={field}
              onChange={updateInput}
              key={field.name}
            ></Input>
          );
        })}
        <div className='submit-btn-ctn'>
          <button>{title}</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
