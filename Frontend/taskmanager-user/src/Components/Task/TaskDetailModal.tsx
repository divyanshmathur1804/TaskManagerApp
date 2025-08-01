import {useNavigate, useParams} from "react-router-dom";
import { Modal } from "../Modal/Modal";
import React, { useEffect, useState } from "react";
import {fetchIndividualTask, UpdateTask} from "api/task.api";
import { fetchIndividualUserById } from "api/UserAPI";
import UserAvatar from "Common/Avatar";
import { EditableFieldTask } from "./EditableFieldTask";
import taskDetailStyles from './TaskDetail.module.css';
import { Select } from "antd";
import deleteIcon from '../../assets/logo/delete.svg'
import {ConfirmDeleteModal} from "./confirmDeleteModal";


const { Option } = Select;

interface TaskDTO {
    id: string;
    taskName: string;
    taskDesc: string;
    priority: string;
    projectId: string;
    userId: string[];
    code: string;
    status: 'todo' | 'inProgress' | 'review' | 'done';
}

interface UserProfileDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profileImageURL: string;
    headerImageURL: string;
    jobTitle: string;
    department: string;
    location: string;
}

type TaskEditableFields = {
    taskId: string;
    taskName: string;
    taskDesc: string;
    priority: string;
    status: 'todo' | 'inProgress' | 'review' | 'done' | '';
};

export const TaskDetailModal: React.FC = () => {
    const { id } = useParams();
    const [task, setTask] = useState<TaskDTO | null>(null);
    const [taskUsers, setTaskUsers] = useState<{ [taskId: string]: UserProfileDTO[] }>({});
    const [taskData, setTaskData] = useState<TaskEditableFields>({
        taskId: '',
        taskName: '',
        taskDesc: '',
        priority: '',
        status: '',
    });
    const [isConfirmDeleteModal, setConfirmDeleteModal] = useState<boolean>(false);



    const navigate = useNavigate();

    async function fetchUser(userId: string) {
        const response: UserProfileDTO | null = await fetchIndividualUserById(userId);
        return response;
    }

    async function fetchTask(taskId: string | undefined) {
        if (!taskId) return;
        const res: TaskDTO | null = await fetchIndividualTask(taskId);
        if (res) {
            setTask(res);
            setTaskData({
                taskId: res.id,
                taskName: res.taskName,
                taskDesc: res.taskDesc,
                priority: res.priority,
                status: res.status,
            });
        }
    }

    useEffect(() => {
        fetchTask(id);
    }, [id]);

    useEffect(() => {
        const loadUsers = async () => {
            if (!task) return;

            const userMap: { [taskId: string]: UserProfileDTO[] } = {};
            const fetchPromises = task.userId.map((id) => fetchUser(id));
            const results = await Promise.all(fetchPromises);
            const validUsers = results.filter((u): u is UserProfileDTO => u !== null);
            userMap[task.id] = validUsers;

            setTaskUsers(userMap);
        };

        loadUsers();
    }, [task]);

    const handleSubmit = async () => {
        const res: TaskDTO | null = await UpdateTask(taskData)
        if (res){
            navigate('/dashboard');
        }



    };

    function closeModal(){
        navigate('/dashboard');
    }

    function confirmDelete(){
        setConfirmDeleteModal(true);
    }

    return (
        <Modal
            centered
            open={true}
            size="large"
            destroyOnClose={true}
            onCancel={closeModal}
            onOk={handleSubmit}
            okText="Update Task"
        >
            <h1 style={{ marginBottom: '0' }}>
                {task?.code}
                <EditableFieldTask
                    value={taskData.taskName}
                    onSave={(value) => setTaskData(prev => ({ ...prev, taskName: value }))}
                    isDesc={false}
                />
            </h1>

            <div className={taskDetailStyles.priorityContainer}>
                <h3 style={{ backgroundColor: 'bisque', padding: '4px', borderRadius: '4px' }}>
                    {taskData.priority}
                </h3>

                <Select
                    className={taskDetailStyles.selectContainer}
                    value={taskData.status}
                    onChange={(value) => setTaskData(prev => ({ ...prev, status: value }))}
                >
                    <Option value="todo">To-do</Option>
                    <Option value="inProgress">In Progress</Option>
                    <Option value="review">In Review</Option>
                    <Option value="done">Done</Option>
                </Select>
                <img src={deleteIcon} style={{cursor: 'pointer'}} onClick={confirmDelete}/>
            </div>

            <div className={taskDetailStyles.descContainer}>
                <EditableFieldTask
                    value={taskData.taskDesc}
                    onSave={(value) => setTaskData(prev => ({ ...prev, taskDesc: value }))}
                    isDesc={true}
                />
            </div>

            <div className={taskDetailStyles.imageContainer}>
                {task && taskUsers[task.id]?.length ? (
                    taskUsers[task.id].map((user) =>
                        user.profileImageURL ? (
                            <img
                                key={user.id}
                                src={user.profileImageURL}
                                width={40}
                                height={40}
                                style={{ borderRadius: '50%' }}
                            />
                        ) : (
                            <UserAvatar key={user.id} name={user.firstName} />
                        )
                    )
                ) : (
                    <p>Loading users...</p>
                )}
            </div>
            {isConfirmDeleteModal && <ConfirmDeleteModal id = {task?.id} onClose = {setConfirmDeleteModal}/>}
        </Modal>
    );
};
