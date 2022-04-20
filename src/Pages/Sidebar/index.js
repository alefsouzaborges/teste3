import { useEffect, useState,useContext } from 'react';
import { Accordion } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { AiOutlineLogin, AiTwotoneShop, 
    AiOutlineUserAdd,AiFillTag,AiOutlineTeam,AiTwotoneSnippets,AiTwotoneTags} from "react-icons/ai";
import { PagesContext } from '../Context/contextPages';
import Tooltip from '@mui/material/Tooltip';
import './styles.css'

export default function SideBar(){

    const { pageActive, setPageActive } = useContext(PagesContext);

    const [dados, setDados] = useState([]);
    const [email, setEmail] = useState('');
    const [active, setActive] = useState('');
    const [tipoUser, setTipoUser] = useState('');

    const [colorMenuSelected, setColorMenuSelected] = useState('');
    const history = useHistory();
    function changeMenu(e){
        let imgLogo = document.querySelectorAll('img');
        if(imgLogo[0].attributes[1].value === 'Logo'){
           setPageActive('FirstPage');
        }
    
       if(tipoUser === 'Admin'){
        if(e.innerText === 'EMPRESAS'){
            // Classe Active //
            setActive(document.querySelectorAll('li')[0].classList.add('active'));
            setActive(document.querySelectorAll('li')[1].classList.remove('active'));
            setActive(document.querySelectorAll('li')[2].classList.remove('active'));
            setActive(document.querySelectorAll('li')[3].classList.remove('active'));
            setActive(document.querySelectorAll('li')[4].classList.remove('active'));
            // Classe sidebar-menu-selected //
            setColorMenuSelected(document.querySelectorAll('li')[0].style.color = '#FFF');
            setColorMenuSelected(document.querySelectorAll('li')[1].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[2].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[3].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[4].style.color = '#0472c7');
            setPageActive('EMPRESAS')
        } else if(e.innerText === 'USUÁRIOS'){
             // Classe Active //
            setActive(document.querySelectorAll('li')[0].classList.remove('active'));
            setActive(document.querySelectorAll('li')[1].classList.add('active'));
            setActive(document.querySelectorAll('li')[2].classList.remove('active'));
            setActive(document.querySelectorAll('li')[3].classList.remove('active'));
            setActive(document.querySelectorAll('li')[4].classList.remove('active'));
            // Classe sidebar-menu-selected //
            setColorMenuSelected(document.querySelectorAll('li')[0].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[1].style.color = '#FFF');
            setColorMenuSelected(document.querySelectorAll('li')[2].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[3].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[4].style.color = '#0472c7');
            setPageActive('USUÁRIOS')
        } else if(e.innerText === 'LISTAR PRODUTOS'){
             // Classe Active //
            setActive(document.querySelectorAll('li')[0].classList.remove('active'));
            setActive(document.querySelectorAll('li')[1].classList.remove('active'));
            setActive(document.querySelectorAll('li')[2].classList.add('active'));
            setActive(document.querySelectorAll('li')[3].classList.remove('active'));
            setActive(document.querySelectorAll('li')[4].classList.remove('active'));
            // Classe sidebar-menu-selected //
            setColorMenuSelected(document.querySelectorAll('li')[0].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[1].style.color = '#0472C7');
            setColorMenuSelected(document.querySelectorAll('li')[2].style.color = '#FFF');
            setColorMenuSelected(document.querySelectorAll('li')[3].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[4].style.color = '#0472c7');
            setPageActive('LISTAR PRODUTOS')
        } else if(e.innerText === 'IMPORTAR PRODUTOS'){
             // Classe Active //
            setActive(document.querySelectorAll('li')[0].classList.remove('active'));
            setActive(document.querySelectorAll('li')[1].classList.remove('active'));
            setActive(document.querySelectorAll('li')[2].classList.remove('active'));
            setActive(document.querySelectorAll('li')[3].classList.add('active'));
            setActive(document.querySelectorAll('li')[4].classList.remove('active'));
            // Classe sidebar-menu-selected //
            setColorMenuSelected(document.querySelectorAll('li')[0].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[1].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[2].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[3].style.color = '#FFF');
            setColorMenuSelected(document.querySelectorAll('li')[4].style.color = '#0472c7');
            setPageActive('IMPORTAR PRODUTOS')
        } else if(e.innerText === 'GERAR AUDITORIA'){
             // Classe Active //
            setActive(document.querySelectorAll('li')[0].classList.remove('active'));
            setActive(document.querySelectorAll('li')[1].classList.remove('active'));
            setActive(document.querySelectorAll('li')[2].classList.remove('active'));
            setActive(document.querySelectorAll('li')[3].classList.remove('active'));
            setActive(document.querySelectorAll('li')[4].classList.add('active'));
            // Classe sidebar-menu-selected //
            setColorMenuSelected(document.querySelectorAll('li')[0].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[1].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[2].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[3].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[4].style.color = '#FFF');
            setPageActive('GERAR AUDITORIA')
        }
       }else{
        if(e.innerText === 'LISTAR PRODUTOS'){
             // Classe Active //
            setActive(document.querySelectorAll('li')[0].classList.add('active'));
            setActive(document.querySelectorAll('li')[1].classList.remove('active'));
            setActive(document.querySelectorAll('li')[2].classList.remove('active'));
            // Classe sidebar-menu-selected //
            setColorMenuSelected(document.querySelectorAll('li')[0].style.color = '#FFF');
            setColorMenuSelected(document.querySelectorAll('li')[1].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[2].style.color = '#0472c7');
            setPageActive('LISTAR PRODUTOS')
        } else if(e.innerText === 'IMPORTAR PRODUTOS'){
            setActive(document.querySelectorAll('li')[0].classList.remove('active'));
            setActive(document.querySelectorAll('li')[1].classList.add('active'));
            setActive(document.querySelectorAll('li')[2].classList.remove('active'));
            // Classe sidebar-menu-selected //
            setColorMenuSelected(document.querySelectorAll('li')[0].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[1].style.color = '#FFF');
            setColorMenuSelected(document.querySelectorAll('li')[2].style.color = '#0472c7');
            setPageActive('IMPORTAR PRODUTOS')
        } else if(e.innerText === 'GERAR AUDITORIA'){
            setActive(document.querySelectorAll('li')[0].classList.remove('active'));
            setActive(document.querySelectorAll('li')[1].classList.remove('active'));
            setActive(document.querySelectorAll('li')[2].classList.add('active'));
            // Classe sidebar-menu-selected //
            setColorMenuSelected(document.querySelectorAll('li')[0].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[1].style.color = '#0472c7');
            setColorMenuSelected(document.querySelectorAll('li')[2].style.color = '#FFF');
            setPageActive('GERAR AUDITORIA')
        }
       }
    }

    async function getTipoUser(){
        let tipo = await JSON.parse(localStorage.getItem('@auth'));
        setTipoUser(tipo['tipo']);
      
    }   

    useEffect(() => {

        recoverUser();
        getTipoUser();


    },[email, active, tipoUser])
    
    async function recoverUser(){
        let auth = localStorage.getItem("@auth");
        auth = await JSON.parse(auth);
         setDados({
            empresa: auth['empresa'],
            email: auth['email'],
            status: auth['status'],
            tipo: auth['tipo']
        })       
    }

    async function logout(){
       localStorage.removeItem('@auth');
       let auth = localStorage.getItem("@auth");
       auth = await JSON.parse(auth);
       if(!auth){
            history.push('/');
       }
    }

    return(
        <div className="sidebar-content">
            <div className="sidebar-box-login">
                <div className="sidebar-content-img">
                     <img src={logo} onClick={(e) => changeMenu(e.target)} values='Logo' style={{cursor: 'pointer'}} />
                </div>
                <div className="sidebar-infor-login">
                    <span>Empresa: {dados['empresa']}</span>
                    <span>email: {dados['email']}</span>
                    <span>status: {dados['status']}</span>
                    <span>tipo: {dados['tipo']}</span>
                    <Tooltip title="Logout">
                       <h3 onClick={logout}><AiOutlineLogin className='icon'/></h3>
                    </Tooltip> 
                </div>
                <div className='sidebar-menu'>
                    
                    <Accordion>
                    <Accordion.Item eventKey="0" >
                        <Accordion.Header className='sidebar-acordion-header'>CADASTROS</Accordion.Header>
                        <Accordion.Body className='sidebar-acordion'>
                           <div className='teste'>
                               {console.log(tipoUser)}
                               {
                                   tipoUser === 'Admin' ? 
                                <ul>
                                    <li className='' onClick={(e) => changeMenu(e.target)}><AiTwotoneShop className='icon' values='Empresas' id='Empresas'/>EMPRESAS</li>
                                </ul> :
                                    null
                               }
                           </div>
                           <div>
                                {
                                tipoUser === 'Admin' ? 
                                <ul>
                                    <li className='' onClick={(e) => changeMenu(e.target)}><AiOutlineUserAdd className='icon' values='Usuarios' id='Usuarios' />USUÁRIOS</li>
                                </ul> :
                                null
                                }
                           </div>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>PRODUTOS</Accordion.Header>
                        <Accordion.Body className='sidebar-acordion'>
                        <ul>
                            <li className='' onClick={(e) => changeMenu(e.target)}><AiFillTag className='icon'values='Listar Produtos' id='Listar Produtos'/>LISTAR PRODUTOS</li>
                            <li className='' onClick={(e) => changeMenu(e.target)}><AiTwotoneTags className='icon' values='Importar Produtos' id='Importar Produtos' />IMPORTAR PRODUTOS</li>
                        </ul>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header className='sidebar-acordion-header' values='Auditoria'>AUDITORIA</Accordion.Header>
                        <Accordion.Body className='sidebar-acordion'>
                            <ul>
                                <li className='' onClick={(e) => {changeMenu(e.target)}}><AiTwotoneSnippets className='icon' values='Gerar Auditoria' id='Gerar Auditoria'/>GERAR AUDITORIA</li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
