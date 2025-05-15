import React, { useEffect, useState } from "react";
import taskCardStyles from './TaskCard.module.css';

import GreyCircle from '../../assets/logo/Grey_Circle.svg';
import BlueCircle from '../../assets/logo/Blue_Circle.svg';
import OrangeCircle from '../../assets/logo/Orange_Circle.svg';
import GreenCircle from '../../assets/logo/Green_Circle.svg';

import { fetchAllTasks } from "api/task.api";
import { fetchIndividualUserById } from "api/UserAPI";

import UserAvatar from "Common/Avatar";
import { Select } from "antd";

interface TaskDTO {
  id: number;
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
}

export const TaskCard: React.FC<PropValue> = ({ projectId }) => {
  const [tasks, setTasks] = useState<TaskDTO[] | null>(null);
  const [taskUsers, setTaskUsers] = useState<{ [taskId: string]: UserDTO[] }>({});

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
      <div className={taskCardStyles.Header}>
        <p><img src={GreyCircle} alt="To-do" /> To-do</p>
        <p><img src={BlueCircle} alt="In progress" /> In progress</p>
        <p><img src={OrangeCircle} alt="In Review" /> In Review</p>
        <p><img src={GreenCircle} alt="Done" /> Done</p>
      </div>

      <div className={taskCardStyles.mainCardContainer}>
        {tasks && tasks.map((task) => (
          <div key={task.id} className={`${task.status === 'todo' ? taskCardStyles.TodoCardContainer
            : task.status === 'inProgress' ? taskCardStyles.TodoCardContainer
            : task.status === 'review' ? taskCardStyles.TodoCardContainer
            : task.status == 'done' ? taskCardStyles.TodoCardContainer
            : ''

          }`}>
            <div className={taskCardStyles.TodoInnerCardContainer}>
              <div style={{display: 'flex', gap: '50px', alignItems: 'center'}}>
                {/* Priority Indicator */}
              {task.priority === 'high' && (
                <div className={taskCardStyles.TodoPriorityHigh}>
                  <li><span className={taskCardStyles.TodoPriorityHighDot}></span>{task.priority}</li>
                </div>
              )}
              {task.priority === 'medium' && (
                <div className={taskCardStyles.TodoPriorityMedium}>
                  <li><span className={taskCardStyles.TodoPriorityMediumDot}></span>{task.priority}</li>
                </div>
              )}
              {task.priority === 'low' && (
                <div className={taskCardStyles.TodoPriorityLow}>
                  <li><span className={taskCardStyles.TodoPriorityLowDot}></span>{task.priority}</li>
                </div>
              )}
              <div className={taskCardStyles.selectContainer}>
                    <Select style={{width: '100px', position: 'relative'  }}>
                      <Option value = 'to do'>To-DO</Option>

                    </Select>
                  </div>

              </div>

              

              {/* Task Info */}
              <div className={taskCardStyles.DataContainer}>
                <h3>{task.code} - {task.taskName}</h3>
                <p>{task.taskDesc}</p>
                <hr />
                <div className={taskCardStyles.UserContainer}>
                  <div className={taskCardStyles.UserContainerAvatar}>
                  {taskUsers[task.id] && taskUsers[task.id].length > 0 ? (
                    taskUsers[task.id].map((user) => (
                      <UserAvatar key={user.id} name={user.firstName} />
                    ))
                  ) : (
                    <p>Loading users...</p>
                  )}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
