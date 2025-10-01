import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { Formik } from 'formik'
import React from 'react'
import loginData from '../mocks/login.json'
import { useDispatch } from 'react-redux'
import { storage } from '../services/storage'
import * as Yup from 'yup'

const LoginScreen = ({ navigation }: any) => {

    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid Email").required('Required'),
        password: Yup.string().required('Required'),
    })

    const handleLogin = (values: any) => {
        console.log("login data:", loginData);

        // update redux state and session storage
        dispatch({ type: 'auth/login', payload: { email: values.email, password: values.password } });
        storage.set('auth', JSON.stringify({ email: values.email, password: values.password }));
        console.log('login successful:', values.email, values.password);
    }

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

                        <Button title='Login' onPress={handleSubmit} />

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