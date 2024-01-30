import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [form] = Form.useForm();
  const [login, { error, data }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (data) {
      Auth.login(data.login.token);
    }
  }, [data]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      await form.validateFields();
      const { data } = await login({
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
    const password = form.getFieldValue('password');
    return !username || !password;
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
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;