import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Formik } from 'formik'
import React from 'react'
import loginData from '../mocks/login.json'
import { useDispatch } from 'react-redux'
import { storage } from '../services/storage'
import * as Yup from 'yup'
import { api } from '../services/api'
import CustomButton from '../components/button'

const LoginScreen = ({ navigation }: any) => {

    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid Email").required('Required'),
        password: Yup.string().required('Required'),
    })

    const handleLogin = async (values: any) => {
        try {
          console.log("login data:", loginData);
          // Simulate Mock API call
          const response = await api.login();
          console.log("API response:", response);
      
          // update redux state
          dispatch({ type: 'auth/login', payload: { email: values.email, password: values.password } });
      
          // save session in mmkv
          storage.set(
            'auth',
            JSON.stringify({ email: values.email, password: values.password})
          );
      
          console.log('Login successful:', values.email, values.password);
        } catch (error) {
          console.error('Login error:', error);
        }
      };
      

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}>
                {({ handleChange, handleBlur, handleSubmit, errors, values, touched }) => (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            placeholderTextColor={'#999'}
                            onChangeText={handleChange('email')}
                            value={values.email}
                            onBlur={handleBlur('email')} />
                        {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            placeholderTextColor={'#999'}
                            onChangeText={handleChange('password')}
                            value={values.password}
                            onBlur={handleBlur("password")}
                            secureTextEntry />
                        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                       <CustomButton text="Login" onPress={handleSubmit} />


                        <Text style={styles.signupText} onPress={() => navigation.navigate('Signup')}>Don't have an account? Sign Up</Text>
                    </>
                )}
            </Formik>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center'},
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'},
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, color: 'black' },
    error: { color: 'red', marginBottom: 10 },
    signupText: { color: 'blue', marginTop: 10, textAlign: 'center' },
});