import React, { useReducer, useState } from 'react';

import './App.css';
import { Input, Select, Button } from 'antd';
import { submitAPI } from './api';
const { Option } = Select;

const initFormData = {
  errorMessage: '',
  name: '',
  email: '',
  phone: '',
  male: ''
};

const handleSubmit = formData => {
  // submit formData using submitAPI
  const { fullname, email, phone } = formData;

  console.log(formData);
};

const formReducer = (formData = initFormData, action) => {
  formData = { ...formData };
};

export default () => {
  const [formData, dispatch] = useReducer(formReducer, initFormData);

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className='App'>
      <h1 id='error' style={{ color: 'red' }}>
        {formData.errorMessage}
      </h1>
      <Input
        name='fullname'
        onChange={e => dispatch({ formData, action: e.target.name })}
        className='input'
        placeholder='ชื่อ - นามสกุล'
      />
      <Input
        name='email'
        onChange={e => dispatch({ formData, action: e.target.name })}
        className='input'
        placeholder='email'
      />
      <Input
        name='phone'
        onChange={e => dispatch({ formData, action: e.target.name })}
        className='input'
        placeholder='phone'
      />
      <Select
        name='male'
        onChange={e => dispatch({ formData, action: e.target.name })}
        className='input'
        defaultValue='male'
      >
        <Option value='male'>ชาย</Option>
        <Option value='female'>หญิง</Option>
      </Select>{' '}
      <br />
      <Button onSubmit={() => handleSubmit(formData)} type='primary'>
        submit
      </Button>
    </div>
  );
};
