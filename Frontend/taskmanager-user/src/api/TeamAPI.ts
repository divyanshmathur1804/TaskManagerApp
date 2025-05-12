import api from "./http.api";
interface TeamDTO {
    id: string;
    name: string;
    projectIds: string[] | null;
    userIds: string[] | null;
  }
const Token = localStorage.getItem('token')
export const AddNewTeam = async (data: any): Promise<TeamDTO | null> => {
    try {
        const response = await api.post('/api/v1/users/team', data, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const AddTeamMember = async (data: any): Promise<TeamDTO | null> => {
    try {
        const response = await api.post('/api/v1/users/addMember', data, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchTeams = async (): Promise<TeamDTO[] | null> => {
    try {
        const response = await api.get('/api/v1/users/getTeams',{
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const AddProjectToTeam = async (data: any): Promise<number | null> => {
    try {
        const response = await api.post('/api/v1/users/addProjectToTeam', data, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        return response.status
    } catch (error) {
        throw error;
    }
};
export const fetchProjectTeam = async (id: String | null): Promise<TeamDTO | null> => {
    try {
        const response = await api.get('/api/v1/users/getProjectTeam',{
            params: {id: id},
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};