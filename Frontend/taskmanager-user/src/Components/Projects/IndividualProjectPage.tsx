import { fetchIndividualProject } from "api/ProjectAPI";
import React, { useEffect, useState } from "react";
import PageStyles from './IndividualProject.module.css'
import { fetchProjectTeam } from "api/TeamAPI";
import { AddTaskModal } from "Components/Task/AddTaskModal";
import { TaskCard } from "Components/Task/TaskCard";
import { findUsers } from "api/UserAPI";
import UserAvatar from "Common/Avatar";

interface ProjectProp{
    id : string
}
interface ProjectDTO{
    id: string;
    name: string;
    description: string;
    teamId: string;
  }
  interface TeamDTO {
    id: string;
    name: string;
    projectIds: string[] | null;
    userIds: string[] | null;
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

export const IndividualProjectPage: React.FC<ProjectProp> = ({id}) => {
    const [project, setProject] = useState<ProjectDTO | null>(null)
    const [team, setTeam] = useState<TeamDTO | null>(null)
    const [clicked, setIsClicked] = useState<boolean>(false)
    const [members, setMembers] = useState<UserProfileDTO[] | null>(null)

    function handleClick(){
      setIsClicked(true)

    }

    function handleCloseModal() {
      setIsClicked(false)
    }

    


    useEffect(() => {
       async function fetchProject(){
            const response : ProjectDTO | null = await fetchIndividualProject(id)
        if (response) {
            setProject(response)
        }
    }
    fetchProject()

    },[id])

    useEffect(() => {
      
      const fetchTeam = async () => {
        if (!project?.teamId) return;
    
        try {
          const response: TeamDTO | null = await fetchProjectTeam(project.teamId);
    
          if (response) {
            setTeam(response)
          }
        } catch (error) {
          console.error('Error fetching team:', error);
        }
      };
    
      if (project) {
        fetchTeam();
      }
     
 
     },[project])

     useEffect(() => {
      const fetchUsers = async () => {
        if (!team?.userIds) return;
    
        try {
          const response: UserProfileDTO[] | null = await findUsers(team?.userIds);
    
          if (response) {
            setMembers(response)
          }
        } catch (error) {
          console.error('Error fetching team:', error);
        }
      };
    
      if (team) {
        fetchUsers();
      }
     
     },[team])
  return (
    <>
    <div className={`${PageStyles.mainContainer}`}>
    <div className={`${PageStyles.projectBar}`}>
    <div className={`${PageStyles.projectBarTextContainer}`}>
      <h1>{project?.name}</h1>
      <p>This is the individual project page.</p>
      </div>
      <div className={`${PageStyles.projectBarbtnContainer}`}>
      <div style={{width : 'auto', display: 'flex', alignItems: 'center', gap: '-8px',marginTop: '20px'}}>
      {members && members.map((member) => (
        
        member.profileImageURL ? <img src={member.profileImageURL} style={{width: '40px', height: '40px', borderRadius: '50%'}}/> :<UserAvatar name={member.firstName}/>
      ))} 
      </div>
      <div>
      <button onClick={handleClick} >+ Create Task</button>
      </div>
      </div>
      </div>
      <hr style={{ border: '1px solid #FFB726', margin: '0.5rem 0' }} />
      <div className={`${PageStyles.TaskCardContainer}`}>
      {project && <TaskCard projectId={project.id}/> }  
      </div>

      {clicked && <AddTaskModal closeModal={handleCloseModal} team = {team} projectId={project?.id}/>}

      
    </div>
    </>
  );
};
