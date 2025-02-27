import React from 'react';
import {Button, Card, Input} from '@rneui/base';
import {Controller, useForm} from 'react-hook-form';
import {useUser} from '../hooks/apiHooks';
import {RegisterCredentials} from '../types/localTypes';
import { Alert } from 'react-native';

interface RegisterFormProps {
  toggleRegister: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({toggleRegister}) => {
  const {postRegister, getUsernameAvailable, getEmailAvailable} = useUser();

  const initValues:{
    username: string;
    password: string;
    email: string;
    confirmPassword?: string;
  } = {
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
  };

  const doRegister = async (inputs: {
    username: string;
    password: string;
    email: string;
    confirmPassword?: string;
  }) => {
    try {
      delete inputs.confirmPassword;
      const registerResult = await postRegister(inputs as RegisterCredentials);
      console.log('doRegister result: ', registerResult);
      if (registerResult) {
        console.log('register successful');
        Alert.alert('Register successful', 'You can now login',
        [
          {
            text: 'OK',
            onPress: () => toggleRegister(),
          },
        ],
        );
      }
    } catch (error) {
      console.error((error as Error).message);
      // TODO: Display failed register message
      Alert.alert('Register failed', 'Please try again');
    }
  };

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  return (
    <Card>
      <Card.Title>Register</Card.Title>
      <Controller
      control={control}
      rules={{
        maxLength: 30,
        minLength: {value: 3, message: 'minimum username length is 3'},
        required: {value: true, message: 'is required'},
        validate: async (value) => {
          try {
            const {available} = await getUsernameAvailable(value);
            return available ? true : 'username not available';
          } catch (error) {
            console.error((error as Error).message);
            return true;
          }
        },
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <Input
        placeholder="Username"
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        autoCapitalize="none"
        errorMessage={errors.username?.message}
        />
      )}
      name="username"
      />

      <Controller
      control={control}
      rules={{
        maxLength: 100,
        required: {value: true, message: 'is required'},
        pattern: {
          // simple email regex pattern, do better?
          value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: 'not a valid email',
        },
        validate: async (value) => {
          try {
            const {available} = await getEmailAvailable(value);
            return available ? true : 'email not available';
          } catch (error) {
            console.error((error as Error).message);
            return true;
          }
        },
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <Input
        placeholder="email"
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        errorMessage={errors.username?.message}
        />
      )}
      name="email"
      />

      <Controller
      control={control}
      rules={{
        maxLength: 100,
        minLength: {value: 8, message: 'minimum password length is 8'},
        required: {value: true, message: 'is required'},
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <Input
        placeholder="password"
        secureTextEntry={true}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        errorMessage={errors.password?.message}
        />
      )}
      name="password"
      />
      <Controller
      control={control}
      rules={{
        maxLength: 100,
        minLength: {value: 8, message: 'minimum password length is 8'},
        required: {value: true, message: 'is required'},
        validate: (value) => {
        return value === getValues().password ? true : 'passwords do not match';
        },
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <Input
        placeholder="Confirm password"
        secureTextEntry={true}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        errorMessage={errors.confirmPassword?.message}
        />
      )}
      name="confirmPassword"
      />
      <Button title="Register" onPress={handleSubmit(doRegister)} containerStyle={{marginBottom: 20}} />

      <Button title="Or login?" onPress={toggleRegister} />
    </Card>
  );
};

export default RegisterForm;
