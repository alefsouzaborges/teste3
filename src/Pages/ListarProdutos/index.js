import { Button, Modal, Form, FormCheck } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import api from '../../Services/api';
import  {useState, useEffect} from 'react';
import LoadingAnimList from '../LoadingLists';

import './styles.css'
import LoadingAnim from '../LoadingPages';

import Buttons from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function ListarProdutos(){

  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [loadList, setLoadList] = useState(false);

  async function carregarProdutos(){
    setLoadList(true);
    let auth = localStorage.getItem('@auth');
    auth = await JSON.parse(auth);

    let email_empresa = auth.email;

    // const response = await api.get('produtos/' + email_empresa);
    
    if(input !== ''){

      const response = await api.get('produtos/por_descricao/' + email_empresa + '/' + input)
    
    if(response.data.success === true){
      setLoadList(false);

      console.log(response.data.response);
      setData(response.data.response);
      
    }else{
      setLoadList(false);
      console.log(response.data.response);
    }

  }else{
    const response = await api.get('produtos/' + email_empresa)
    
    if(response.data.success === true){
      console.log(response.data.response);
      setData(response.data.response);
      setLoadList(false);
    }else{
      setLoadList(false);
      console.log(response.data.response);
    }

  }

  }


  useEffect(() =>{

    carregarProdutos();

  },[input])

  const columns = [
    {
      name: 'Codigo',
      selector: row => row.id,
      sortable: true,
    },
    {
        name: 'Descrição',
        selector: row => row.descricao,
        sortable: true,
    },
    {
        name: 'Email Empresa',
        selector: row => row.email_empresa,
        sortable: true,
    },
    {
        name: 'Data importação',
        selector: row => row.created_at,
        sortable: true,
    },

];

    return(
  <div className='content-full'>

    <div className='content-card'>
  
        <div className='content-header-button'>

        {/* <Stack direction="row">
         <Buttons variant="contained">Novo Usuário</Buttons>
        </Stack> */}
        <TextField id="outlined-basic" label="Pesquisar produto" variant="outlined" size="small" onChange={(e) => setInput(e.target.value)}/>

        </div>
{/* ----------------------------------TABLE------------------------------------------------ */}
       <div className='content-table '>
        {loadList === true ? <LoadingAnimList/> :
          <DataTable
            columns={columns}
            data={data}
            pagination
            striped
            pointerOnHover
            highlightOnHover
            dense
            paginationPerPage={5}
            responsive
            paginationRowsPerPageOptions={[5,10,15]}
          />
        }
      </div> 
{/* ---------------------------------------------------------------------------------------- */}
   
    </div>

  
  </div>
    )
}