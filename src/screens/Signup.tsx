import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import Snackbar from 'react-native-snackbar'
import { AppwriteContext } from '../appwrite/AppWriteContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../routes/AuthStack';

type signupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

type AppWriteContextType = {
    appwrite: any; 
    isloggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void; 
};

const Signup: React.FC<signupScreenProps> = ({ navigation }) => {
    const { appwrite, setIsLoggedIn } = useContext<AppWriteContextType>(AppwriteContext);

    const [error, setError] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSignup = () => {
        if (name.length < 1 || email.length < 1 || password.length < 1 || repeatPassword.length < 1) {
            setError('All fields are required')
            return;
        } else if (password !== repeatPassword) {
            setError('Passwords do not match')
            return;
        } else if (password.length < 8) {
            setError('Password must be at least 8 characters')
            return;
        } else {
            setError('')
            setIsLoading(true)
            const user = {
                email,
                password,
                name
            };
            appwrite
                .createAccount(user)
                .then((response: any) => {
                    if (response) {
                        setIsLoggedIn(true)
                        Snackbar.show({
                            text: 'Signup successful',
                            duration: Snackbar.LENGTH_LONG,
                            backgroundColor: '#4caf50'
                        })
                    }
                })
                .catch((e: any) => {
                    console.log(e)
                    setError('Signup failed. Please try again.')
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.formContainer}>
                        <Text style={styles.appName}>Appwrite Auth</Text>
                        <Text style={styles.subtitle}>Create your account</Text>

                        {error ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>⚠️ {error}</Text>
                            </View>
                        ) : null}

                        {/* Name Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                value={name}
                                onChangeText={(text) => {
                                    setError('');
                                    setName(text);
                                }}
                                placeholderTextColor={'#AEAEAE'}
                                placeholder="Name"
                                style={styles.input}
                                autoCapitalize="words"
                            />
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                value={email}
                                keyboardType="email-address"
                                onChangeText={(text) => {
                                    setError('');
                                    setEmail(text);
                                }}
                                placeholderTextColor={'#AEAEAE'}
                                placeholder="Email"
                                style={styles.input}
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                value={password}
                                onChangeText={(text) => {
                                    setError('');
                                    setPassword(text);
                                }}
                                placeholderTextColor={'#AEAEAE'}
                                placeholder="Password"
                                style={styles.input}
                                secureTextEntry
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Repeat Password Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <TextInput
                                value={repeatPassword}
                                onChangeText={(text) => {
                                    setError('');
                                    setRepeatPassword(text);
                                }}
                                placeholderTextColor={'#AEAEAE'}
                                placeholder="Confirm Password"
                                style={styles.input}
                                secureTextEntry
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Signup Button */}
                        <TouchableOpacity 
                            style={[styles.button, isLoading && styles.buttonDisabled]}
                            onPress={handleSignup}
                            disabled={isLoading}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>
                                {isLoading ? 'Creating Account...' : 'Sign Up'}
                            </Text>
                        </TouchableOpacity>

                        {/* Login Link */}
                        <View style={styles.footerContainer}>
                            <Text style={styles.footerText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.linkText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f0f',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    formContainer: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginBottom: 32,
    },
    errorContainer: {
        backgroundColor: '#ff4444',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#cc0000',
    },
    errorText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        color: '#888',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#0f0f0f',
        borderWidth: 2,
        borderColor: '#2a2a2a',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#f02e65',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginTop: 12,
        shadowColor: '#f02e65',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: '#8a1a3d',
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
        alignItems: 'center',
    },
    footerText: {
        color: '#aaa',
        fontSize: 14,
    },
    linkText: {
        color: '#f02e65',
        fontSize: 14,
        fontWeight: 'bold',
    },
})