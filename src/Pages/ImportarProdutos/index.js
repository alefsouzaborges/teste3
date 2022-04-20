import { Button, Modal, Form, FormCheck } from 'react-bootstrap';

import api from '../../Services/api';
import { useState, useEffect } from 'react';
import './styles.css'

import TextField from '@mui/material/TextField';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import axios from 'axios';
import { waitFor } from '@testing-library/react';

export default function ImportarProdutos() {

  const [data, setData] = useState([]);
  const [titulo, setTitulo] = useState('Aguarando upload...');
  const [loading, setLoading] = useState(false);
  let index = 1;
  const [count, setCount] = useState(1);

  useEffect(() => {

  }, [data])

  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const emailEmpresaAuth = localStorage.getItem('@auth');
    const email_empresa = JSON.parse(emailEmpresaAuth).email;

    let obj = {};
    let i = 1;
    setTitulo(document.getElementById('titulo').innerHTML = file.name);
    reader.readAsText(file);
    reader.onload = () => {
      setLoading(true);
      let row = reader.result.split('\n');
       row.forEach(item => {
        let data = item.split(';')
        let codigo = data[0];
        let descricao = data[1];
        
        obj = {codigo, descricao,email_empresa};
        index++; 
        
        
         async function load(){
           
            const response = await api.post('produtos/upload', obj);
            if(response.data.success === true){
              
              //console.log(i++);
              setCount(i++);
              //console.log(response.data);
              //console.log(response.data.response);
              if(index <= i){
                alert('Importação de produtos finalizada.');
                setLoading(false);
                setCount(1);    
              }
              
            }else{
              console.log(response.data.response)    
              setLoading(false);  
              setCount(1);    
              }
          }
          load();
      });
    }
  }
   
  return (
    <div className='content-full'>

      <div className='content-card'>

        <div className='content_input'>
  
           <div className='container-input'>
             <h1 id='titulo'>{titulo}</h1>
             <div className='container-button'>
              <label htmlFor="arquivo"><AiOutlineCloudUpload className='icon'/> Enviar arquivo</label>
             </div>
             <h1 className='carregando'>{loading === true ? 'Carregando produtos...' : null}</h1>
             <h1 className=''>{loading === true ? count+1 : null}</h1>
           </div>

          <input type="file" name="arquivo" id="arquivo" onInput={(e) => handleFileChange2(e)} disabled={loading === true ? true : false}/>
         	
        </div>

      </div>

    </div>

  )
}