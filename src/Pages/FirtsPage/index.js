import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { AiFillShop,AiFillTag,AiOutlineTeam,AiTwotoneSnippets } from "react-icons/ai";
import api from '../../Services/api';
import './styles.css'

import Load from '../LoadingFirst';

function FirstPage(){

    const [count_empresas, setCountEmpresas] = useState(0);
    const [count_usuarios, setCountUsuarios] = useState(0);
    const [count_produtos, setCountProdutos] = useState(0);
    const [count_auditorias, setCountAuditorias] = useState(0);
    const [loading, setLoading] = useState(false);     

    async function count_all_empresas(){
        setLoading(true);
        let tipo = await JSON.parse(localStorage.getItem('@auth')); 
     
        if(tipo['tipo'] === 'Admin'){
            const response = await api.get('/empresas/count-all-empresas');
            if(response.data.success === true){
                setLoading(false);
                setCountEmpresas(response.data.response[0]['total']);
            }else{
                setLoading(false);
                alert(response.data.response);
            }
        }else{
            setCountEmpresas(0);

        }
      

    }

    const Carregando  = () => {
       return <div>
           <Load/>
       </div>
    }

    async function count_all_usuarios(){
        setLoading(true);
        let tipo = await JSON.parse(localStorage.getItem('@auth')); 
     
        if(tipo['tipo'] === 'Admin'){

            const response = await api.post('/usuarios/count-all-usuarios');
        if(response.data.success === true){
            setLoading(false);
            console.log(response.data.response);
            setCountUsuarios(response.data.response[0]['total']);
        }else{
            setLoading(false);
            alert(response.data.response);
        }

        }else{
                let email_logado = await JSON.parse(localStorage.getItem('@auth')); 
                let email_empresa = email_logado['email'];
                let obj = {email_empresa}
                const response = await api.post('/usuarios/count-usuarios', obj);
            if(response.data.success === true){
                setLoading(false);
                console.log(response.data.response);
                setCountUsuarios(response.data.response[0]['total']);
            }else{
                setLoading(false);
                alert(response.data.response);
            }

        }
    }

    async function count_all_produtos(){
        setLoading(true);
        let email_logado = await JSON.parse(localStorage.getItem('@auth')); 
        let email_empresa = email_logado['email'];
        let obj = {email_empresa}
        const response = await api.post('/produtos/count-produtos', obj);
        if(response.data.success === true){
            setLoading(false);
            setCountProdutos(response.data.response[0]['total']);
        }else{
            setLoading(false);
            alert(response.data.response);
        }

    }

    async function count_all_auditorias(){
        setLoading(true);
        let email_logado = await JSON.parse(localStorage.getItem('@auth')); 
        let email_empresa = email_logado['email'];
        let obj = {email_empresa}
        const response = await api.post('/auditoria/count-auditorias', obj);
        if(response.data.success === true){
            setLoading(false);
            setCountAuditorias(response.data.response[0]['total']);
        }else{
            setLoading(false);
            alert(response.data.response);
        }

    }


    useEffect(() =>{

        count_all_empresas();
        count_all_usuarios();
        count_all_produtos();
        count_all_auditorias();

    },[])

    return(
        <div className='content-full'>
            <div className='welcome'>
            <div className='welcome2'>
                <h1>Seja bem-vindo ao Portal Flex Collect!</h1>    
            </div>
            
            <div className='container-card-first-page'>
            <Carousel interval={3000} slide={true} >
                <Carousel.Item>
                    <img
                    className="d-block w-100 img-fluid"
                    src="https://i.ibb.co/Ph2Y5Fp/Arte-exponsiva-do-site-flexcolection02.jpg"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <p>Seu estoque em suas mãos.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://i.ibb.co/yd6CQP6/Arte-exponsiva-do-site-flexcolection.jpg"
                    alt="Second slide"
                    />
                    <Carousel.Caption>
                    <p>Sistema de Gestão de estoque.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            </div>
               
            {/*=========================================CARDS===================================*/}


            <div className='content-cards'>
                <div className='cards radiusL'>
                     <h1><AiFillShop/> Empresas</h1>
                     <h2>{loading === true ? Carregando() : count_empresas}</h2>
                </div>
                <div className='cards'>
                     <h1><AiOutlineTeam/> Usuários</h1>
                     <h2>{loading === true ? Carregando():count_usuarios}</h2>
                </div>
                <div className='cards'>
                     <h1><AiFillTag/> Produtos</h1>
                     <h2>{loading === true ? Carregando() :count_produtos}</h2>
                </div>
                <div className='cards radiusR'>
                     <h1><AiTwotoneSnippets/> Auditorias</h1>
                     <h2>{loading === true ? Carregando() :count_auditorias}</h2>
                </div>
            </div>


            {/*=========================================CARDS===================================*/}
           
            </div>
           
         </div>
    )
}

export default FirstPage;