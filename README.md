# Projeto_POO

Esse projeto é uma API simples de um task list de atividades, provas e projetos de materias de um aluno salvando apenas em memoria

Para rodar o projeto é necessario ter a versão do node 22.9.0 e a versão do npm 10.8.3

clonar o repositorio e rodar o comando npm install e npm run dev. Obs: a porta 3000 deve estar livre ou deve ser alterada no arquivo server.ts

rotas da API:

# Aluno:
    - POST => /
        - Cria um aluno. Deve ser passado um JSON do formato:
            {
                "matricula": "999999999", 
                "curso": "meu curso",
                "semIng": "2024-1"
            }

    -PUT => /
        - Atualiza o aluno. Deve ser passado um JSON podendo ter cada um dos campos do JSON de criação;

# Materias

    - POST => /materias
        - Adiciona uma materia a lista de materias do aluno. Deve ser passado um JSON do formato: 
            {
                "codigo": "AAAA99",
                "nome": "nome da materia"
            }

    - GET => /materias
        - Retorna todas as matérias que o aluno ja cadastrou e suas tasks

    - DELETE =>    /materias/:codigo
        - Deleta a materia com o codigo que foi passado na URL

    - PUT => /materias/:codigo
        - Atualiza o codigo ou o nome da materia com o codigo passado na URL (So atualiza um de cada vez)

# Tasks

    - POST => /tasks/:codigoDaMateria
        - Adiciona uma task, prova ou projeto na lista de task da materia mandada na URL. Deve ser passado um JSON em um dos sequintes formatos:
            Se for uma task Simples: 
            {
                "dataPssada": "DD/MM/AAAA",
                "dataDeEntrega": "DD/MM/AAAA"
            }

            Se for uma Prova: 
            {
                "dataPssada": "DD/MM/AAAA",
                "dataDeEntrega": "DD/MM/AAAA",
                "valor": 10 (um numero de 0 a 10)
            }

            Se for um Projeto: 
            {
                "dataPssada": "DD/MM/AAAA",
                "dataDeEntrega": "DD/MM/AAAA",
                "valor": 10 (um numero de 0 a 10),
                "descricao": "Uma descricao do projeto"
            }
    
    - GET => /materias/:codigo/tasks
        - Retorna todas as tasks que a materia com o codigo do parametro da URL tem podendo mandar o querry params "status" que pode ser "incompletas", oque resultada na busca de todas as tasks incompletas, ou "completas" que retorna todas as tasks concluidas da materia

    - GET => /materias/:codigo/tasks/:id
        - Retorna a task do parametro id passado na URL.

    - PATCH => /materias/:codigo/tasks/:id
        - Completa uma task com o id passado como parametro na URL, caso a task seja uma Prova ou um Projeto deve ser enviado um json no formato:
        {
            "nota": 10(um numero de 0 ate o valor da prova ou projeto)
        }

    - PUT => /materias/:codigo/tasks/:id
        - Atualiza os dados da task com id passado pelo parametro da URL, deve ser enviado o mesmo JSON da cricao sendo que as datas são sempre obrigatorias de serem passadas e o valor e descricao sao optativas.

    - DELETE => /materias/:codigo/tasks/:id
        - Deleta a task com id passado pelo parametro da URL.

