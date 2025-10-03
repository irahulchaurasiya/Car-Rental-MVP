import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Formik } from 'formik'
import React, { useState } from 'react'
import loginData from '../mocks/login.json'
import { useDispatch } from 'react-redux'
import { storage } from '../services/storage'
import * as Yup from 'yup'
import { api } from '../services/api'
import { login } from '../store/slices/authSlice'
import { LoginValues } from '../types/global'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../types/navigation'

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({navigation}: Props) => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid Email").required('Required'),
        password: Yup.string().required('Required'),
    })

    const handleLogin = async (values: LoginValues) => {
        try {
            setLoading(true);
            console.log("login data:", loginData);
            // Simulate Mock API call
            const response = await api.login();
            console.log("API response:", response);

            // update redux state
            const user = { email: values.email, password: values.password };
            dispatch(login({ user }));

            // save session in mmkv
            storage.set(
                'auth',
                JSON.stringify({ email: values.email, password: values.password })
            );

            console.log('Login successful:', values.email, values.password);
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Formik<LoginValues>
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
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

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleSubmit()}
                            activeOpacity={0.7}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Login</Text>
                            )}
                        </TouchableOpacity>


                        <Text style={styles.signupText} onPress={() => navigation.navigate('Signup')}>Don't have an account? Sign Up</Text>
                    </>
                )}
            </Formik>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, color: 'black' },
    error: { color: 'red', marginBottom: 10 },
    signupText: { color: 'blue', marginTop: 10, textAlign: 'center' },
    button: { backgroundColor: '#4f46e5', paddingVertical: 12, borderRadius: 6, alignItems: 'center', marginTop: 10 },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});