import React, { useEffect, useState } from "react";
import { Modal } from "Components/Modal/Modal";
import { Controller, useForm } from "react-hook-form";
import formStyles from "./formStyles.module.css";
import { Select } from "antd";
import { findUsers } from "api/UserAPI";
import { addTask } from "api/task.api";

interface TeamDTO {
  id: string;
  name: string;
  projectIds: string[] | null;
  userIds: string[] | null;
}

interface ModalProps {
  closeModal: () => void;
  team: TeamDTO | null;
  projectId?: string;
}

interface FormValues {
  taskName: string;
  taskDesc: string;
  priority: string;
  userId: string[]; // Just collect user IDs, not the full objects
  code : string
}

interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface TaskDTO {
    id:number;
    taskName:string;
    taskDesc:string;
    priority:string;
    projectId:string;
    userId:string[];
    code:string
  }

export const AddTaskModal: React.FC<ModalProps> = ({ closeModal, team, projectId }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      priority: "high",
      userId: [], // empty by default
    },
  });

  const [users, setUsers] = useState<UserDTO[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const { Option } = Select;

  async function onSubmit(data: FormValues) {
    try {
       const response = await addTask(data,projectId)
       if (response) {
        closeModal();
       } 
    } catch (error) {
        throw error
    }
      
    }

  useEffect(() => {
    async function fetchUserList() {
      if (team && team.userIds) {
        setLoading(true);
        try {
          const response: UserDTO[] | null = await findUsers(team.userIds);
          if (response) {
            setUsers(response);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchUserList();
  }, [team]);

  return (
    <Modal
      centered
      open={true}
      size="large"
      destroyOnClose={true}
      onCancel={closeModal}
      onOk={() => handleSubmit(onSubmit)()}
      okText="Create"
    >
      <div className={formStyles.mainContainer}>
        <form className={formStyles.formContainer}>
          <div className={formStyles.fieldsContainer}>
            <label>Title</label>
            <input {...register("taskName", { required: "Title is required" })} />
            {errors.taskName && <span>{errors.taskName.message}</span>}

            <label>Description</label>
            <input
              {...register("taskDesc", {
                required: "Description is required",
              })}
            />
            {errors.taskDesc && <span>{errors.taskDesc.message}</span>}

            <label>Priority</label>
            <Controller
              control={control}
              name="priority"
              rules={{ required: "Priority is required" }}
              render={({ field }) => (
                <Select {...field} placeholder="Select priority">
                  <Option value="high">High</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="low">Low</Option>
                </Select>
              )}
            />
            {errors.priority && <span>{errors.priority.message}</span>}

            
          </div>
          <div className={`${formStyles.fieldsContainer}`}>
          <label>Assign To</label>
            <Controller
              control={control}
              name="userId"
              rules={{ required: "Please assign at least one user" }}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="multiple"
                  placeholder="Select team members"
                  optionLabelProp="label"
                  loading={loading} // Show loading spinner
                >
                  {users &&
                    users.map((user) => (
                      <Option key={user.id} value={user.id} label={`${user.firstName} ${user.lastName}`}>
                        {user.firstName} {user.lastName} ({user.email})
                      </Option>
                    ))}
                </Select>
              )}
            />
            {errors.userId && <span>{errors.userId.message}</span>}

            <label>Code</label>
            <input {...register("code", { required: "Code is required" })} />
            {errors.code && <span>{errors.code.message}</span>}

          </div>
        </form>
      </div>
    </Modal>
  );
};
