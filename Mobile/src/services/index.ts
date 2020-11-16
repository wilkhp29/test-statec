import Axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';

type saveToken = {
  token: string;
  user: User;
};

export type User = {
  id: number | undefined;
  email: string | undefined;
};



export const TOKEN_KEY = 'Token';
export const USER_KEY = 'User';
export const isAuthenticated = () => AsyncStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => {
  return AsyncStorage.getItem(TOKEN_KEY);
};

export const getUser = async (): Promise<User | undefined> => {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);

    return user !== null ? JSON.parse(user) : null;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const saveToken = async ({token, user}: saveToken) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error(err);
  }
};
export const deleteToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(USER_KEY);
};


const api = Axios.create({
  baseURL:"http://10.0.0.104:3000/"
});


api.interceptors.request.use(
  async config => {
    // Do something before request is sent
    const token = await getToken();
    console.log(token);
    config.headers["Authorization"] = `Bearer ${token ? token : null}`;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);


export default api;