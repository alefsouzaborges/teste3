import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '../Container';
import Navbar from '../Navbar';
import SideBar from '../Sidebar';
import './styles.css'

export default function Home(){

    const history = useHistory();

    useEffect(() => {

        recoverUser();

    },[])
    
    async function recoverUser(){

        const auth = localStorage.getItem("@auth");
        if(auth !== null){
            return;
        }else{
           history.push('/');
        }
    }

    return(
        <div className='container-native-home'>
             <SideBar/>
           <div className='content-all'>
            <div className='content-content'>
                    <Navbar/>
            </div>
            <div className='container-center'>
                    <Container/>
            </div>
           </div>
        </div>
    )
}