import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";


function App() {
  const [repositories, setRepositories] = useState([]);


  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    api.post('repositories',{
      title: `Title ${new Date()}`,
      url: `http://www.globo.com.br`,
      techs: ['Node', 'React']
    }).then(response =>{
      setRepositories([...repositories, response.data])
    });
  }

  async function handleRemoveRepository(id) {
    // TODO
    api.delete(`repositories/${id}`).then(response => {
      if(response.status === 204){
        // removido com sucesso
        let repos = repositories.filter(r => r.id !== id);
        setRepositories(repos);
      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
              <li key={repository.id}>
                {repository.title}

                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
          );
        })}        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
