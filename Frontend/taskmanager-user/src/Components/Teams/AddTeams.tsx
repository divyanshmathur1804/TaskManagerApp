import React, { useEffect, useState } from "react";
import DashboardStyles from '../Dashboard/Dashboard.module.css'
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
    return(
        <>
        <div className={`${DashboardStyles.mainContainer}`}>
            <div className={`${DashboardStyles.sideContainer}`}>
                <div className={`${DashboardStyles.WorkSpaceTitle}`}>
                    <p>Your Teams</p>
                    <hr/>
                    {teams && 
                    <ul>
                        {teams.map((team)=>(
                            <li>
                                {team.name}
                            </li>

                        )
                            

                        )}
                        </ul>}
                </div>

            </div>
            <div className={`${DashboardStyles.DashboardContainer}`}>
                <div className={`${DashboardStyles.DashboardCardContainer}`}>
                    pending card
                </div>
                <div className={`${DashboardStyles.DashboardAddBtnContainer}`}>
                    <button onClick={handleClick}>Add Team</button>
                </div>

            </div>
            {isAddTeams && <AddTeamsModal closeModal={() => setIsAddTeams(false)}/>}
            
        </div>
        
        </>
    )
}