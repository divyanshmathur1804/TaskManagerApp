import { log } from "console";
import { Modal } from "Components/Modal/Modal";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import formStyles from "./UserSignup.module.css";
import { AddUser, AuthUser, AuthUserWithToken } from "api/AuthAPI";
import { useTaskManagerContext } from "Context/TaskManagerContext";

interface FormValues {
  username: string;
  password: string;
}

export const UserAuth: React.FC = () => {
  const {setIsAuthenticated} = useTaskManagerContext()
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
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await AuthUserWithToken(token);
          if (res) {
            setIsAuthenticated(true); // If token is valid, authenticate the user
            navigate('/dashboard')
          } else {
            setIsAuthenticated(false); // If token is invalid, ensure the user is not authenticated
          }
        } catch (error) {
          console.error("Error during token validation", error);
          setIsAuthenticated(false); // In case of error, set as not authenticated
        }
      }
    }

    getUser();
  }, [setIsAuthenticated]);
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
              {...register("password", { required: "Password is required" })} type="password"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};
