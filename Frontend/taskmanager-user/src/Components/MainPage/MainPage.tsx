import React, {useState} from "react";
import Navbar from "../MainPage/Navbar";
import mainPageImage from '../../assets/logo/Main-Page-Image.svg'
import LoginIcon from '../../assets/logo/User check.svg'
import SignUpIcon from '../../assets/logo/User plus.svg'
import mainPageStyles from './mainPageStyles.module.css'
import { Link } from "react-router-dom";
import {FEATUREDETAILS} from "./FeatureDeatailsPage";

export const MainPage: React.FC = () => {
    const [selectedOption, setSelectedOptions] = useState<number>(0);

    function handleSetOption(value: number){
        setSelectedOptions(value);
    }

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
                <ul style={{ display: 'flex', gap: '60px' }}>
                    <li
                        onClick={() => handleSetOption(0)}
                        className={selectedOption === 0 ? mainPageStyles.active : ''}
                    >
                        Boards
                    </li>
                    <li
                        onClick={() => handleSetOption(1)}
                        className={selectedOption === 1 ? mainPageStyles.active : ''}
                    >
                        Team management
                    </li>
                    <li
                        onClick={() => handleSetOption(2)}
                        className={selectedOption === 2 ? mainPageStyles.active : ''}
                    >
                        Pendency check
                    </li>
                    <li
                        onClick={() => handleSetOption(3)}
                        className={selectedOption === 3 ? mainPageStyles.active : ''}
                    >
                        Task Tracking
                    </li>
                </ul>

            </div>
            <div className={`${mainPageStyles.FeatureDetailContainer}`}>
                {FEATUREDETAILS[selectedOption] && (
                    <>
                    <div style={{width: '70%'}}>
                        <h1>{FEATUREDETAILS[selectedOption].title}</h1>
                        <p>{FEATUREDETAILS[selectedOption].desc}</p>
                    </div>
                    <div style={{width: '100%'}}>
                    <img src={FEATUREDETAILS[selectedOption].img} style={{width: '100%', height:'100%', borderRadius: '5%'}} />
                    </div>
                    </>
                )}

            </div>


            
        </div>

        </div>
        </>

    )
}