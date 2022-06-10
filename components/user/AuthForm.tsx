import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput, Title, useTheme } from 'react-native-paper';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { login } from '../../store/features/auth/authSlice';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../navigations/DrawerNavigator';

interface AuthFormProps {}

const AuthForm: React.FC<AuthFormProps> = () => {
  const { user, error, isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList, 'AuthNav'>>();

  const { colors } = useTheme();

  const styles = makeStyles(colors);

  const formik = useFormik({
    initialValues: {
      email: 'test2@test.com',
      password: 'test1234',
      // email: 'admin@sadaquest.com',
      // password: 'admin1234',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Email is required'),
      password: Yup.string().min(6).required('Password is required'),
    }),
    onSubmit: async (values): Promise<void> => {
      await dispatch(login({ email: values.email, password: values.password }));
    },
  });

  useEffect(() => {
    if (user?.id === 'x5dgQEks8JVO8b5C8LSOfe8Nmdu1') {
      navigation.navigate('ApprovalNav');
      formik.resetForm();
      return;
    }

    if (isLoggedIn) {
      navigation.navigate('DonateNav');
      formik.resetForm();
    }
  }, [isLoggedIn]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title>Sign In</Title>
      </View>
      <View style={styles.inputContainerStyle}>
        <TextInput
          mode="outlined"
          label="Email"
          keyboardType="number-pad"
          value={formik.values.email}
          onChangeText={(value) => {
            formik.setFieldValue('email', value);
          }}
          onBlur={() => formik.setTouched({ ...formik.touched, email: true })}
          error={Boolean(formik.touched.email && formik.errors.email)}
        />
        {formik.touched.email && formik.errors.email && <HelperText type="error">{formik.errors.email}</HelperText>}
      </View>
      <View style={styles.inputContainerStyle}>
        <TextInput
          mode="outlined"
          label="Password"
          keyboardType="number-pad"
          secureTextEntry
          value={formik.values.password}
          onChangeText={(value) => {
            formik.setFieldValue('password', value);
          }}
          onBlur={() => formik.setTouched({ ...formik.touched, password: true })}
          error={Boolean(formik.touched.password && formik.errors.password)}
        />
        {formik.touched.password && formik.errors.password && (
          <HelperText type="error">{formik.errors.password}</HelperText>
        )}
      </View>
      <View style={styles.buttonContainerStyle}>
        <Button mode="contained" onPress={formik.submitForm} disabled={formik.isSubmitting}>
          Sign In
        </Button>
        {!!error && <HelperText type="error">{error}</HelperText>}
      </View>
    </View>
  );
};

const makeStyles = (_colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: 28,
      paddingHorizontal: 24,
    },
    titleContainer: {
      alignItems: 'center',
      marginBottom: 8,
    },
    inputContainerStyle: {
      marginVertical: 6,
    },
    buttonContainerStyle: {
      marginVertical: 28,
    },
  });

export default AuthForm;
