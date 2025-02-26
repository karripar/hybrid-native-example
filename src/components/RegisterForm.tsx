import React from 'react'
import { Text, View } from 'react-native'

interface RegisterFormProps {

  toggleRegister: () => void;

}

const RegisterForm: React.FC<RegisterFormProps> = ({ toggleRegister })  => {
  return (
     <View><Text>LoginForm</Text></View>
  )
}

export default RegisterForm
