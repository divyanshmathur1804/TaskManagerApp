import { fetchIndividualProject } from "api/ProjectAPI";
import React, { useEffect, useState } from "react";
import PageStyles from './IndividualProject.module.css'
import { fetchProjectTeam } from "api/TeamAPI";
import { AddTaskModal } from "Components/Task/AddTaskModal";

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

export const IndividualProjectPage: React.FC<ProjectProp> = ({id}) => {
    const [project, setProject] = useState<ProjectDTO | null>(null)
    const [team, setTeam] = useState<TeamDTO | null>(null)
    const [clicked, setIsClicked] = useState<boolean>(false)

    function handleClick(){
      setIsClicked(true)

    }

    function handleCloseModal() {
      setIsClicked(false)
    }

    


    useEffect(() => {
       async function fetchProject(){
            const response : ProjectDTO | null = await fetchIndividualProject(id)
            console.log(response)
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
  return (
    <>
    <div className={`${PageStyles.mainContainer}`}>
    <div className={`${PageStyles.projectBar}`}>
    <div className={`${PageStyles.projectBarTextContainer}`}>
      <h1>{project?.name}</h1>
      <p>This is the individual project page.</p>
      </div>
      <div className={`${PageStyles.projectBarbtnContainer}`}>
      <h3>Team: {team?.name} </h3>
      <button onClick={handleClick} >+ Create Task</button>
      </div>
      </div>
      <hr style={{ border: '1px solid #FFB726', margin: '0.5rem 0' }} />

      {clicked && <AddTaskModal closeModal={handleCloseModal} team = {team} projectId={project?.id}/>}

      
    </div>
    </>
  );
};
