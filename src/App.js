import React, { useReducer } from 'react';

import './App.css';
import { Input, Select, Button } from 'antd';
import { submitAPI } from './api';
const { Option } = Select;

const initFormData = {
  errorMessage: '',
  name: '',
  email: '',
  phone: '',
  male: 'male'
};

class Validatior {
  constructor() {}
  re = {
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /^0[0-9]{2}-[0-9]{3}-[0-9]{4}/
  };

  validateName = name => name.length > 0 && name.length <= 255;
  validateEmail = email => {
    console.assert(this.re);
    return this.re.email.test(email);
  };
  validatePhone = phone => this.re.phone.test(phone);
  validateMale = male => ['male', 'female'].includes(male) !== -1;
}

const formReducer = (formData = initFormData, action) => {
  return { ...formData, ...action.payload };
};

export default () => {
  const [formData, dispatch] = useReducer(formReducer, initFormData);

  const handleSubmit = async formData => {
    // submit formData using submitAPI
    const v = new Validatior();
    const { name, email, phone, male } = formData;
    let errors = [];

    if (!v.validateName(name.trim()))
      errors.push('Invalid Name: Name length must no more than 255 characters');
    if (!v.validateEmail(email.trim().toLowerCase()))
      errors.push('Invalid Email: Please Use Appropriate Email');
    if (!v.validatePhone(phone.trim()))
      errors.push('Invalid Phone: must be format 0xx-xxx-xxxx');
    if (!v.validateMale(male.trim()))
      errors.push('Invalid Male: Must be either "male" or "female"');

    if (errors.length !== 0)
      return dispatch({
        payload: { ...formData, errorMessage: errors }
      });
    else {
      submitAPI({ name, email, phone, male });
      dispatch({ payload: initFormData }); // reset
    }
  };

  const handleChange = e => {
    dispatch({
      payload: { ...formData, [e.target.name]: e.target.value }
    });
  };

  const handleSelectMaleChange = male => {
    dispatch({ payload: { ...formData, male } });
  };

  return (
    <div className='App'>
      <h1 id='error' style={{ color: 'red' }}>
        {formData.errorMessage !== '' &&
          formData.errorMessage.map((msg, idx) => <p key={idx}>{msg}</p>)}
      </h1>
      <Input
        name='name'
        value={formData.name}
        onChange={handleChange}
        className='input'
        placeholder='ชื่อ - นามสกุล'
      />
      <Input
        name='email'
        value={formData.email}
        onChange={handleChange}
        className='input'
        placeholder='email'
      />
      <Input
        name='phone'
        value={formData.phone}
        onChange={handleChange}
        className='input'
        placeholder='phone'
      />
      <Select
        name='male'
        value={formData.male}
        onChange={handleSelectMaleChange}
        className='input'
        defaultValue='male'
      >
        <Option value='male'>ชาย</Option>
        <Option value='female'>หญิง</Option>
      </Select>{' '}
      <br />
      <Button onClick={() => handleSubmit(formData)} type='primary'>
        submit
      </Button>
    </div>
  );
};
