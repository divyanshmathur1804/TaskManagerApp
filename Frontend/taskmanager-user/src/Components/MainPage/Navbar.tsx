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
                <div className={`${NavbarStyle.MainContainerButtons}`}>
                <li><Link className={`${NavbarStyle.Link}`} to={"Signup"}>Signup</Link></li>
                <li><Link className={`${NavbarStyle.Link}`} to={"login"}>Login</Link></li>
                </div>
            </ul>
        </div>
        <hr/>
        </>
    )

}

export default memo(Navbar);