import { Button, Card, Input } from '@rneui/base';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useUserContext } from '../hooks/ContextHooks';
import { Credentials } from '../types/localTypes';

interface RegisterFormProps {

  toggleRegister: () => void;

}

const LoginForm: React.FC<RegisterFormProps> = ({ toggleRegister }) => {
  const {handleLogin} = useUserContext();
  const initValues: Credentials = {username: '', password: ''};
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  const doLogin = async (inputs: Credentials) => {
    handleLogin(inputs);
  };

  return (
    <Card>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
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
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <Button title="Login" onPress={handleSubmit(doLogin)} containerStyle={{marginBottom: 20}} />
      <Button title="Or register?" onPress={toggleRegister} />
    </Card>
  );
};

export default LoginForm
