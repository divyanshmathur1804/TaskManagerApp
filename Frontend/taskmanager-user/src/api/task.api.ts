import api from "./http.api";

interface TaskDTO {
    id:number;
    taskName:string;
    taskDesc:string;
    priority:string;
    projectId:string;
    userId:string[];
    code:string;
    status: 'todo' | 'inProgress' | 'review' | 'done';
  }
  
const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

export const addTask = async (data: any, projectId:string|undefined): Promise<TaskDTO | null> => {
    try {
        const response = await api.post('/api/v1/users/addNewTask',data,{
            params : {projectId : projectId },
            headers: getAuthHeader(),
    
        })
        return response.data
        
    } catch (error) {
        throw error
    }
    
    
} 

export const fetchAllTasks = async (projectId:string|undefined): Promise<TaskDTO[] | null> => {
    try {
        const response = await api.get('/api/v1/users/fetchTasks',{
            params : {projectId : projectId },
            headers: getAuthHeader(),
    
        })
        return response.data
        
    } catch (error) {
        throw error
    }
    
    
} 