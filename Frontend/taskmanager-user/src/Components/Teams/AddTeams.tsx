import React, { useEffect, useState } from "react";
import teamPageStyles from './teamPageStyles.module.css'
import { AddTeamsModal } from "./AddTeamsModal";
import { fetchTeams } from "api/TeamAPI";
interface TeamDTO {
    id: string;
    name: string;
    projectIds: string[] | null;
    userIds: string[] | null;
  }
export const AddTeams: React.FC = () => {
    const [isAddTeams, setIsAddTeams] = useState<boolean>(false)
    const [teams, setTeams] = useState<TeamDTO[]>([])
    const [teamSelected, setTeamSelected] = useState<boolean>(false);
    
    
    function handleClick(){
        setIsAddTeams(true)
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

    function handleTeamClick(Id: string){
        setTeamSelected(true)

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
                        onClick={() => handleTeamClick(team.id)}>{team.name}</button></li>
                    ))}    
                    </ul>
                    </div>}
                    </div>
                </div>

            </div>
            {teamSelected ?
                <div className={`${teamPageStyles.DashboardContainer}`}>


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