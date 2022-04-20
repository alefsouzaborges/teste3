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
import {AiOutlineFileProtect, AiOutlineDelete} from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';
import { saveAs } from 'file-saver';

export default function GerarAuditoria(){

  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [loadList, setLoadList] = useState(false);
  const [loadStatus, setLoadStatus] = useState(false);
  const [tituloAuditoria, setTituloAuditoria] = useState('');
  const [dados, setDados] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function carregarProdutos(){
    setLoadList(true);
    let auth = localStorage.getItem('@auth');
    auth = await JSON.parse(auth);

    let email_empresa = auth.email;

    const response = await api.get('auditoria/' + email_empresa)
    
    if(response.data.success === true){
      //console.log(response.data.response);
      setData(response.data.response);
      setLoadList(false);
    }else{
      setLoadList(false);
      console.log(response.data.response);
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
      name: 'Status',
      selector: row => row.status === 'N' ? 'Normal' : 'Cancelada',
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
    {
      name: 'Gerar Arquivo',
      selector: row => gerarArquivo(row),
      sortable: true,
    },
];


  const gerarArquivo = (row) => {

    async function gerar(){
      
      let id = row.id;
      let email_empresa = row.email_empresa;
      let obj = {id, email_empresa}
      const response = await api.post('auditoria/gerar', obj);
      let todos = [];
      let titulo = 'Auditoria';
      let blob;
      if(response.data.success === true){
        setDados(response.data.response);
       
        for (let i = 0; i < response.data.response.length; i++) {
           
                
          document.querySelector("h1").innerText = response.data.response[2]['codbarras'];
          blob =  new Blob([response.data.response[i]], 
 
          {
            type: "text/plain;charset-utf-8"
          });
       

        }
        saveAs(blob, titulo + ".txt");
            
     

      
        
        //saveAs(blob, titulo + ".txt");
        

      }else{
        console.log(response.data.response);
      }

     

    // async function gerar2(){

    //   let id = row.id;
    //   let email_empresa = row.email_empresa;
    //   let obj = {id, email_empresa}
    //   const response = await api.post('auditoria/gerar', obj);

    //    let i =0;
     
    //    let titulo = 'Auditoria';
    //    let todos = [];
    //   if(response.data.success === true){
    //     setDados(response.data.response);
    //     let codbarras = '';
    //     let qtde = 0;
    //     let blob;
    //     let cont = 0;
    //     todos.push(await response.data.response);
    //     dados.forEach(e =>{
    //       blob =  new Blob([todos[codbarras]],
   
    //         {
    //           type: "text/plain;charset-utf-8"
    //         });
    //     })
    //     saveAs(blob, titulo + ".txt");

    //   }else{
    //     console.log(response.data.response);
    //   }

      // let i =0;
     
      // let titulo = 'Auditoria';
      // let texto1 = '7891080404918'
      // let texto2 = '5'
      // let blob = new Blob([texto1+";"+texto2],
      //   {
      //     type: "text/plain;charset-utf-8"
      //   });

      //   saveAs(blob, titulo + ".txt");

      // let id = row.id;
      // let obj = {id}
      // const response = await api.post('auditoria/gerar-auditoria', obj);

      // console.log(response.data);
      
    }

    // async function gerar2(){

    //   let id = row.id;
    //   let obj = {id}
    //   const response = await api.post('auditoria/gerar-auditoria', obj);

    //   console.log(response.data);
      
    //   }

    async function deletar(row){
      setLoadStatus(true);
      let id = row.id;
      let status = 'C';

      let obj = {id, status};

      const response = await api.post('auditoria/cancelar', obj);

      if(response.data.success === true){
        setLoadStatus(false);
        alert(response.data.response);
        handleClose();
        carregarProdutos()
      }else{
        alert(response.data.response);
        handleClose();
        carregarProdutos()
      }
    }


    return(
      <div className='buttons'>
         <Tooltip title="Gerar Auditoria">
           <div>
             <AiOutlineFileProtect className='icon-gerar' onClick={() => {gerar()}}/>
           </div>
         </Tooltip>
         <Tooltip title="Deletar Auditoria">
           <div>
             <AiOutlineDelete className='icon-deletar' onClick={() => {handleShow(); setTituloAuditoria(row.descricao)}}/>
           </div>
         </Tooltip>
          <Modal show={show} onHide={handleClose} backdrop="static"  keyboard={false}>
          {loadStatus === true ? <LoadingAnim/> : null}
                  <Modal.Header closeButton>
                    <Modal.Title>Cancelar Auditoria</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Tem certeza que deseja cancelar a auditoria {tituloAuditoria} </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Não
                    </Button>
                    <Button variant="primary" onClick={() => deletar(row)}>
                      SIM
                    </Button>
                  </Modal.Footer>
          </Modal>

      </div>
    )
    
  }

    return(
  <div className='content-full'>

    <div className='content-card'>
  
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