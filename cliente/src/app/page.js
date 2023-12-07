'use client'
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [user, setUser] = useState({
    nome: '',
    senha: '',
  });
  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
    const userAuth = await handlerAcessUser(user);
    if(userAuth.token === undefined){
      toast.error("Erro no nome ou senha!")
    }
      push('/pages/dashboard');
    } catch {
      toast.error ('A aplicação deu erro')
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handlerLogin}>
      <input
          placeholder='Nome'
          type="name"
          onChange={(e) => { setUser({ ...user, nome: e.target.value }) }}>
        </input>
        <input
          placeholder='Senha'
          type='senha'
          onChange={(e) => { setUser({ ...user, senha: e.target.value }) }}>
        </input>
        <button>Entrar</button>
        <ToastContainer/>
      </form>
    </div>
  )
}
