import React, { useEffect, useState } from "react";
import headerStyles from "./Header.module.css";
import { fetchIndividualUser } from "api/UserAPI";
import { Dropdown, Menu } from "antd";
import UserAvatar from "Common/Avatar";
import { useNavigate } from "react-router-dom";
import { ProfileSettingsPage } from "Components/ProfileSettings/ProfileSettingsPage";

interface UserProfileDTO {
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

export const Header: React.FC = () => {
  const [user, setUser] = useState<UserProfileDTO | null>(null);
  const [isProfile, setIsProfile] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const response: UserProfileDTO | null = await fetchIndividualUser();
      if (response) {
        setUser(response);
      }
    }
    fetchUser();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function handleProfile() {
    navigate("/profile-settings");
  }

  const dropdownItems = (
    <Menu>
      <Menu.Item key="1" onClick={handleProfile}>
        Profile Settings
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header className={headerStyles.header}>
      {user && (
        <Dropdown overlay={dropdownItems} trigger={["click"]}>
          <div
            className={headerStyles.userInfo}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0px",
            }}
          >
            {user.profileImageURL ? <img src={user.profileImageURL} style={{width : '40px', height: '40px', borderRadius:'50%'}}/> : <UserAvatar name={user.firstName} style={''} />}
            
            
            <h3 style={{ margin: 0 }}>
              {user.firstName} {user.lastName}
            </h3>
          </div>
        </Dropdown>
      )}
    </header>
  );
};
