import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { storage } from '../services/storage';
import { useDispatch } from 'react-redux';
import signupData from '../mocks/signup.json'
import { api } from '../services/api';
import { login } from '../store/slices/authSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { SignupValues } from '../types/global';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().email("Invalid Email").required('Required'),
        password: Yup.string().required('Required'),
    })

    const handleSignup = async (values: SignupValues) => {
        try {
            setLoading(true);
            console.log('signup data:', signupData);

            // Simulate Mock API call
            const response = await api.signup();
            console.log("API response:", response);

            // update redux state
            const user = { email: values.email, password: values.password };
            dispatch(login({ user }));

            // save session in mmkv
            storage.set('auth', JSON.stringify({ user: { name: values.name, email: values.email } }));

            console.log('signup successfull:', values);
        } catch (error) {
            console.error('Signup error:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SignUp</Text>
            <Formik<SignupValues>
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSignup(values)}>
                {({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (

                    <>
                        <TextInput
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            style={styles.input}
                            placeholder='Name'
                            placeholderTextColor={'#999'}
                            value={values.name}
                        />
                        {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

                        <TextInput
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            style={styles.input}
                            placeholder='Email'
                            placeholderTextColor={'#999'}
                            value={values.email}
                        />
                        {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                        <TextInput
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            style={styles.input}
                            placeholder='Password'
                            placeholderTextColor={'#999'}
                            value={values.password}
                            secureTextEntry
                        />
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
                                <Text style={styles.buttonText}>SignUp</Text>
                            )}
                        </TouchableOpacity>

                        <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>Already have an account? Login</Text>
                    </>
                )}
            </Formik>
        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, color: 'black' },
    error: { color: 'red', marginBottom: 10 },
    loginText: { color: 'blue', marginTop: 10, textAlign: 'center' },
    button: { backgroundColor: '#4f46e5', paddingVertical: 12, borderRadius: 6, alignItems: 'center', marginTop: 10 },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});