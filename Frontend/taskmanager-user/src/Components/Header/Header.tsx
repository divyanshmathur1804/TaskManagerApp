import React, { useEffect, useState } from "react";
import headerStyles from './Header.module.css'
import { fetchIndividualUser } from "api/UserAPI";
import Avatar from "antd/es/avatar/Avatar";
import UserAvatar from "Common/Avatar";

interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }
export const Header: React.FC = () => {
    const [user , setUser] = useState<UserDTO | null>(null)
    useEffect(() => {
        async function fetchUser() {
            const response: UserDTO | null = await fetchIndividualUser()
            if(response){
                setUser(response)
            }
        }
        fetchUser()
    },[])
    return(
        <>
        <header className={`${headerStyles.header}`}>
            <div>
                {user &&
            
            <UserAvatar name={user.firstName}/>
            
            }

            </div>
            <div>
        
            <h3>{user?.firstName} {user?.lastName}</h3>
            
            </div>
            
      
    </header>
    </>
    )
}