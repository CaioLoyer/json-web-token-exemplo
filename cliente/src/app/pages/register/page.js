'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { postUser } from '@/app/functions/handlerAcessAPI';
import styles from "./style.css";

export default function formReg(){
  const [user, setUser] = useState({
    nome: '',
    senha: '',
    confirmar: '',
  });
  const { push } = useRouter();
  const { refresh } = useRouter();

  useEffect(() => {
    const newUser = JSON.parse(localStorage.getItem("registrarUser"));
    if (newUser) {
      setUser(newUser);
    }
  }, []);


  const handlerRegister  = async (e) => {
    e.preventDefault();
    try{
      await postUser(user);
      toast.error("Npvp Usuario Registrado")
      return push('/pages/dashboard');
    }catch{
      refresh();
      return toast.error("Erro na Aplicação");
    }
  };

  return(
    <div id="formRegister">
        <h1>Registrar Novo Usuário</h1>
        <div id='campos'>
        <form classnome="card" onSubmit={handlerRegister}>
        <div classnome="card-content">
        <div classnome="card-content-area">
            <input
                placeholder="Nome"
                type="text"
                onChange={(e) => {setUser({ ...user, nome: e.target.value });
                }}>
            </input>
            </div>
            <div className="card-content-area">
            <input
                placeholder="Senha"
                type="password"
                onChange={(e) => {setUser({ ...user, senha: e.target.value });
                }}>
            </input>
            <input
                placeholder="Confirmar Senha"
                type="password"
                onChange={(e) => {setUser({ ...user, confirmar: e.target.value });
                }}>
            </input>
            </div>     
          <button id='enviar'>Registrar</button>          
          <ToastContainer />
          </div>
        </form>
        </div>
    </div>
  );
};