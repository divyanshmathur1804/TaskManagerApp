import { Modal } from "Components/Modal/Modal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import formStyles from "../Auth/UserSignup.module.css";
import { Navigate } from "react-router-dom";
import { AddNewProjectAPI } from "api/ProjectAPI";
import { Select } from "antd";
import { AddProjectToTeam, fetchTeams } from "api/TeamAPI";

interface FormValues {
  name: String;
  description: String;
}

interface ModalProps {
  closeModal: () => void;
}
interface TeamDTO {
  id: string;
  name: string;
  projectIds: string[] | null;
  userIds: string[] | null;
}
interface ProjectDTO {
  id: string;
  name: string;
  description: string;
  teamId: string;
}

export const AddNewProject: React.FC<ModalProps> = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [isOpen, setIsOpen] = useState<boolean | undefined>(true);
  const [selected, setSelected] = useState(undefined);
  const [teams, setTeams] = useState<TeamDTO[]>([]);

  const { Option } = Select;

  async function onSubmit(data: FormValues) {
    try {
      const res: ProjectDTO | null = await AddNewProjectAPI(data);
      if (res) {
        const payload = {
          projectId: res.id,
          teamId: selected,
        };
        const response = await AddProjectToTeam(payload);
        console.log(response);
        if (response) {
          closeModal();
        }
      }
    } catch (error) {
      throw error;
    }
  }
  const handleChange = (value: any) => {
    setSelected(value);
  };

  useEffect(() => {
    async function fetchAllTeams() {
      const res = await fetchTeams();
      if (res) {
        setTeams(res);
      }
    }

    fetchAllTeams();
  }, []);
  return (
    <Modal
      centered
      open={true}
      size="medium"
      destroyOnClose={true}
      onCancel={closeModal}
      onOk={() => handleSubmit(onSubmit)()}
      okText="Create"
    >
      <form className={`${formStyles.formContainer}`}>
        <div className={`${formStyles.fieldsContainer}`}>
          <label>Title</label>
          <input {...register("name", { required: "Title is required" })} />
          <label>Description</label>
          <input
            {...register("description", {
              required: "Description is required",
            })}
          />
          <Select
            placeholder="Select Team"
            style={{ width: 200 }}
            onChange={handleChange}
            value={selected}
            allowClear
          >
            {teams &&
              teams.map((team) => <Option value={team.id}>{team.name}</Option>)}
          </Select>
        </div>
      </form>
    </Modal>
  );
};
