import { data } from "react-router-dom";
import axios from 'axios';
import api from "./http.api";

export const AddUser = async (data: any): Promise<unknown | undefined> => {
    try {
        const response = await api.post('/api/v1/users/signup',data)
        return response

    } catch (error) {
        throw error;
        
    }

}

export const AuthUser = async (data: any): Promise<unknown | undefined> => {
    try{
        const response = await api.post('/api/v1/users/login',data)
        localStorage.setItem('token',response.data.token)
        return response
    }catch(error){
        throw error;
    }
} 

export const AuthUserWithToken = async (Token: any): Promise<unknown | undefined> => {
    try {
      const response = await api.get('/api/v1/users/dashboard', {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Auth failed:', error);
      return undefined;
    }
  };
  