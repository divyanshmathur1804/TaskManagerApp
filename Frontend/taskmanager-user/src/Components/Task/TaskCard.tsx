import React, { useEffect, useState } from "react";
import taskCardStyles from './TaskCard.module.css';

import GreyCircle from '../../assets/logo/Grey_Circle.svg';
import BlueCircle from '../../assets/logo/Blue_Circle.svg';
import OrangeCircle from '../../assets/logo/Orange_Circle.svg';
import GreenCircle from '../../assets/logo/Green_Circle.svg';

import { fetchAllTasks, UpdateTaskStatus } from "api/task.api";
import { fetchIndividualUserById } from "api/UserAPI";

import UserAvatar from "Common/Avatar";
import { Select } from "antd";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

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

interface PropValue {
  projectId: string;
}

interface UserDTO {
 id: number;
  firstName: string;
  lastName: string;
  email: string;
  profileImageURL: string
  headerImageURL: string
  jobTitle : string
  department: string
  location: string
}

export const TaskCard: React.FC<PropValue> = ({ projectId }) => {
  const [tasks, setTasks] = useState<TaskDTO[] | null>(null);
  const [taskUsers, setTaskUsers] = useState<{ [taskId: string]: UserDTO[] }>({});

  const statusFlow = ['todo', 'inProgress', 'review', 'done'];


  const moveTask = async (taskId: string, direction: 'left' | 'right') => {
  setTasks((prev) => {
    if (!prev) return prev;

    const updatedTasks = prev.map((task) => {
      if (task.id !== taskId) return task;

      const currentIndex = statusFlow.indexOf(task.status);
      const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;

      if (newIndex < 0 || newIndex >= statusFlow.length) return task;

      return { ...task, status: statusFlow[newIndex] as TaskDTO['status'] };
    });

    return updatedTasks;
  });

  // Get new status
  const currentTask = tasks?.find(t => t.id === taskId);
  if (!currentTask) return;

  const currentIndex = statusFlow.indexOf(currentTask.status);
  const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;

  if (newIndex < 0 || newIndex >= statusFlow.length) return;

  const newStatus = statusFlow[newIndex] as TaskDTO['status'];

  // ✅ Update backend
  await UpdateTaskStatus(taskId, newStatus);
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  // Fetch a single user by ID
  async function fetchUser(userId: string) {
    const response: UserDTO | null = await fetchIndividualUserById(userId);
    return response;
  }

  const {Option} = Select

  // Fetch all tasks on mount
  useEffect(() => {
    async function fetchTasks() {
      const response: TaskDTO[] | null = await fetchAllTasks(projectId);
      if (response) {
        setTasks(response);
      }
    }
    fetchTasks();
  }, [projectId]);

  // Fetch users for each task when tasks are loaded
  useEffect(() => {
    const loadUsers = async () => {
      if (!tasks) return;

      const userMap: { [taskId: string]: UserDTO[] } = {};

      for (const task of tasks) {
        const fetchPromises = task.userId.map((id) => fetchUser(id));
        const results = await Promise.all(fetchPromises);
        const validUsers = results.filter((u): u is UserDTO => u !== null);
        userMap[task.id] = validUsers;
      }

      setTaskUsers(userMap);
    };

    loadUsers();
  }, [tasks]);

  return (
    <div className={taskCardStyles.mainContainer}>
  {/* Header with status labels */}
  <div className={taskCardStyles.Header}>
    <p><img src={GreyCircle} alt="To-do" /> To-do</p>
    <p><img src={BlueCircle} alt="In progress" /> In progress</p>
    <p><img src={OrangeCircle} alt="In Review" /> In Review</p>
    <p><img src={GreenCircle} alt="Done" /> Done</p>
  </div>

  {/* Columns */}
  <div className={taskCardStyles.mainCardContainer}>
 <div className={taskCardStyles.ColumnsWrapper}>
  {["todo", "inProgress", "review", "done"].map(status => (
    <div key={status} className={taskCardStyles.TaskColumn}>

      {tasks
        ?.filter(task => task.status === status)
        .map(task => (
          
          <div key={task.id} className={taskCardStyles.TodoCardContainer}>
            <button
              className={`${taskCardStyles.ContainerBtn} ${taskCardStyles.Left}`}
              onClick={() => moveTask(task.id, "left")}
              disabled={status === "todo"}
            >
              <LeftOutlined />
            </button>
            <Link to={`/task/${task.id}`} className={taskCardStyles.Link}>

            <div className={taskCardStyles.TodoInnerCardContainer}>
              {task.priority && (
                <div className={taskCardStyles[`TodoPriority${capitalize(task.priority)}`]}>
                  <li>
                    <span className={taskCardStyles[`TodoPriority${capitalize(task.priority)}Dot`]}></span>
                    {task.priority}
                  </li>
                </div>
              )}

              <div className={taskCardStyles.DataContainer}>
                <h3>{task.code} - {task.taskName}</h3>
                <p>{task.taskDesc}</p>
                <hr />
                <div className={taskCardStyles.UserContainer}>
                  <div className={taskCardStyles.UserContainerAvatar}>
                    {taskUsers[task.id]?.map(user => (
                     user.profileImageURL ? <img src= {user.profileImageURL} width={40} height={40} style={{borderRadius: '50%'}} /> : <UserAvatar key={user.id} name={user.firstName} />
                    )) || <p>Loading users...</p>}
                  </div>
                </div>
              </div>
            </div>
            </Link>

            <button
              className={`${taskCardStyles.ContainerBtn} ${taskCardStyles.Right}`}
              onClick={() => moveTask(task.id, "right")}
              disabled={status === "done"}
            >
              <RightOutlined />
            </button>
          </div>
          
        ))}
    </div>
  ))}
</div>
</div>

</div>
  );
};
