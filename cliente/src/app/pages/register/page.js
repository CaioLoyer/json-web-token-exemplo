'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { postUser } from '@/app/functions/handlerAcessAPI';

export default function formReg(){
  const [user, setUser] = useState({
    nome: '',
    senha: '',
  });
  const { push } = useRouter();


  const handlerLogin = async (e) => {
    e.preventDefault();
    try{
      await postUser(user);
      return push('/pages/dashboard');
    }catch{
          return toast.error("Erro na Aplicação");
    }
  };

  return (
    <div classnome="login">
      <div classnome="card-header">
        <h1>Registrar Dados</h1>
      </div>
      <div classnome="b">
        <form classnome="card" onSubmit={handlerLogin}>
        <div classnome="card-content">
        <div classnome="card-content-area">
            <input
                placeholder="Nome"
                type="nome"
                onChange={(e) => {
                  setUser({ ...user, nome: e.target.value });
                }}>
            </input>
            </div>

          
            

            <div classnome="card-content-area">
            <input
                placeholder="Senha"
                type="senha"
                onChange={(e) => {
                  setUser({ ...user, senha: e.target.value });
                }}>
            </input>
            </div>
          </div>
          
          <button>Registrar</button>
          <ToastContainer />
        </form>
        <p>
          <Link href="/pages/dashboard">Dashboard</Link>
        </p>
      </div>
    </div>
  );
};