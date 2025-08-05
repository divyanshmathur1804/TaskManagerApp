import React, { useEffect, useState } from "react";
import teamPageStyles from './teamPageStyles.module.css'
import { AddTeamsModal } from "./AddTeamsModal";
import { fetchTeams } from "api/TeamAPI";
import {fetchProjectList} from "../../api/ProjectAPI";
import {Button} from "antd";
import {findUsers} from "../../api/UserAPI";
interface TeamDTO {
    id: string;
    name: string;
    projectIds: string[] | null;
    userIds: string[] | null;
  }
interface ProjectDTO{
    id: string;
    name: string;
    description: string;
    teamId: string;
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
export const AddTeams: React.FC = () => {
    const [isAddTeams, setIsAddTeams] = useState<boolean>(false)
    const [teams, setTeams] = useState<TeamDTO[]>([])
    const [teamSelected, setTeamSelected] = useState<boolean>(false);
    const [teamDetails, setTeamDetails] = useState<TeamDTO>();
    const [projectDetails, setProjectDetails] = useState<ProjectDTO[]>();
    const [selectedTab, setSelectedTab] = useState<number>(1);
    const [userDetails, setUserDetails] = useState<UserProfileDTO[]>();
    
    function handleClick(){
        setIsAddTeams(true)
    }

    async function fetchProjectDetails(projectId:string[] | undefined | null){
        if (!projectId) return;
        const response = await fetchProjectList(projectId);
        if (response){
            setProjectDetails(response)
        }
    }

    async function fetchuserDetails(userId:string[] | undefined | null){
        if (!userId) return;
        const response = await findUsers(userId);
        if (response){
            setUserDetails(response)
        }
    }

    useEffect(() => {
        async function fetchMyTeams(){
            const res = await fetchTeams()
            console.log(res)
            if (res) {
                setTeams(res)
            }

        }

        fetchMyTeams()
    },[])

    useEffect(() => {
        fetchProjectDetails(teamDetails?.projectIds);
        fetchuserDetails(teamDetails?.userIds);
    }, [teamDetails]);

    function handleTeamClick(team: TeamDTO){
        setTeamSelected(true)
        setTeamDetails(team);


    }
    return(
        <>
        <div className={`${teamPageStyles.mainContainer}`}>
            <div className={`${teamPageStyles.sideContainer}`}>
                <div className={`${teamPageStyles.WorkSpaceTitle}`}>
                    <p>Your Teams</p>
                    <hr/>
                    <div className={`${teamPageStyles.ProjectContainer}`}>
                    
                    {teams && 
                    <div className={`${teamPageStyles.InnerProjectContainer}`}> 
                    <ul>
                    {teams.map((team) => (
                        <li><button className={`${teamPageStyles.InnerProjectContainerLink}`}
                        onClick={() => handleTeamClick(team)}>{team.name}</button></li>
                    ))}    
                    </ul>
                    </div>}
                    </div>
                </div>

            </div>
            {teamSelected ?
                <div className={`${teamPageStyles.DashboardContainer}`}>
                    <div className={`${teamPageStyles.teamDetailContainer}`}>
                        <div className={`${teamPageStyles.UpperContainer}`}>
                            <h1>{teamDetails?.name}</h1>
                            <div className={`${teamPageStyles.BtnContainer}`}>
                                <button onClick={() => setSelectedTab(1)}>Projects</button>
                                <button onClick={() => setSelectedTab(2)}>Members</button>
                            </div>

                        </div>
                        <hr style={{border: '0.5px solid #0795FE',
                            width: '100%',
                        margin: '0'}}/>

                        <div className={`${teamPageStyles.lowerContainer}`}>
                            {selectedTab === 1 && projectDetails?.map(project => (
                                <div key={project.id} className={`${teamPageStyles.detailContainer}`}>
                                    <p>{project.name}</p>
                                </div>
                            ))}
                            {selectedTab === 2 && userDetails?.map(user => (
                                <div key={user.id} className={`${teamPageStyles.detailContainer}`}>
                                    <p>{user.firstName} {user.lastName}</p>
                                </div>
                            ))}
                        </div>


                    </div>


                </div>
                :<div className={`${teamPageStyles.DashboardContainer}`}>

                <div className={`${teamPageStyles.DashboardAddBtnContainer}`}>
                    <button onClick={handleClick}>Add Team</button>
                </div>

            </div>}
            {isAddTeams && <AddTeamsModal closeModal={() => setIsAddTeams(false)}/>}
            
        </div>
        
        </>
    )
}