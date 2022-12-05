import React from 'react';
import './Input.css';

const Input = (props) => {
  const { inputProps, onChange } = props;
  const { name, type, placeholder } = inputProps;

  const renderInputType = (inputType) => {
    switch (inputType) {
      case 'radio':
        return (
          <div className='form-input radio-input'>
            <label>
              {name} :
              <div className='radio-buttons-ctn'>
                {inputProps.radiogroup.map((button) => {
                  return (
                    <label key={button.value}>
                      {button.value}
                      <input
                        name={name}
                        value={button.value}
                        type={type}
                        onChange={onChange}
                      ></input>
                    </label>
                  );
                })}
              </div>
            </label>
          </div>
        );

      default:
        return (
          <div className='form-input'>
            <label>
              {name}:{' '}
              <input
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
              ></input>
            </label>
          </div>
        );
    }
  };
  return renderInputType(type || 'text');
};

export default Input;
