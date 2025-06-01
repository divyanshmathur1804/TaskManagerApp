import api from "./http.api";

interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserProfileDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profileImageURL: string
  headerImageURL: string
  jobTitle : string
  department: string
  location: string
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

export const fetchIndividualUser = async (): Promise<UserProfileDTO | null> => {
  try {
    const response = await api.get('/api/v1/users/getUser', {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findUsers = async (ids: string[] | null): Promise<UserProfileDTO[]> => {
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

export const UpdateUserProfile = async (url: string): Promise<UserProfileDTO | null> => {
  try {
    const response = await api.post('/api/v1/users/updateUserProfile', url, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'text/plain',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateUserHeader = async (url: string): Promise<UserProfileDTO | null> => {
  try {
    const response = await api.post('/api/v1/users/updateUserHeader', url, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'text/plain',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getUserWithProfile = async (): Promise<UserProfileDTO | null> => {
  try {
    const response = await api.get('/api/v1/users/getUserWithProfile',{
      headers: getAuthHeader(),
    })
    return response.data
    
  } catch (error) {
    throw error
  }
}

export const UpdateUser = async (data: any): Promise<UserProfileDTO | null> => {
  try {
    const response = await api.put('/api/v1/users/updateUser', data, {
      headers: {
        ...getAuthHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};