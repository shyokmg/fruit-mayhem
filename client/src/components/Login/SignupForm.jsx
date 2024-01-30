import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [form] = Form.useForm();
  const [addUser, { error, data }] = useMutation(ADD_USER);

  
  useEffect(() => {
    if (data) {
      Auth.login(data.addUser.token);
    }
  }, [data]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      await form.validateFields();
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  const isSubmitButtonDisabled = () => {
    const username = form.getFieldValue('username');
    const email = form.getFieldValue('email');
    const password = form.getFieldValue('password');
    return !username || !email || !password;
  };
  
  return (
    <>
      <Form form={form} onFinish={handleFormSubmit}>
        {showAlert && (
          <Alert
            closable
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant='danger'
            message='Something went wrong with your login credentials!'
          />
        )}

        <Form.Item
          label='Username'
          name='username'
          validateTrigger="onBlur"
          rules={[{ required: true, message: 'Username is required!' }]}
        >
          <Input
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
          />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          validateTrigger="onBlur"
          rules={[{ required: true, message: 'Email is required!' }]}
        >
          <Input
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
          />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          validateTrigger="onBlur"
          rules={[{ required: true, message: 'Password is required!' }]}
        >
          <Input.Password
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' disabled={isSubmitButtonDisabled()}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignupForm;

