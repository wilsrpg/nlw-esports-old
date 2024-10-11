import express from 'express'
import cors from 'cors'
import { PrismaClient, Prisma } from '@prisma/client';

const servidor = express();
servidor.use(express.json());
servidor.use(cors({
	//origin: 'http://meudominio.com'
}));
const prisma = new PrismaClient(
	//{log:['query']}
);

servidor.get('/', async (req, resp)=>{
	console.log("GET /, ip="+req.ip);
	return resp.json("Servidor acessado com sucesso.");
})

servidor.get('/ver-bd', async (req, resp)=>{
	try {
		const tables = Prisma.ModelName;
		console.log("GET ver-bd, ip="+req.ip);
		return resp.json(await prisma.jogos.findMany());
		//return resp.json(tables);
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
})

servidor.get('/jogos', async (req, resp)=>{
	try {
		const jogos = await prisma.jogos.findMany({
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
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
})

servidor.get('/jogos/:jogoNomeUrl', async (req, resp)=>{
	try {
		const jogoNomeUrl = req.params.jogoNomeUrl;
		const jogo = await prisma.jogos.findUniqueOrThrow({
			where: {nomeUrl: jogoNomeUrl}
		});
		console.log("GET jogo="+jogo.nome+", ip="+req.ip);
		return resp.json(jogo);
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
})

servidor.get('/anuncios', async (req, resp)=>{
	try {
		const anuncios = await prisma.anuncios.findMany({
			select: {
				id: true,
				nomeDoUsuario: true,
				tempoDeJogoEmAnos: true,
				diasQueJoga: true,
				deHora: true,
				ateHora: true,
				usaChatDeVoz: true
			},
			orderBy: {dataDeCriacao: 'desc'}
		});
		console.log("GET anuncios, qtde="+anuncios.length+", ip="+req.ip);
		return resp.json(anuncios.map(anuncio=>{
			return {...anuncio,
				diasQueJoga: anuncio.diasQueJoga.split(','),
				deHora: converterMinutosParaHoraString(anuncio.deHora),
				ateHora: converterMinutosParaHoraString(anuncio.ateHora)
			};
		}));
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
})

//só usado no modal de jogo selecionado, na página inicial
servidor.get('/jogos/:jogoNomeUrl/anuncios', async (req, resp)=>{
	try {
		const jogoNomeUrl = req.params.jogoNomeUrl;
		const jogo = await prisma.jogos.findUniqueOrThrow({
			select: {id: true},
			where: {nomeUrl: jogoNomeUrl}
		});
		const anuncios = await prisma.anuncios.findMany({
			select: {
				id: true,
				nomeDoUsuario: true,
				tempoDeJogoEmAnos: true,
				diasQueJoga: true,
				deHora: true,
				ateHora: true,
				usaChatDeVoz: true,
				dataDeCriacao: true
			},
			where: {jogoId: jogo.id},
			orderBy: {dataDeCriacao: 'desc'}
		});
		console.log("GET jogos/"+jogoNomeUrl+"/anuncios, qtde="+anuncios.length+", ip="+req.ip);
		return resp.json(anuncios.map(anuncio=>{
			return {...anuncio,
				diasQueJoga: anuncio.diasQueJoga.split(','),
				deHora: converterMinutosParaHoraString(anuncio.deHora),
				ateHora: converterMinutosParaHoraString(anuncio.ateHora)
			};
		}));
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
})

//usado no modal conectar, nos cartões de anúncios
servidor.get('/anuncios/:id/discord', async (req, resp)=>{
	try {
		const anuncioId = req.params.id;
		const anuncio = await prisma.anuncios.findUniqueOrThrow({
			select: {discord: true},
			where: {id: anuncioId}
		});
		console.log("GET anuncios/discord, discord="+anuncio.discord+", ip="+req.ip);
		return resp.json({discord: anuncio.discord});
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
})

servidor.put('/jogos/:id/anuncios', async (req, resp)=>{
	try {
		const jogoId = req.params.id;
		const body = req.body;
		console.log("PUT anuncio, usuário="+body.nomeDoUsuario+", ip="+req.ip);
		const anuncio = await prisma.anuncios.create({
			data: {
				jogoId: jogoId,
				nomeDoUsuario: body.nomeDoUsuario,
				tempoDeJogoEmAnos: body.tempoDeJogoEmAnos,
				discord: body.discord,
				diasQueJoga: body.diasQueJoga,
				deHora: converterHoraStringParaMinutos(body.deHora),
				ateHora: converterHoraStringParaMinutos(body.ateHora),
				usaChatDeVoz: body.usaChatDeVoz == 'on' ? true : false
			}
		});
		return resp.status(201).json(anuncio);
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
})

function converterHoraStringParaMinutos(horaString:string) {
	const [horas, minutos] = horaString.split(':').map(Number);
	return horas*60 + minutos;
}

function converterMinutosParaHoraString(minutos:number) {
	const hora = Math.floor(minutos/60);
	const minuto = minutos%60;
	return String(hora).padStart(2,'0') + ":" + String(minuto).padStart(2,'0');
}

servidor.listen(
	process.env.PORTA_DO_SERVIDOR,
	()=>console.log("iniciou servidor, ouvindo porta "+process.env.PORTA_DO_SERVIDOR)
);