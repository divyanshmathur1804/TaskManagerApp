import { memo } from "react";
import taskImage from '../../assets/logo/taskManagerIcon.svg'
import NavbarStyle from './Navbar.module.css'
import { Link } from "react-router-dom";

function Navbar(){
    return(
        <>
        <div className={`${NavbarStyle.MainContainer}`}>
            <ul>
                <li>
                    <div className={`${NavbarStyle.MainContainerImg}`} >
                        <img src={taskImage}/>
                        <h2>Task Manager App</h2>
                    </div>
                </li>
               
            </ul>
        </div>
        
        </>
    )

}

export default memo(Navbar);