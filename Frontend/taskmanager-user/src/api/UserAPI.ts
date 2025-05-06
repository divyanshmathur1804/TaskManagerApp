import api from "./http.api";

const Token = localStorage.getItem('token')
interface UserDTO {
    id: number;
    firstName: string;
    email: string;
  }

  interface ProjectDTO{
    id: string;
    name: string;
    description: string;
    teamId: string;
  }
export const findUserByEmail = async (email: any):  Promise<UserDTO | null> => {
    try {
        const response = await api.get(`/api/v1/users/search`, {
            params: { email },
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchProjects = async (): Promise<ProjectDTO[] | null> => {
  try {
      const response = await api.get('/api/v1/users/getProjects',{
          headers: {
              Authorization: `Bearer ${Token}`,
          },
      });
      return response.data;
  } catch (error) {
      throw error;
  }
};