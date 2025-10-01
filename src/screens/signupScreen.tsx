import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { storage } from '../services/storage';
import { useDispatch } from 'react-redux';
import signupData from '../mocks/signup.json'
import { api } from '../services/api';
import CustomButton from '../components/button';

const SignupScreen = ({ navigation }: any) => {

    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().email("Invalid Email").required('Required'),
        password: Yup.string().required('Required'),
    })

    const handleSignup = async (values: any) => {
        try {

            console.log('signup data:', signupData);

            // Simulate Mock API call
            const response = await api.signup();
            console.log("API response:", response);

            // update redux state
            dispatch({ type: 'auth/login', payload: { user: { name: values.name, email: values.email } } });

            // save session in mmkv
            storage.set('auth', JSON.stringify({ user: { name: values.name, email: values.email } }));
            
            console.log('signup successfull:', values);
        } catch (error) {
            console.error('Signup error:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SignUp</Text>
            <Formik
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

                        <CustomButton text="Signup" onPress={handleSubmit} />

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
});