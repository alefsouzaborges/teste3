import { useState } from 'react';
import api from '../../Services/api';
import Load from '../Loading/index.js';
import { useHistory } from 'react-router-dom';
import './styles.css'
import pessoas from '../../assets/pessoas.jpg';
import logo from '../../assets/logo2.png';

export default function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function saveUser(auth){
        localStorage.setItem("@auth",JSON.stringify(auth[0]));
        history.push("/home");
        console.log(auth);
    }

    async function login(){
        setLoading(true);
        if(email === '' || senha === ''){
            alert('Preencha todos os campos corretamente');
            setLoading(false);
        }else{
            
            const response = await api.get('empresas/login-portal/' + email + '/' + senha);

            if(response.data.success === true){
                console.log(response.data.success);
                let auth = [{}];
                setLoading(false);
                auth = ([{
                    empresa: response.data.response[0]['nome_fantasia'], 
                    email: response.data.response[0]['email'],
                    status: response.data.response[0]['status'],
                    tipo: response.data.response[0]['tipo'],
                }]);
                saveUser(auth);

            }else{
                alert(response.data.response);
                setLoading(false);
            }
        }
        

        }

    return(
        <div className="container-native">
        {loading === true ? <Load/> : null}
            <img src={pessoas}  values='Logo' className='img'/>
            <div className="content">
                <div className="area-inputs" action='#'>
                    {/* <h1>PORTAL DO CLIENTE</h1> */}
                    <img src={logo}  values='Logo'/>
                    <input
                    placeholder="E-mail"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                    />
                    <input
                    placeholder="Senha"
                    type="password"
                    onChange={(e) => setSenha(e.target.value)}
                    required={true}
                    />
                    <button onClick={login} type='submit'>
                        ACESSAR
                    </button>
                </div>
                {/* <span>Qualquer duvida entre em contato com o administrador.</span> */}
            </div>
          
        </div>
    )
}
