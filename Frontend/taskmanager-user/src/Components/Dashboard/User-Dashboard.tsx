import React, { useEffect, useState } from "react";
import DashboardStyles from './Dashboard.module.css'
import { AddNewProject } from "Components/Projects/AddNewProject";
import { Link } from "react-router-dom";
import { PendingCard } from "./PendingCard";
import { fetchProjects } from "api/UserAPI";
import taskImage from '../../assets/logo/taskManagerIcon.svg'
import { IndividualProjectPage } from "Components/Projects/IndividualProjectPage";


interface ProjectDTO{
    id: string;
    name: string;
    description: string;
    teamId: string;
  }
export const UserDashboard: React.FC = () => {
    const [addProject, setAddProject] = useState<Boolean>(false)
    const [projects, setProjects] = useState<ProjectDTO[] | null>([])
    const [selectedProject, setSelectedProject] = useState<string | null>(null)

    const URL: any = new URLSearchParams(window.location.search)

    function handleAddProject(){
        URL.set('project', selectedProject)
        setAddProject(true);
    }

    useEffect(() => {
        async function fetchAllProjects() {
            const res = await fetchProjects()
            if(res){
                setProjects(res);
            }
        }
        fetchAllProjects();
    },[])

    function handleProjectClick(value: string){
        setSelectedProject(value)

    }
    return(
        <>
        <div className={`${DashboardStyles.mainContainer}`}>
            <div className={`${DashboardStyles.sideContainer}`}>
                <div className={`${DashboardStyles.WorkSpaceTitle}`}>
                    <p>WorkSpaces</p>
                    <hr/>
                    <div className={`${DashboardStyles.ProjectContainer}`}>
                    {projects &&
                    <div className={`${DashboardStyles.InnerProjectContainer}`}> 
                    <ul>
                    {projects.map((project) => (
                        <li><button className={`${DashboardStyles.InnerProjectContainerLink}`}
                        onClick={() => handleProjectClick(project.id)}>{project.name}</button></li>
                    ))}    
                    </ul>
                    </div>}
                    </div>
                </div>

            </div>
            <div className={`${DashboardStyles.DashboardContainer}`}>
                <div className={`${DashboardStyles.DashboardCardContainer}`}>
                <div style={{display : 'flex', width : '100%',height: '100%'}}>
                <div className={`${DashboardStyles.CardTaskImage}`} >
                        <img src={taskImage}/>
                        <h2>Task Manager App</h2>
                    </div>
                    <div className={`${DashboardStyles.DashboardInnerCardContainer}`}>
                    
                        <PendingCard/>
                    
                    </div>
                    </div>
                    <div className={`${DashboardStyles.MyTeamsBtn}`}>
                        <Link className={`${DashboardStyles.MyTeamsBtnLink}`} to={'/teams'}>My teams</Link>
                    </div>
                    
                </div>
                {selectedProject != null ? <IndividualProjectPage id={selectedProject}/> :<div className={`${DashboardStyles.DashboardAddBtnContainer}`}>
                    <p>Select a Project to Start or ,</p>
                    <button onClick={handleAddProject}> + Add Project</button>
                </div>}
                

            </div>
            {addProject && <AddNewProject closeModal={() => setAddProject(false)} />}
        </div>
        
        </>
    )

    


}
