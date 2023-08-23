import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const servidor = express();
servidor.use(express.json());
servidor.use(cors({
	//origin: 'http://meudominio.com'
}));
const prisma = new PrismaClient(
	//{log:['query']}
);

const bcryptSaltRounds = 10;

servidor.listen(
	process.env.PORTA_DO_SERVIDOR,
	()=>console.log("iniciou server, ouvindo porta "+process.env.PORTA_DO_SERVIDOR)
);

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
		console.log("GET jogo/anuncios, qtde="+anuncios.length+", ip="+req.ip);
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
				usaChatDeVoz: body.usaChatDeVoz
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

servidor.put('/registrar', async (req, resp)=>{
	try {
		const body = req.body;
		console.log("PUT registrar, usuário="+body.nomeDoUsuario+", ip="+req.ip);
		const usuarioJaExiste = await prisma.usuarios.findUnique({
			select: {nome: true},
			where: {nome: body.nomeDoUsuario}
		});
		if (usuarioJaExiste)
			return resp.status(409).json({erro: 'Este nome de usuário não está disponível.'});
		const senhaHash = await bcrypt.hash(body.senha, bcryptSaltRounds);
		const usuario = await prisma.usuarios.create({
			data: {
				nome: body.nomeDoUsuario,
				senhaHash: senhaHash
			}
		});
		return resp.status(201).json({nome: usuario.nome});
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
})

servidor.post('/entrar', async (req, resp)=>{
	try {
		const body = req.body;
		console.log("POST entrar, usuário="+body.nomeDoUsuario+", ip="+req.ip);
		const usuarioExiste = await prisma.usuarios.findUnique({
			where: {nome: body.nomeDoUsuario}
		});
		if (!usuarioExiste)
			return resp.status(404).json({erro: 'Este nome de usuário não está registrado.'});
		const senhaCorreta = await bcrypt.compare(body.senha, usuarioExiste.senhaHash);
		if (!senhaCorreta)
			return resp.status(401).json({erro: 'Senha incorreta.'});
		return resp.status(201).json({nome: usuarioExiste.nome});
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
})

servidor.post('/alterarsenha', async (req, resp)=>{
	try {
		const body = req.body;
		console.log("POST alterarsenha, usuário="+body.nomeDoUsuario+", ip="+req.ip);
		const usuarioExiste = await prisma.usuarios.findUnique({
			where: {nome: body.nomeDoUsuario}
		});
		if (!usuarioExiste)
			return resp.status(404).json({erro: 'Este nome de usuário não está registrado.'});
		const senhaCorreta = await bcrypt.compare(body.senha, usuarioExiste.senhaHash);
		if (!senhaCorreta)
			return resp.status(401).json({erro: 'Senha incorreta.'});
		const novaSenhaHash = await bcrypt.hash(body.novaSenha, bcryptSaltRounds);
		await prisma.usuarios.update({where: {nome: body.nomeDoUsuario}, data: {senhaHash: novaSenhaHash}})
		return resp.status(200).json({ok: 'Senha alterada com sucesso.'});
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
})