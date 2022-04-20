import { Button, Modal, Form, FormCheck } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import api from '../../Services/api';
import Swal from 'sweetalert2';
import  {useState, useEffect, } from 'react';
import './styles.css'
import LoadingAnim from '../LoadingPages';
import LoadingAnimList from '../LoadingLists';
import { PagesContext } from '../Context/contextPages';
import Buttons from '@mui/material/Button';

export default function NovaEmpresa(){

  const [show, setShow] = useState(false);
  const [codigo, setCodigo] = useState(0);
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] =  useState('');
  const [contato, setContato] = useState('');
  const [qtdeLicencas, setQtdeLicencas] = useState(0);
  const [status, setStatus] = useState('Bloqueado');
  const [loading, setLoading] = useState(false);
  const [infor, setInfor] = useState('');
  const [loadList, setLoadList] = useState(false);

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setDada] = useState([]);


  const Swal = require('sweetalert2')

  function getEmpresa(e){
    handleShow();
    setCodigo(e.codigo);
    setNomeFantasia(e.nome_fantasia);
    setRazaoSocial(e.razao_social);
    setCnpj(e.cnpj);
    setEndereco(e.endereco);
    setEmail(e.email);
    setContato(e.contato);
    setStatus(e.status);
    setQtdeLicencas(e.nro_licencas);
    setInfor('Atualizando');
  }


  async function carregarLastId(){
    setLoading(true);
    if(infor === 'Cadastrando'){
      const response = await api.get('empresas/lastid');
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
    setNomeFantasia('');
    setRazaoSocial('');
    setCnpj('');
    setEndereco('');
    setContato('');
    setStatus('Bloqueado');
    setQtdeLicencas();
    setEmail('');
  }

  async function cadastrar(){
    carregarLastId();
    if(nomeFantasia === '' || razaoSocial === '' || cnpj === '' || endereco === '' || contato === '' || email === ''){
      

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Existe, campos em branco.'
      })
    } else{
      setLoading(true);
      let nome_fantasia = nomeFantasia;
      let razao_social = razaoSocial;
      let nro_licencas = qtdeLicencas;

      let obj = {nome_fantasia, razao_social, cnpj, endereco, contato, nro_licencas, email, status}
      const response = await api.post('empresas/nova_empresa', obj);

      if(response.data.success === true){
        setLoading(false);
        handleClose();
        limparCampos();
        carregarLastId();
        Swal.fire(
          'Perfeito!',
          'Empresa cadastrada com sucesso!',
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
    if(nomeFantasia === '' || razaoSocial === '' || cnpj === '' || endereco === '' || contato === '' || email === ''){
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Existe, campos em branco.'
      })
    } else{
      setLoading(true);
      let nome_fantasia = nomeFantasia;
      let razao_social = razaoSocial;
      let nro_licencas = qtdeLicencas;

      let obj = {nome_fantasia, razao_social, cnpj, endereco,email, contato, nro_licencas ,status, codigo}
      const response = await api.post('empresas/atualizar_empresa', obj);

      if(response.data.success === true){
        setLoading(false);
        handleClose();
        limparCampos();
        carregarLastId();
        carregarEmpresas();
        Swal.fire(
          'Perfeito!',
          'Empresa atualizada com sucesso!',
          'success'
        )

      }else{
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.response
        })
        console.log(response.data);
      }
      
    // Swal.fire(
    //   'Perfeito!',
    //   'Empresa cadastrada com sucesso!',
    //   'success'
    // )

    }

  }

  async function carregarEmpresas(){
    setLoadList(true);
    const response = await api.get('empresas');
    
    if(response.data.success === true){
      console.log(response.data.response);
      setDada(response.data.response);
      setLoadList(false);
    }else{
      console.log(response.data.response);
      setLoadList(false);
    }

  }

  useEffect(() =>{

    carregarEmpresas();
    carregarLastId();
    
  },[codigo, infor])

  const columns = [
    {
        name: 'Codigo',
        selector: row => row.codigo,
        sortable: true,
    },
    {
        name: 'Nome Fantasia',
        selector: row => row.nome_fantasia,
        sortable: true,
    },
    {
        name: 'Razão Social',
        selector: row => row.razao_social,
        sortable: true,
    },
    {
        name: 'Cnpj',
        selector: row => row.cnpj,
        sortable: true,
    },
    {
        name: 'Endereço',
        selector: row => row.endereco,
        sortable: true,
    },
    {
      name: 'E-mail',
      selector: row => row.email,
      sortable: true,
  },
    {
        name: 'Contato',
        selector: row => row.contato,
        sortable: true,
    },
    {
      name: 'Licenças',
      selector: row =>  row.nro_licencas,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row =>  row.status,
      sortable: true,
    },
  
    // {
    //   name: 'Status2',
    //   selector: row =>     <Form.Check 
    //   type="switch"
    //   id="custom-switch"
    //   label="Ativo"
    //   value={true}/>,
    //   sortable: true,
    // },


];

    return(
  <div className='content-full'>

    <div className='content-card'>
        <div className='content-header-button'>

        <Buttons variant="contained" onClick={() => {handleShow(); limparCampos(); setInfor('Cadastrando')}}>Nova Empresa</Buttons>
        {/* <Button variant="primary" onClick={() => {handleShow(); limparCampos(); setInfor('Cadastrando')}}>Nova Empresa</Button> */}
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {loading === true ? <LoadingAnim/> : null}
              
        <Modal.Header closeButton>
          <Modal.Title>Nova Empresa</Modal.Title>


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
            <Form.Control 
            type="text" 
            placeholder="Nome Fantasia"
            value={nomeFantasia}
            onChange={(e) => setNomeFantasia(e.target.value)}
            />
          </Form.Group>
        
         </div>
         <div className='row'>
          <Form.Group className="mb-2 col-8" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Codigo</Form.Label> */}
            <Form.Control 
            type="text" 
            placeholder="Razão Social" 
            value={razaoSocial}
            onChange={(e) => setRazaoSocial(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2 col-4" value="spacing-row" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Codigo</Form.Label> */}
            <Form.Control 
            type="text" 
            placeholder="Cnpj"
            maxLength={18} 
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            />
          </Form.Group>
          </div>
        
          <div className='row'>
           
          <Form.Group className="mb-2 col-8" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Codigo</Form.Label> */}
            <Form.Control 
            type="text" 
            placeholder="Endereço" 
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2 col-4" value="spacing-row" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Codigo</Form.Label> */}
            <Form.Control 
            type="phone" 
            placeholder="Tel" 
            value={contato}
            maxLength={11} 
            onChange={(e) => setContato(e.target.value)}
            />
          </Form.Group>
          </div>
          <div className='row'>
          <Form.Group className="mb-2 col-8" controlId="exampleForm.ControlInput1">
            <Form.Control 
              type="number" 
              placeholder="Quantidades de lincenças" 
              min={1}
              max={999}
              required={true}
              plaintext={false}
              defaultValue={qtdeLicencas}
              onChange={(e) => setQtdeLicencas(e.target.value)}
              />

          </Form.Group>
          <Form.Group className="mb-2 col-4" value="spacing-row" controlId="exampleForm.ControlInput1">
          <Form.Select aria-label="Define o status da Empresa" 
            onChange={(e) => setStatus(e.target.value)} defaultValue={status}>
              <option value="Ativo" >Ativo</option>
              <option value="Bloqueado">Bloqueado</option>
            </Form.Select>
          </Form.Group>           
          </div>

          
          <Form.Group className="mb-2 col-12" value="spacing-row" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Codigo</Form.Label> */}
            <Form.Control 
            type="email" 
            placeholder="E-mail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
       
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
        onRowClicked={(e) => getEmpresa(e)}
        />
      }
       </div> 
      
{/* ---------------------------------------------------------------------------------------- */}
    </div>

  </div>
    )
}