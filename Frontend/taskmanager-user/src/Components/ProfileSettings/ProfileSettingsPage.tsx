import React, { useContext, useEffect, useRef, useState } from "react";
import profileSettingsStyles from "./ProfileSettingsStyles.module.css";
import cameraIcon from "../../assets/logo/camera 1.svg";
import {
  fetchIndividualUser,
  getUserWithProfile,
  UpdateUser,
  UpdateUserHeader,
  UpdateUserProfile,
} from "api/UserAPI";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { log } from "console";
import { EditableField } from "./EditableField";
import { TaskManagerContext, useTaskManagerContext } from "Context/TaskManagerContext";
import { Loader } from "Components/Loader/Loader";

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

interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export const ProfileSettingsPage: React.FC = () => {
  const headerInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false)

  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfileDTO | null>(null);
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [jobTitle, setJobTitle] = useState<string>('')
  const [department, setDepartment] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [userData, setUserData]= useState({
    firstName : '',
    lastName : '',
    jobTitle: '',
    department: '',
    location: '',
    
  })


  async function handleUpdate(){
    setUserData((prev) => (
      {
        ...prev,
        firstName: firstName,
        lastName: lastName,
        jobTitle: jobTitle,
        department: department,
        location: location
      }
    ))

    const res: UserProfileDTO | null = await UpdateUser(userData)
    if (res) {
      console.log(res);
      
    }


  }

  
  

  

  async function fetchUser() {
    setLoading(true)
    const res: UserProfileDTO | null = await fetchIndividualUser();
    if (res) {
      setUser(res);
      setProfileImage(() => res.profileImageURL);
      setHeaderImage(() => res.headerImageURL);
    }
    setLoading(false)
  }

  

  useEffect(() => {
    fetchUser();
  }, []);

  // Upload image file to Firebase Storage and return URL
  const uploadImageToFirebase = async (
    file: File,
    path: string
  ): Promise<string | null> => {
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      console.log(downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Firebase upload error:", error);
      return null;
    }
  };

  // Handle file input change: preview locally and upload to Firebase
  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    storagePath: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show local preview immediately

      // Upload to Firebase Storage
      const uploadedUrl = await uploadImageToFirebase(file, storagePath);
      if (uploadedUrl && uploadedUrl.includes("profileImages")) {
        await UpdateUserProfile(uploadedUrl);
      } else if (uploadedUrl && uploadedUrl.includes("headerImages")) {
        await UpdateUserHeader(uploadedUrl);
      }
    }
  };

  const handleHeaderClick = () => headerInputRef.current?.click();
  const handleProfileClick = () => profileInputRef.current?.click();

  return (
    <div className={profileSettingsStyles.OuterContainer}>
      {loading ? <Loader/> : <div className={profileSettingsStyles.mainContainer}>
        <h1>Profile Settings</h1>
        <hr
          style={{ border: "1px solid #579DFF", width: "50%", marginLeft: "0" }}
        />
        <p>Manage your personal information and update your profile.</p>
        <h3>Profile photo and header image</h3>

        <div className={profileSettingsStyles.profileHeader}>
          {/* Header Image Section */}
          <div className={profileSettingsStyles.headerImage}>
            {headerImage && (
              <img
                src={headerImage}
                alt="Header Preview"
                className={profileSettingsStyles.headerImage}
              />
            )}
            <div
              className={profileSettingsStyles.headerOverlay}
              onClick={handleHeaderClick}
              role="button"
              aria-label="Upload header image"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleHeaderClick()}
            >
              <div className={profileSettingsStyles.overlayContent}>
                <span>Add your header image</span>
              </div>
            </div>
            <input
              type="file"
              ref={headerInputRef}
              accept="image/*"
              className={profileSettingsStyles.hiddenInput}
              onChange={(e) =>
                handleImageChange(
                  e,
                  setHeaderImage,
                  `headerImages/${user?.id || "default"}-${Date.now()}`
                )
              }
            />
          </div>

          {/* Profile Image Section */}
          <div
            className={profileSettingsStyles.profileImageContainer}
            onClick={handleProfileClick}
            role="button"
            aria-label="Upload profile image"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleProfileClick()}
          >
            <div className={profileSettingsStyles.profileImage}>
              {profileImage ? (
                <img src={profileImage} alt="Profile Preview" className={profileSettingsStyles.profilePhoto} />
              ) : (
                user?.firstName.charAt(0)
              )}
              <div className={profileSettingsStyles.profileOverlay}>
                <img src={cameraIcon} alt="Camera Icon" />
              </div>
            </div>
            <input
              type="file"
              ref={profileInputRef}
              accept="image/*"
              className={profileSettingsStyles.hiddenInput}
              onChange={(e) =>
                handleImageChange(
                  e,
                  setProfileImage,
                  `profileImages/${user?.id || "default"}-${Date.now()}`
                )
              }
            />
          </div>
        </div>
        <h3>About you</h3>
        
        <div className={profileSettingsStyles.AboutSection}>
          
          <div className= {profileSettingsStyles.AboutSection2}>
            
            <EditableField
        label="First name"
       value={user?.firstName || ''}
      onSave={setFirstName}
     />
<EditableField
  label="Last name"
  value={user?.lastName || ''}
  onSave={setLastName}
/>
<EditableField
  label="Job title"
  value={user?.jobTitle || ''}
  onSave={setJobTitle}
/>

          </div>

<div className= {profileSettingsStyles.AboutSection2}>
            <EditableField
  label="Department"
  value={user?.department || ''}
  onSave={setDepartment}
/>
<EditableField
  label="Location"
  value={user?.location || ''}
  onSave={setLocation}
/>

<button className= {profileSettingsStyles.updatebtn} onClick={handleUpdate}>Update Profile</button>

          </div>
          
          


        </div>
        <h3>Contact</h3>
        <div style={{marginBottom: '10px'}}>
          <h4>Email</h4>
          <p>{user?.email}</p>
        </div>
      </div>}
      
    </div>
  );
};
