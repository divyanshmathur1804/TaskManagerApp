import { data } from "react-router-dom";
import api from "./http.api";


interface ProjectDTO{
    id: string;
    name: string;
    description: string;
    teamId: string;
  }


const Token = localStorage.getItem('token')
export const AddNewProjectAPI = async (data: any): Promise<ProjectDTO | null> => {
    try {
        const response = await api.post('/api/v1/users/project', data, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchIndividualProject = async (id: string):Promise<ProjectDTO | null> => {
    try {
        const response = await api.get('/api/v1/users/getProject', {
            params: { id: id }, // sending as query param ?id=projectId
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          });
          return response.data
    } catch (error) {
        throw error
    }
}