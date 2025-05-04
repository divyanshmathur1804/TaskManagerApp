import { log } from "console";
import { Modal } from "Components/Modal/Modal";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import formStyles from "./UserSignup.module.css";
import { AddUser, AuthUser, AuthUserWithToken } from "api/AuthAPI";

interface FormValues {
  username: string;
  password: string;
}

export const UserAuth: React.FC = () => {
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
      await AuthUser(data);
      navigate("/");
    }
  }

  useEffect(() => {
    async function getUser() {
        if (localStorage.getItem("token")) {
            try {
                await AuthUserWithToken(localStorage.getItem('token'))
                navigate("/dashboard") 
            } catch (error) {
                throw error
            }
            
            
        }
    }

    getUser();
    
  }, [localStorage.getItem('token')]);
  return (
    <>
      <Modal
        centered
        open={true}
        size="medium"
        destroyOnClose={true}
        onCancel={handleOnClose}
        onOk={() => handleSubmit(onSubmit)()}
        okText="Login"
      >
        <form className={`${formStyles.formContainer}`}>
          <div className={`${formStyles.fieldsContainer}`}>
            <label>Username</label>
            <input
              {...register("username", { required: "Username is required" })}
            />
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
