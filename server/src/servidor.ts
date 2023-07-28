import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client';

const servidor = express();
servidor.use(express.json());
servidor.use(cors({
	//origin: 'http://meudominio.com'
}));
const prisma = new PrismaClient(
	//{log:['query']}
);

servidor.get('/jogos', async (req, resp) => {
	const jogos = await prisma.jogo.findMany({
		include: {
			_count: {
				select: {
					anuncios: true
				}
			}
		}
	});
	console.log("GET jogos, qtde="+jogos.length+", ip="+req.ip);
	return resp.json(jogos);
})

servidor.get('/anuncios', async (req, resp) => {
	const anuncios = await prisma.anuncio.findMany();
	console.log("GET anuncios, qtde="+anuncios.length+", ip="+req.ip);
	return resp.json(anuncios);
})

servidor.post('/jogos/:id/anuncios', async (req, resp) => {
	const jogoId = req.params.id;
	const body = req.body;
	const anuncio = await prisma.anuncio.create({
		data: {
			jogoId: jogoId,
			nomeDoUsuario: body.nomeDoUsuario,
			tempoDeJogoEmAnos: body.tempoDeJogoEmAnos,
			discord: body.discord,
			diasQueJoga: body.diasQueJoga,
			deHora: converterHoraStringParaMinutos(body.deHora),
			ateHora: converterHoraStringParaMinutos(body.ateHora),
			usaChatDeVoz: body.usaChatDeVoz
		}
	});
	console.log("POST anuncio, usuário="+body.nomeDoUsuario+", ip="+req.ip);
	return resp.status(201).json(anuncio);
})

function converterHoraStringParaMinutos(horaString:string) {
	const [horas, minutos] = horaString.split(':').map(Number);
	return horas*60 + minutos;
}

servidor.get('/jogos/:id/anuncios', async (req, resp) => {
	const jogoId = req.params.id;
	const anuncios = await prisma.anuncio.findMany({
		select: {
			id: true,
			nomeDoUsuario: true,
			tempoDeJogoEmAnos: true,
			diasQueJoga: true,
			deHora: true,
			ateHora: true,
			usaChatDeVoz: true
		},
		where: {jogoId: jogoId},
		orderBy: {dataDeCriacao: 'desc'}
	});
	console.log("GET jogo/anuncios, qtde="+anuncios.length+", ip="+req.ip);
	return resp.json(anuncios.map((anuncio)=>{
		return {...anuncio,
			diasQueJoga: anuncio.diasQueJoga.split(','),
			deHora: converterMinutosParaHoraString(anuncio.deHora),
			ateHora: converterMinutosParaHoraString(anuncio.ateHora)
		};
	}));
})

function converterMinutosParaHoraString(minutos:number) {
	const hora = Math.floor(minutos/60);
	const minuto = minutos%60;
	return String(hora).padStart(2,'0') + ":" + String(minuto).padStart(2,'0');
}

servidor.get('/anuncios/:id/discord', async (req, resp) => {
	const anuncioId = req.params.id;
	const anuncio = await prisma.anuncio.findUniqueOrThrow({
		select: {discord: true},
		where: {id: anuncioId}
	});
	console.log("GET anuncios/discord, discord="+anuncio.discord+", ip="+req.ip);
	return resp.json({discord: anuncio.discord});
})

servidor.listen(
	process.env.PORTA_DO_SERVIDOR,
	()=>console.log("iniciou server, ouvindo porta "+process.env.PORTA_DO_SERVIDOR)
);