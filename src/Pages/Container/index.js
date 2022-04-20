import FirstPage from '../FirtsPage'
import ImportarProdutos from '../ImportarProdutos';
import ListarProdutos from '../ListarProdutos';
import NovaEmpresa from '../NovaEmpresa';
import Usuarios from '../Usuarios';
import GerarAuditoria from '../GerarAuditoria';

import {useState, useEffect, useContext} from 'react';
import { PagesContext } from '../Context/contextPages';


import './styles.css'

export default function Container(){

    const { pageActive, setPageActive } = useContext(PagesContext);


    function Pages(){
         if(pageActive === 'EMPRESAS'){
             return <NovaEmpresa/>
         }else if(pageActive === 'USUÁRIOS'){
            return <Usuarios/>
         }else if(pageActive === 'LISTAR PRODUTOS'){
            return <ListarProdutos/>
         }else if(pageActive === 'IMPORTAR PRODUTOS'){
            return <ImportarProdutos/>
         }else if(pageActive === 'GERAR AUDITORIA'){
            return <GerarAuditoria/>
         }else if(pageActive === 'PORTAL FLEX COLLECT'){
            return <FirstPage/>
         }
         setPageActive('PORTAL FLEX COLLECT');
    }

        useEffect(() =>{
            console.log(pageActive);
            Pages();
        },[pageActive]);


    return(
        <div className='container-content'>
          <div className='content-center'>
              {/* <NovaEmpresa/> */}
              {/* <FirstPage/> */}
              {/* <Usuarios/> */}
              {/* <ListarProdutos/> */}
              {/* <ImportarProdutos/> */}
              {Pages()}
          </div>
        </div>
    )
}