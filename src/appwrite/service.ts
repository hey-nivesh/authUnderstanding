import {ID, Account, Client} from 'appwrite'
import Snackbar from 'react-native-snackbar'

const appwriteClient = new Client()

// Temporarily hardcoded values - replace with environment variables in production
const APPWRITE_ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = '68d964db00327a0c7c27';

type CreateUserAccount = {
    email: string;
    password: string;
    name: string
}
type LoginUserAccount = {
    email: string;
    password: string;
}

class AppwriteService{
    account;
    constructor(){
        appwriteClient
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID)

        this.account = new Account(appwriteClient)
    }

    async createAccount({email, password, name}: CreateUserAccount){
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if(userAccount){
                return this.login({email, password})
            }
            else{
                return userAccount
            }
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG,
            })
            console.log("Appwirte service :: createAccount() ::" + error)
        }
    }
    
    async login({email, password}: LoginUserAccount){
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            )
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG,
            })
            console.log("Appwirte service :: loginAccount() ::" + error)
        }
    }
    
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwirte service :: getCurrentAccount() ::" + error)
        }
    }
    
    async logout(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log("Appwirte service :: getCurrentAccount() ::" + error)
        }
    }
}

export default new AppwriteService()