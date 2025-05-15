import api from "./http.api";

interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface ProjectDTO {
  id: string;
  name: string;
  description: string;
  teamId: string;
}

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const findUserByEmail = async (email: string): Promise<UserDTO | null> => {
  try {
    const response = await api.get(`/api/v1/users/search`, {
      params: { email },
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProjects = async (): Promise<ProjectDTO[] | null> => {
  try {
    const response = await api.get('/api/v1/users/getProjects', {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchIndividualUser = async (): Promise<UserDTO | null> => {
  try {
    const response = await api.get('/api/v1/users/getUser', {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findUsers = async (ids: string[] | null): Promise<UserDTO[]> => {
  try {
    if (!ids || ids.length === 0) return [];

    // Create a query string that has individual `id` parameters
    const queryParams = ids.map(id => `id=${id}`).join('&');

    // Send the request with the flattened query string
    const response = await api.get(`/api/v1/users/getUserList?${queryParams}`, {
      headers: getAuthHeader()
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchIndividualUserById = async (Id : string): Promise<UserDTO | null> => {
  try {
    const response = await api.get('/api/v1/users/getUserById', {
      params : {Id : Id},
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
