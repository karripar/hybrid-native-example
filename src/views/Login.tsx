import {useEffect, useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { ScrollView } from 'react-native';
import { useUserContext } from '../hooks/ContextHooks';

const Login = () => {
  // state for toggling between login and register form
  const [displayRegister, setDisplayRegister] = useState(false);
  const {handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , []);

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };

  return (
    <ScrollView>
      {displayRegister ? (
        <RegisterForm toggleRegister={toggleRegister} />
      ) : (
        <LoginForm toggleRegister={toggleRegister} />
      )}
    </ScrollView>

  );
};

export default Login;
