import { useParams } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import React, { useEffect, useState } from "react";
import { fetchIndividualTask } from "api/task.api";
import { fetchIndividualUserById } from "api/UserAPI";
import UserAvatar from "Common/Avatar";
import { EditableField } from "Components/ProfileSettings/EditableField";
import { EditableFieldTask } from "./EditableFieldTask";

interface TaskDTO {
    id:string;
    taskName:string;
    taskDesc:string;
    priority:string;
    projectId:string;
    userId:string[];
    code:string;
    status: 'todo' | 'inProgress' | 'review' | 'done';
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
export const TaskDetailModal: React.FC = () => {
    const [task, setTask] = useState<TaskDTO | null>(null)
    const {id} = useParams();
    const [taskUsers, setTaskUsers] = useState<{ [taskId: string]: UserProfileDTO[] }>({});
    const [taskName, setTaskName] = useState<String>('')

    async function fetchUser(userId: string) {
        const response: UserProfileDTO | null = await fetchIndividualUserById(userId);
        return response;
      }
    
    async function fetchTask(id: string | undefined) {
        if(!id) return;
        const res: TaskDTO| null = await fetchIndividualTask(id)
        if(res){
            setTask(res)
        }
    }

    useEffect(() => {

        fetchTask(id)


    },[])
    useEffect(() => {
        const loadUsers = async () => {
          if (!task) return;
    
          const userMap: { [taskId: string]: UserProfileDTO[] } = {};
    
            const fetchPromises = task.userId.map((id) => fetchUser(id));
            const results = await Promise.all(fetchPromises);
            const validUsers = results.filter((u): u is UserProfileDTO => u !== null);
            userMap[task.id] = validUsers;
          
    
          setTaskUsers(userMap);
        };
    
        loadUsers();
      }, [task]);
    return (
        <Modal
              centered
              open={true}
              size="large"
              destroyOnClose={true}
            //   onCancel={closeModal}
            //   onOk={() => handleSubmit(onSubmit)()}
              okText="Update Task"
            >
              <h1>
                {task?.code}
                    <EditableFieldTask
              value={task?.taskName || ''}
              onSave={setTaskName}/>

              </h1>
              
                
                <div>
                <h3>{task?.priority}</h3>
                    
                <p>{task?.status}</p>

                </div>
                <p>{task?.taskDesc}</p>
                <div>

                     {task && taskUsers[task.id]?.map(user => (
                     user.profileImageURL ? <img src= {user.profileImageURL} width={40} height={40} style={{borderRadius: '50%'}} /> : <UserAvatar key={user.id} name={user.firstName} />
                    )) || <p>Loading users...</p>}
                </div>
                
                
                </Modal>
    )
}