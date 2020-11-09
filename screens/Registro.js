import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import CustomInput from '../screens/componenteRegistro/CustomInput';

const Registro = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.signupContainer}>
        <Text>Sign Up Screen</Text>

        <Formik
        initialValues={{
            dni: '',
            usuario: '',
            contraseña: '',
            confirmcontraseña: '',
            codigodeautenticacion: '',
        }}
        onSubmit={values => console.log(values)}
        >
        {({ handleSubmit, isValid }) => (
            <>
            <Field
                component={CustomInput}
                name="dni"
                placeholder="DNI"
                keyboardType="numeric"
            />
            <Field
                component={CustomInput}
                name="usuario"
                placeholder="Usuario"
                keyboardType="default"
            />
            <Field
                component={CustomInput}
                name="contraseña"
                placeholder="Contraseña"
                keyboardType="default"
                secureTextEntry
            />
            <Field
                component={CustomInput}
                name="confirmContraseña"
                placeholder="Confirmar Contraseña"
                secureTextEntry
            />
            <Field
                component={CustomInput}
                name="codigodeautenticacion"
                placeholder="Código de Autenticación"
                secureTextEntry
            />

            <Button
                onPress={handleSubmit}
                title="Registrarse"
                disabled={!isValid}
            />
            </>
        )}
        </Formik>


        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
})
export default Registro