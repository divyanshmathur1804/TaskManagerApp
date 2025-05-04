import { log } from "console";
import { Modal } from "Components/Modal/Modal";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import formStyles from "./UserSignup.module.css";
import { AddUser } from "api/AuthAPI";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const UserSignup: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  function handleOnClose() {
    navigate("/");
  }
  async function onSubmit(data: FormValues) {
    if (data) {
      await AddUser(data);
      navigate("/");
    }
  }
  return (
    <>
      <Modal
        centered
        open={true}
        size="medium"
        destroyOnClose={true}
        onCancel={handleOnClose}
        onOk={() => handleSubmit(onSubmit)()}
        okText="Sign Up"
      >
        <form className={`${formStyles.formContainer}`}>
          <div className={`${formStyles.fieldsContainer}`}>
            <label>First Name</label>
            <input
              {...register("firstName", { required: "First name is required" })}
            />
            <label>Last Name</label>
            <input
              {...register("lastName", { required: "Last name is required" })}
            />
            <label>Email</label>
            <input {...register("email", { required: "Email is required" })} />
            <label>Password</label>
            <input
              {...register("password", { required: "Password is required" })}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};
