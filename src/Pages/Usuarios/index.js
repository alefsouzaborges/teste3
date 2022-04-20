import { Button, Modal, Form, FormCheck } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import api from '../../Services/api';
import Swal from 'sweetalert2';
import  {useState, useEffect} from 'react';
import './styles.css'
import LoadingAnim from '../LoadingPages';
import LoadingAnimList from '../LoadingLists';

import Buttons from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function Usuarios(){

  
  const [show, setShow] = useState(false);
  const [codigo, setCodigo] = useState(0);
  const [emailEmpresa, setEmailEmpresa] = useState('');
  const [usuario, setUsuario] = useState('');
  const [status, setStatus] = useState('Bloqueado');
  const [mac, setMac] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadList, setLoadList] = useState(false);
  const [infor, setInfor] = useState('');
  const [update, setUpdate] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  const [dataEmpresas, setDataEmpresas] = useState([{}]);

  const Swal = require('sweetalert2')

  function getUsuario(e){
    handleShow();
    setUpdate(true);
    setCodigo(e.id);
    setEmailEmpresa(e.email_empresa);
    setUsuario(e.usuario);
    setMac(e.mac);
    setStatus(e.status);
    setInfor('Atualizando');
  }


  async function carregarLastId(){
    setLoading(true);
    if(infor === 'Cadastrando'){
      const response = await api.get('usuarios/lastid');
      if(response.data.success === true){
        if(response.data.response[0]['lastid'] != null){
          setCodigo(response.data.response[0]['lastid']);
          setLoading(false);
        }else{
          setCodigo(1);
          setLoading(false);
        }
      }
    }else{
      setCodigo(codigo);
      setLoading(false);
    }
   
  }

  function limparCampos(){
    setEmailEmpresa('');
    setUsuario('');
    setStatus('Bloqueado');
    setMac('');
  }

  async function cadastrar(){
    carregarLastId();
    if(emailEmpresa === '' || usuario === '' || status === '' || mac === ''){
      

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Existe, campos em branco.'
      })
    } else{
      setLoading(true);
      let email_empresa = emailEmpresa;

      let obj = {email_empresa, usuario, status, mac}
      const response = await api.post('usuarios/criar_usuario', obj);

      if(response.data.success === true){
        setLoading(false);
        handleClose();
        limparCampos();
        carregarLastId();
        Swal.fire(
          'Perfeito!',
          'Usuário cadastrado com sucesso!',
          'success'
        )

      }else{
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.response
        })
  
      }
      
    // Swal.fire(
    //   'Perfeito!',
    //   'Empresa cadastrada com sucesso!',
    //   'success'
    // )

    }

  }

  async function atualizar(){

    if(emailEmpresa === '' || usuario === '' || status === '' || mac === ''){
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Existe, campos em branco.'
      })
    } else{
      setLoading(true);
      let email_empresa = emailEmpresa;

      let obj = {email_empresa, usuario, status, mac, codigo}
      const response = await api.post('usuarios/atualizar_usuario', obj);
      if(response.data.success === true){
        setLoading(false);
        handleClose();
        limparCampos();
        carregarLastId();
        carregarUsuarios();
        Swal.fire(
          'Perfeito!',
          'Usuário atualizado com sucesso!',
          'success'
        )

      }else{
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.response
        })
      }
      
    // Swal.fire(
    //   'Perfeito!',
    //   'Empresa cadastrada com sucesso!',
    //   'success'
    // )

    }

  }

  async function carregarUsuarios(){
    setLoadList(true);
    const response = await api.get('usuarios');
    
    if(response.data.success === true){
      console.log(response.data.response);
      setData(response.data.response);
      setLoadList(false);
    }else{
      console.log(response.data.response);
      setLoadList(false);
    }

  }

  async function carregarEmpresas(){
    
    const response = await api.get('empresas');
    
    if(response.data.success === true){
      setDataEmpresas(response.data.response)
      //console.log(response.data.response);
    }else{
      console.log(response.data.response);
    }

  }

  useEffect(() =>{

    carregarUsuarios();
    carregarLastId();
    carregarEmpresas();
  },[codigo, infor])

  const columns = [
    {
      name: 'Codigo',
      selector: row => row.id,
      sortable: true,
    },
    {
        name: 'Email Empresa',
        selector: row => row.email_empresa,
        sortable: true,
    },
    {
        name: 'Usuário',
        selector: row => row.usuario,
        sortable: true,
    },
    {
        name: 'Mac',
        selector: row => row.mac,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
    },
   
];

    return(
  <div className='content-full'>

    <div className='content-card'>
  
        <div className='content-header-button'>

        <Stack direction="row"  onClick={() => {handleShow(); limparCampos(); setInfor('Cadastrando'); setUpdate(false)}}>
         <Buttons variant="contained">Novo Usuário</Buttons>
        </Stack>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
        {loading === true ? <LoadingAnim/> : null}
              
        <Modal.Header closeButton>
          <Modal.Title>Novo Usuário</Modal.Title>


        </Modal.Header>

        <Modal.Body>

        <Form>
        <div className='row'>
          <Form.Group className="mb-3 col-3" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Codigo</Form.Label> */}
            <Form.Control 
            type="text" 
            placeholder="Codigo" 
            maxLength={3} 
            value={loading === true ? 'aguarde...' : codigo}
            disabled={true}
            />
          </Form.Group>
        
         <Form.Group spacing-row className="mb-3 col-9" value="spacing-row"  controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Codigo</Form.Label> */}
            {/* <Form.Control 
            type="text" 
            placeholder="Nome Fantasia"
            value={nomeFantasia}
            onChange={(e) => setNomeFantasia(e.target.value)}
            /> */}

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              getOptionLabel={(dataEmpresas) => `${dataEmpresas.email}`}
              options={dataEmpresas}
              loading={true}
              onChange={(e) => [setEmailEmpresa(e.target.outerText)]}
              loadingText='Carregando...'
              renderInput={(params) => <TextField {...params} label={update === true ? emailEmpresa: 'Buscar Empresa'} size='small'/>}
            />
           
          </Form.Group>
        
         </div>
         <div className='row'>
          <Form.Group className="mb-2 col-8" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Codigo</Form.Label> */}
            <Form.Control 
            type="text" 
            placeholder="Usuário" 
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2 col-4" value="spacing-row" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Codigo</Form.Label> */}
            
            <Form.Group className="mb-2 col-12" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Codigo</Form.Label> */}
            <Form.Select aria-label="Define o status da Empresa" 
            onChange={(e) => setStatus(e.target.value)} defaultValue={status}>
              <option value="Ativo" >Ativo</option>
              <option value="Bloqueado">Bloqueado</option>
            </Form.Select> 
          </Form.Group>
          </Form.Group>
          </div>
        
          <div className='row'>
          <Form.Group className="mb-2 col-12" controlId="exampleForm.ControlInput1">
          <Form.Control 
            type="text" 
            placeholder="Mac"
            maxLength={18} 
            value={mac}
            onChange={(e) => setMac(e.target.value)}
            />
           </Form.Group>
          </div>
        

        </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Sair
          </Button>
          {infor === 'Cadastrando' ? <Button variant="primary" onClick={cadastrar}>Adicionar</Button>  :
          <Button variant="primary" onClick={atualizar}>Atualizar</Button>}
        </Modal.Footer>
      </Modal>
        

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
            onRowClicked={(e) => getUsuario(e)}
          />
        }
      </div> 
{/* ---------------------------------------------------------------------------------------- */}
   
    </div>

  
  </div>
    )
}