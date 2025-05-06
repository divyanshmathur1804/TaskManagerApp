import { Modal } from "Components/Modal/Modal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import formStyles from "../Auth/UserSignup.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { AddNewProjectAPI } from "api/ProjectAPI";
import { findUserByEmail } from "api/UserAPI";
import { Button } from "antd";
import { AddNewTeam, AddTeamMember } from "api/TeamAPI";


interface FormValues {
    name : String;
    description : String;
  }

  interface ModalValues{
    closeModal : () => void
  }
  interface UserDTO {
    id: number;
    firstName: string;
    email: string;
  }
  interface TeamDTO {
    id: string;
    name: string;
    projectIds: string[] | null;
    userIds: string[] | null;
  }
export const AddTeamsModal: React.FC<ModalValues> = ({closeModal}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormValues>();

      
      const [searchTerm, setSearchTerm] = useState("");
      const [users, setUsers] = useState<UserDTO | null>(null);
      
      const TeamMember: UserDTO[] = [];
       
    
      async function onSubmit(data: FormValues){
        try {
          const res: TeamDTO | null = await AddNewTeam(data)
          console.log(res)

          if(res){
            for (const user of TeamMember) {
              const payload = {
                teamId: res.id,
                userId: user.id
              };
            const response = await AddTeamMember(payload)
            console.log(response)
            if (response) {
              closeModal();
            }   

          }
          
        } 
      }catch (error) {
          throw error
        }
        

      

    }

    function handleAddUser(users:UserDTO){
      TeamMember.push(users)
      console.log(TeamMember)

    }

    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        if (searchTerm.trim() !== "") {
          fetchUsersByEmail(searchTerm);
        } else {
          setUsers(null);
        }
      }, 500); // debounce delay
  
      return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const fetchUsersByEmail = async (email: string) => {
      try {
        const users: UserDTO | null = await findUserByEmail(email);
        console.log(users)
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };


    return (
        <Modal
    centered
        open={true}
        size="medium"
        destroyOnClose={true}
        onCancel={closeModal}
        onOk={() => handleSubmit(onSubmit)()}
        okText="Add Team">
            <form className={`${formStyles.formContainer}`}>
          <div className={`${formStyles.fieldsContainer}`}>
            <label>Team Name</label>
            <input
              {...register("name", { required: "Title is required" })}
            />
            
            <input
            type="text"
            placeholder="Search by email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "8px", width: "300px", marginBottom: "10px" }}
      />
      <ul>
      {users ? (
  <div>
    <p>Name: {users.firstName}</p>
    <p>Email: {users.email}</p>
    <Button onClick={()=>handleAddUser(users)}>Add</Button>
  </div>
) : (
  <p>No user found</p>
)}
      </ul>
      
          </div>
        </form>

    </Modal>

    )
    
}