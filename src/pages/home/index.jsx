import {useEffect, useState, useRef} from 'react'
import './style.css'
import api from '../../services/api'


// React hooks
function Home() {
  // const [count, setCount] = useState(0)
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputEmail = useRef()
  const inputIdade = useRef()

  async function getUser(){
    const userFromApi = await api.get('/usuario');

    setUsers(userFromApi.data)
  }

   async function CreateUser() {
    await api.post('/usuario', {
      nome: inputName.current.value,
      email: inputEmail.current.value,
      idade: inputIdade.current.value
      
    });


    getUser();
   }

    async function deleteUser(id) {
      await api.delete(`/usuario/${id}`);
         getUser();
    }


  useEffect(() => {
    getUser();
  }, [])


  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input name="nome" placeholder="Nome do usuario" type="text" ref={inputName}/>
        <input name="email" placeholder="Email do usuario" type="email" ref={inputEmail} />
        <input name="idade" placeholder="Idade do usuario" type="number" ref={inputIdade} />
        <button type="button" onClick={CreateUser}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id_usuario} className="card">
          <div>
            <p>
              Nome: <span>{user.nome}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
            <p>
              Idade: <span>{user.idade}</span>
            </p>
          </div>
          <div>
            <button onClick={() => deleteUser(user.id_usuario)}>
              <p>D</p>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home
