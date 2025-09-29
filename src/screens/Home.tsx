import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Snackbar from 'react-native-snackbar'
import { AppwriteContext } from '../appwrite/AppWriteContext';

type userObj = {
    name: string;
    email: string;
}

type AppWriteContextType = {
    appwrite: any; 
    isloggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void; 
};

const Home = () => {
    const [userData, setUserData] = React.useState<userObj>()
    const { appwrite, setIsLoggedIn } = useContext<AppWriteContextType>(AppwriteContext);

    const handleLogout = () => {
        appwrite.logout()
            .then(() => {
                setIsLoggedIn && setIsLoggedIn(false);
                Snackbar.show({
                    text: 'Logged out successfully',
                    duration: Snackbar.LENGTH_LONG,
                })
            })
            .catch((error: any) => {
                Snackbar.show({
                    text: 'Logout failed',
                    duration: Snackbar.LENGTH_LONG,
                })
            })
    }

    useEffect(() => {
        appwrite.getCurrentUser()
            .then((response: { name: any; email: any }) => {
                if (response) {
                    const user: userObj = {
                        name: response.name,
                        email: response.email
                    }
                    setUserData(user)
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }, [appwrite])

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.welcomeContainer}>
                    <Image
                        source={{
                            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXw8SZHPYp_Fb273chZBZzBQ1kwewycg5TVQ&s',
                        }}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.message}>
                        Build Fast. Scale Big. All in One Place.
                    </Text>
                </View>

                {userData && (
                    <View style={styles.userContainer}>
                        <View style={styles.userCard}>
                            <View style={styles.avatarContainer}>
                                <Text style={styles.avatarText}>
                                    {userData.name.charAt(0).toUpperCase()}
                                </Text>
                            </View>
                            <View style={styles.userInfo}>
                                <Text style={styles.label}>Name</Text>
                                <Text style={styles.userName}>{userData.name}</Text>
                                <Text style={styles.label}>Email</Text>
                                <Text style={styles.userEmail}>{userData.email}</Text>
                            </View>
                        </View>

                        <View style={styles.statsContainer}>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>🎉</Text>
                                <Text style={styles.statLabel}>Welcome Back!</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>✅</Text>
                                <Text style={styles.statLabel}>Account Active</Text>
                            </View>
                        </View>

                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>🚀 Getting Started</Text>
                            <Text style={styles.infoText}>
                                You're successfully authenticated with Appwrite! 
                                Your account is ready to use all the features.
                            </Text>
                        </View>

                        <TouchableOpacity 
                            style={styles.logoutButton} 
                            onPress={handleLogout}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f0f',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: '#1a1a1a',
    },
    logo: {
        width: 280,
        height: 150,
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    userContainer: {
        padding: 20,
    },
    userCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f02e65',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    avatarText: {
        fontSize: 36,
        color: '#fff',
        fontWeight: 'bold',
    },
    userInfo: {
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        color: '#888',
        marginTop: 12,
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    userEmail: {
        fontSize: 16,
        color: '#aaa',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    statNumber: {
        fontSize: 32,
        marginBottom: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#aaa',
        textAlign: 'center',
    },
    infoBox: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        borderLeftWidth: 4,
        borderLeftColor: '#f02e65',
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#aaa',
        lineHeight: 20,
    },
    logoutButton: {
        backgroundColor: '#f02e65',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#f02e65',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
})