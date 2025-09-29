import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import Snackbar from 'react-native-snackbar'
import { AppwriteContext } from '../appwrite/AppWriteContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../routes/AuthStack';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

type AppWriteContextType = {
    appwrite: any; 
    isloggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void; 
};

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
    const { appwrite, setIsLoggedIn } = useContext<AppWriteContextType>(AppwriteContext);

    const [error, setError] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleLogin = () => {
        if (email.length < 1 || password.length < 1) {
            setError('All fields are required')
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address')
            return;
        } else {
            setError('')
            setIsLoading(true)
            const user = {
                email,
                password
            };
            appwrite
                .login(user)
                .then((response: any) => {
                    if (response) {
                        setIsLoggedIn(true)
                        Snackbar.show({
                            text: 'Login successful',
                            duration: Snackbar.LENGTH_LONG,
                            backgroundColor: '#4caf50'
                        })
                    }
                })
                .catch((e: any) => {
                    console.log(e)
                    setError('Invalid email or password. Please try again.')
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.formContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.appName}>Appwrite Auth</Text>
                            <Text style={styles.subtitle}>Welcome back!</Text>
                        </View>

                        {error ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>⚠️ {error}</Text>
                            </View>
                        ) : null}

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
                                autoCorrect={false}
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
                                autoCorrect={false}
                            />
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity 
                            style={[styles.button, isLoading && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={isLoading}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Text>
                        </TouchableOpacity>

                        {/* Signup Link */}
                        <View style={styles.footerContainer}>
                            <Text style={styles.footerText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                <Text style={styles.linkText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Additional Info */}
                        <View style={styles.infoBox}>
                            <Text style={styles.infoText}>
                                🔒 Secured with Appwrite Authentication
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login

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
    headerContainer: {
        marginBottom: 32,
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
    infoBox: {
        marginTop: 24,
        padding: 12,
        backgroundColor: '#0f0f0f',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    infoText: {
        color: '#888',
        fontSize: 12,
        textAlign: 'center',
    },
})