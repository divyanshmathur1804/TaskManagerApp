import React from "react";
import Navbar from "../MainPage/Navbar";
import mainPageImage from '../../assets/logo/Main-Page-Image.svg'
import LoginIcon from '../../assets/logo/User check.svg'
import SignUpIcon from '../../assets/logo/User plus.svg'
import mainPageStyles from './mainPageStyles.module.css'
import { Link } from "react-router-dom";

export const MainPage: React.FC = () => {
    return (
        <>
        <div>
        <Navbar/>
        </div>
        <div className={`${mainPageStyles.mainContainer}`}>
        <div className={`${mainPageStyles.IntroContainer}`}>
            <div style={{width: '50%'}}>
<h1>Your complete task manager — built for personal productivity and team collaboration.</h1>
            <div className={`${mainPageStyles.btnContainer}`}>
                <Link to={'/Signup'} className={`${mainPageStyles.Link}`}><button><img src={SignUpIcon}/>Signup</button></Link>
                <Link to={'/login'} className={`${mainPageStyles.Link}`}><button><img src={LoginIcon}/>Login</button></Link>
            </div>
            </div>
            
            <div style={{width: '50%'}}>
            <img src={mainPageImage} style={{width: '100%'}} />
        </div>

        </div>
        
        <div className={`${mainPageStyles.FeatureContainer}`}>
            <h1>Discover the features that make Task Manager APP so easy to use</h1>
            <div style={{display: 'flex', padding: '20px'}}>
                <ul style={{display: 'flex', gap: '60px'}}>
                <li>
                    Boards
                </li>
                <li>
                    Team management
                </li>
                <li>
                    Pendency check
                </li>
                <li>
                    Task Tracking
                </li>
            </ul>

            </div>
            <div className={`${mainPageStyles.FeatureDetailContainer}`}>

            </div>
            
        </div>
        </div>
        </>

    )
}