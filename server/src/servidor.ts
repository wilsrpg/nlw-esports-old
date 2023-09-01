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

/*
servidor.post('/anuncios', async (req, resp)=>{
	try {
		const body = req.body;
		//console.log("POST anuncios, ip="+req.ip+", body:");

		let tempoDeJogoEmAnos = 0, tempoDeJogoEmAnos2 = 0;
		let noMaximo = false, entre = false;
		if (body.tempoDeJogoAnos)
			tempoDeJogoEmAnos = parseInt(body.tempoDeJogoAnos);
		if (body.tempoDeJogoMeses)
			tempoDeJogoEmAnos += parseInt(body.tempoDeJogoMeses)/12;
		if (body.opcoesTempo) {
			if (body.opcoesTempo == 'noMaximo')
				noMaximo = true;
			else if (body.opcoesTempo == 'entre' && (body.tempoDeJogoAnos2 || body.tempoDeJogoMeses2)) {
				entre = true;
				if (body.tempoDeJogoAnos2)
					tempoDeJogoEmAnos2 = parseInt(body.tempoDeJogoAnos2);
				if (body.tempoDeJogoMeses2)
					tempoDeJogoEmAnos2 += parseInt(body.tempoDeJogoMeses2)/12;
			}
		}
	
		if (!body.usaChatDeVoz) body.usaChatDeVoz = '%';
		else if (body.usaChatDeVoz == 'sim') body.usaChatDeVoz = 1;
		else if (body.usaChatDeVoz == 'não') body.usaChatDeVoz = 0;
	
		//console.log(body);
	
		//const {id: jogoId} = await db.get(`SELECT id FROM Jogos WHERE nomeUrl = (?);`, [body.jogo]);
		//console.log(jogoId);
	
		//const b2 = {
		//	//jogoId: jogoId,
		//	jogo: body.jogo,
		//	nome: body.nome,
		//	naoContem: naoContem,
		//	//discord: body.discord,
		//	tempoDeJogoEmAnos: tempoDeJogoEmAnos,
		//	noMaximo: noMaximo,
		//	entre: entre,
		//	tempoDeJogoEmAnos2: tempoDeJogoEmAnos2,
		//	//emTodos: emTodos,
		//	//diasQueJoga: diasQueJoga,
		//	//deHora: deHora,
		//	//ateHora: ateHora,
		//	//virandoNoite: virandoNoite,
		//	usaChatDeVoz: body.usaChatDeVoz
		//}
		//console.log('body convertido:');
		//console.log(b2);
	
		let buscaJogo = {};
		if (body.jogo) {
			const jogoId = await prisma.jogos.findUniqueOrThrow({
				select: {id: true},
				where: {nomeUrl: body.jogo}
			});
			buscaJogo = {jogoId: jogoId};
		}

		let buscaNomeDoUsuario = {};
		if (body.nome) {
			if (!body.nomeOpcoes)
				buscaNomeDoUsuario = {nomeDoUsuario: {contains: body.nome}};
			if (body.nomeOpcoes == 'comecaCom')
				buscaNomeDoUsuario = {nomeDoUsuario: {startsWith: body.nome}};
			if (body.nomeOpcoes == 'terminaCom')
				buscaNomeDoUsuario = {nomeDoUsuario: {endsWith: body.nome}};
			if (body.nomeOpcoes == 'exatamente')
				buscaNomeDoUsuario = {nomeDoUsuario: body.nome};
			if (body.nomeOpcoes == 'naoContem')
				buscaNomeDoUsuario = {not: {nomeDoUsuario: {contains: body.nome}}};
		}

		let anuncios = await prisma.anuncios.findMany({
			select: {
				id: true,
				jogoId: true,
				jogo: {
					select: {
						nomeUrl: true
					}
				},
				nomeDoUsuario: true,
				tempoDeJogoEmAnos: true,
				diasQueJoga: true,
				deHora: true,
				ateHora: true,
				usaChatDeVoz: true,
				dataDeCriacao: true
			},
			where: {
				buscaJogo,
				buscaNomeDoUsuario
			},
			orderBy: {dataDeCriacao: 'desc'}
		});
		nomeDoJogo?
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

	let anuncios = await db.all(
		`SELECT Anuncios.id, jogoId, Jogos.nome AS nomeDoJogo, nomeDoUsuario, tempoDeJogoEmAnos,
			diasQueJoga, deHora, ateHora, usaChatDeVoz, dataDeCriacao
		FROM Anuncios JOIN Jogos ON jogoId = Jogos.id
		WHERE Jogos.nomeUrl LIKE (?)
		  AND nomeDoUsuario ${naoContem ? 'NOT' : ''} LIKE (?)
			AND tempoDeJogoEmAnos ${noMaximo ? '<=' : '>='} (?)
			${'' / * AND diasQueJoga LIKE (?)
			AND deHora <= (?)
			AND ateHora >= (?) * / }
			AND usaChatDeVoz LIKE (?)
		ORDER BY dataDeCriacao DESC;`,
		[body.jogo, body.nome, tempoDeJogoEmAnos, body.usaChatDeVoz]
	);

	//console.log("ants do filtro d tempoDeJogoEntre, qtde= "+anuncios.length);

	if (entre)
		anuncios = anuncios.filter(anuncio=>anuncio.tempoDeJogoEmAnos <= tempoDeJogoEmAnos2);
	
	//console.log("dps do filtro d tempoDeJogoEntre e ants do d disponibilidade, qtde= "+anuncios.length);
		
	let diasQueJoga;
  const dias = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
	let deHora;
	let ateHora;
	//let virandoNoite = false;
	let disponivelEmTodos = false;
	let anunciosOu = [];

	if (body.qtdeFiltrosDisponibilidade) {
		for (let i = 0; i < body.qtdeFiltrosDisponibilidade; i++) {
			//console.log('ants do filtro '+i);
			//console.log(anuncios);
			
      let id = i == 0 ? '' : i+1;
			if (body['quando'+id] == 'qualquerDia')
				diasQueJoga = '.*';
			else if (body['quando'+id] == 'todoDia')
				diasQueJoga = '0,1,2,3,4,5,6';
			else if (body['quando'+id] == 'semana')
				diasQueJoga = '.*1,2,3,4,5.*';
			else if (body['quando'+id] == 'finsDeSemana')
				diasQueJoga = '0.*6';
			else
				dias.some((dia,i)=>{
					if (dia == body['quando'+id]) {
						diasQueJoga = '.*'+i+'.*';
						return true;
					}
				});

			//console.log('diasQueJoga'+id+'= '+diasQueJoga);

			if (body['de'+id])
				deHora = converterHoraStringParaMinutos(body['de'+id]);
			else
				deHora = null;
			if (body['ate'+id])
				ateHora = converterHoraStringParaMinutos(body['ate'+id]);
			else
				ateHora = null;
			//if (deHora > ateHora)
			//	virandoNoite = true;
			if (body.opcoesDisponibilidade)
				disponivelEmTodos = true;
	
			//console.log('deHora~ateHora= '+deHora+'~'+ateHora);

			//if(!disponivelEmTodos) {
			//	;
			//} else
			anuncios = anuncios.filter(anuncio=>{
			if (!body['de'+id])
					deHora = anuncio.deHora;
			if (!body['ate'+id])
					ateHora = anuncio.ateHora;
				//let anuncioVirandoNoite = anuncio.deHora > anuncio.ateHora;
				let duracaoBusca = (1440 + ateHora - deHora) % 1440;
				//if (duracaoBusca < 0) duracaoBusca += 1440;
				let duracaoAnuncio = (1440 + anuncio.ateHora - anuncio.deHora) % 1440;
				//if (duracaoAnuncio < 0) duracaoAnuncio += 1440;
				//console.log('duração busca/anúncio= '+duracaoBusca+'/'+duracaoAnuncio);
				let diferençaInicio = (1440 - anuncio.deHora + deHora) % 1440;
				//duracaoAnuncio = anuncio.deHora > deHora ? anuncio.deHora + duracaoAnuncio - 1440 - deHora : duracaoAnuncio;
				//console.log('duração anúncio2= '+duracaoAnuncio+', condições:');

				//console.log('tá nos dias que joga='+anuncio.diasQueJoga.match(diasQueJoga) ? true : false);
				//console.log('tá no período q joga='+duracaoAnuncio - diferençaInicio >= duracaoBusca);

				let passou = anuncio.diasQueJoga.match(diasQueJoga) && duracaoAnuncio - diferençaInicio >= duracaoBusca;
				if (!disponivelEmTodos){
					if (passou)
						anunciosOu.push(anuncio);
					passou = !passou;
				}
				return passou;
			});
			//console.log('dps do filtro '+i);
			//console.log(anuncios);
			
		}
		if (!disponivelEmTodos)
			anuncios = anunciosOu.sort((a,b)=>b.dataDeCriacao - a.dataDeCriacao);
	}
	//console.log("dps do filtro d disponibilidade, qtde="+anuncios.length);

	//console.log(anuncios);
	console.log("POST anuncios, qtde="+anuncios.length+", ip="+req.ip);
	return resp.json(anuncios.map(anuncio=>{
		return {...anuncio,
			diasQueJoga: anuncio.diasQueJoga.split(','),
			deHora: converterMinutosParaHoraString(anuncio.deHora),
			ateHora: converterMinutosParaHoraString(anuncio.ateHora)
		};
	}));
})
*/


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

servidor.listen(
	process.env.PORTA_DO_SERVIDOR,
	()=>console.log("iniciou server, ouvindo porta "+process.env.PORTA_DO_SERVIDOR)
);