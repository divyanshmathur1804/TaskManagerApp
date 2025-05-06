import ProjectImg from '../../assets/logo/stopwatch 1.svg'
import TaskImg from '../../assets/logo/task 1.svg'
import TeamsImg from '../../assets/logo/meeting 1.svg'
import PendingCardStyles from './PendingCard.module.css'
import { useEffect, useState } from 'react'
import { fetchProjects } from 'api/UserAPI'
import { fetchTeams } from 'api/TeamAPI'
export const PendingCard: React.FC = () => {
    const [projectCount, setProjectCount] = useState<number>(0)
    const [TeamsCount, setTeamsCount] = useState<number>(0)
    
    useEffect(() => {
            async function fetchAllProjects() {
                const res = await fetchProjects()
                if(res){
                    setProjectCount(res.length)
                }
            }
            fetchAllProjects();
        },[])

        useEffect(() => {
                async function fetchMyTeams(){
                    const res = await fetchTeams()
                    console.log(res)
                    if (res) {
                        setTeamsCount(res.length)
                    }
        
                }
        
                fetchMyTeams()
            },[])
    return (
        <>
        <div className={`${PendingCardStyles.PageContainer}`}>
        <div className={`${PendingCardStyles.MainContainer}`}>
            <img src={ProjectImg}/>
            <div className={`${PendingCardStyles.TextContanier}`}>
                <p>Projects</p>
                <h3>{projectCount}</h3>
            </div>

        </div>
        <div className={`${PendingCardStyles.MainContainer}`}>
            <img src={TaskImg}/>
            <div className={`${PendingCardStyles.TextContanier}`}>
                <p>Tasks</p>
                <h3>0</h3>
            </div>

        </div>
        <div className={`${PendingCardStyles.MainContainer}`}>
            <img src={TeamsImg}/>
            <div className={`${PendingCardStyles.TextContanier}`}>
                <p>Teams</p>
                <h3>{TeamsCount}</h3>
            </div>

        </div>
        </div>
        </>
    )
} 