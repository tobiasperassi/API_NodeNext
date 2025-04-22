import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express(); //Uma intância onde configura as rotas e inicia o servidor
const port = 3001 //Porta por onde o servidor vai "escutar"

const corsOptions = {
    origin: 'http://localhost:3000', // Permite apenas este origin
    optionsSuccessStatus: 200 // Para navegadores mais antigos
};

app.use(cors(corsOptions)); // Aplica as configurações de CORS
app.use(express.json());

app.get('/tarefas', async (req, res) => {
    try {
        const pegarTarefas = await prisma.tarefas.findMany()
        res.json(pegarTarefas); //Desestrutura tudo da tabela e converte para json
      } 
      catch (err) {
        console.error('Erro no banco:', err);
        res.status(500).json({ 
            error: 'Erro ao buscar tarefas',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
})

app.post('/tarefas', async (req, res) => {
    const { titulo } = req.body //faz uma requisição para o body(dados que o usuário manda) e então adiciona o título no array tarefas
    if (!titulo || !titulo.trim()) {
        return res.status(400).json({ error: 'Título é obrigatório' });
    }
    try {
        const adicionarTarefas = await prisma.tarefas.create({
            data: {
              titulo: titulo.trim(),
            },
          })
          res.status(201).json(adicionarTarefas)
    } catch (err) {
        console.error('Erro no banco:', err);
        res.status(500).json({ 
            error: 'Erro ao criar tarefa',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        })
    }
})

app.put('/tarefas/:id', async (req, res) => {
    const id = parseInt(req.params.id) //Pega o id passado na url e converte para número
    try {
        const atualizarTarefa = await prisma.tarefas.update({
            where: {
              id: id,
            },
            data: {
              concluida: true,
            },
          })
        res.json(atualizarTarefa);
    } catch (err) {
        console.error('Erro no banco:' , err);
        if (err.code === 'P2025') { // Erro do Prisma para registro não encontrado
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        res.status(500).json({error: 'Erro ao atualizar tarefa'});
    }
})

app.delete('/tarefas/:id', async (req, res) => {
    const id = parseInt(req.params.id) //pega o id e converte para inteiro em uma outra variável
    try {
        await prisma.tarefas.delete({
            where: {
              id: id,
            },
          })
        res.status(204).send();
    } catch (err) {
        console.error('Erro no banco:' , err);
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        res.status(500).json({error: 'Erro ao deletar tarefa'});
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})