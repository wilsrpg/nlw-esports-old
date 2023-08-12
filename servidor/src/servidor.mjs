import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { config as dotenvConfig } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const servidor = express();
servidor.use(express.json());
servidor.use(cors({
	//origin: 'http://meudominio.com'
}));

dotenvConfig();

const abrirBanco = open({
	filename: '../db/db.sqlite',
	driver: sqlite3.Database
});

const bcryptSaltRounds = 10;

//const myPlaintextPassword = 'not_bacon';
//const someOtherPlaintextPassword = 'not_bacom';
//bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//	console.log('hash='+hash);
//	bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//		console.log('true='+result);
//	});
//	bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//		console.log('fals='+result);
//	});
//});

/*
const pass = '!]m:#$xDY@p/QDeW';
//examinando o hash de 2^10 até 2^20
console.time(`Time`);
let saltRound = 10;
//for (let saltRound = 10; saltRound <= 15; saltRound++) {
  bcrypt.hash(pass, saltRound)
  .then(passHashed=> {
    //console.time(`Time: ${saltRound}`);
    //console.log(passHashed);
    //console.timeEnd(`Time: ${saltRound}`);
		//if (saltRound==15)
			console.timeEnd(`Time`);
  });
//}
*/

/*
//informado no formulário
async function check(username, pass) {
  //buscando no banco a senha do usuário
	let passHashedDB = '$2b$12$dbstSfo1FN9jnZOSQ96N7eMMMe9FFI2QmYWo6E44WhutEUg9kZOcW'
	const match = await bcrypt.compare(pass, passHashedDB);
	if (match)
		console.log('Granted!')
	else
		console.log('Access Denied')
}

//chamando a função check
let userPass = '!]m:#$xDY@p/QDeW'
check('JediMaster',userPass);
*/

async function iniciar() {
	//const db = await abrirBanco;
	//await db.run(`CREATE TABLE IF NOT EXISTS teste (id INTEGER PRIMARY KEY);`);
	//await db.run(`ALTER TABLE Jogo RENAME TO Jogos;`);
	//await db.run(`ALTER TABLE Anuncio RENAME TO Anuncios;`);
	//await db.run(`CREATE TABLE IF NOT EXISTS Usuarios (
	//	id INTEGER PRIMARY KEY,
	//	nome TEXT NOT NULL UNIQUE,
	//	senhaHash TEXT NOT NULL,
	//	dataDeCriacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);`
	//);
	
	//const ultimoAnuncio = await db.get('SELECT * FROM Anuncios WHERE dataDeCriacao = (SELECT MAX(dataDeCriacao) FROM Anuncios);');
	//const anuncioEspecifico = await db.get('SELECT * FROM Anuncios WHERE id = "a4a5b098-7cde-4a45-842f-57ad0706ab12";');
	//console.log(ultimoAnuncio.dataDeCriacao);
	//const d = new Date(ultimoAnuncio.dataDeCriacao);
	//console.log(d.getTime());
	//const anunciosErrados = await db.all('SELECT * FROM Anuncios WHERE dataDeCriacao > 1690864594730;');
	//console.log(anunciosErrados.length);
	//db.run(`CREATE TABLE IF NOT EXISTS Anuncios2 (
	//	id TEXT PRIMARY KEY NOT NULL,
	//	jogoId TEXT NOT NULL,
	//	nomeDoUsuario TEXT NOT NULL,
	//	tempoDeJogoEmAnos INTEGER NOT NULL,
	//	discord TEXT NOT NULL,
	//	diasQueJoga TEXT NOT NULL,
	//	deHora INTEGER NOT NULL,
	//	ateHora INTEGER NOT NULL,
	//	usaChatDeVoz BOOLEAN NOT NULL,
	//	dataDeCriacao INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP);`
	//);

	//const anunciosCertos = await db.all('SELECT * FROM Anuncios WHERE dataDeCriacao > 1690864594730;');
	//await db.run(`INSERT INTO Anuncios2 SELECT * FROM Anuncios WHERE dataDeCriacao > 1690864594730;`);
	//anunciosCertos.map(anu=>db.run(`UPDATE Anuncios2 SET dataDeCriacao = ? WHERE dataDeCriacao > 1690864594730;`,
	//	[new Date(anu.dataDeCriacao).getTime()]
	//));
	//anunciosCertos.map(anu=>db.run(`UPDATE Anuncios2 SET dataDeCriacao = ? WHERE dataDeCriacao > 1690864594730;`,
	//	[new Date(anu.dataDeCriacao).getTime()]
	//));

	//anunciosCertos.map(an=>{an.dataDeCriacao = new Date(an.dataDeCriacao).getTime()});
	//console.log(anunciosCertos);
	//let anunciosStringInterrogacoes = anunciosCertos.map(()=>'(?)').join();
	//anunciosCertos.map(async(an)=>{await db.run(`INSERT INTO Anuncios2 VALUES (?);`, an);});
	//await db.run(`INSERT INTO Anuncios2
	//	(id, jogoId, nomeDoUsuario, tempoDeJogoEmAnos, discord, diasQueJoga, deHora, ateHora, usaChatDeVoz, dataDeCriacao)
	//	VALUES `+anunciosStringInterrogacoes+';',
	//	anunciosCertos,
	//	function(err) {
	//		if (err) {
	//			return console.error(err.message);
	//		}
	//		console.log(`Rows inserted ${this.changes}`);
	//	}
	//);
	//const teste = await db.get('SELECT * FROM Anuncios2;');
	//console.log(teste);
	//await db.run(`DROP TABLE Anuncio;`);
	//await db.run(`ALTER TABLE Anuncios2 RENAME TO Anuncios;`);

	//await db.migrate();
	servidor.listen(
		process.env.PORTA_DO_SERVIDOR,
		()=>console.log("iniciou server, ouvindo porta "+process.env.PORTA_DO_SERVIDOR)
	);
}
iniciar();

servidor.get('/jogos', async (req, resp)=>{
	const db = await abrirBanco;
	const jogos = await db.all(`SELECT * FROM Jogos;`);
	console.log("GET jogos, qtde="+jogos.length+", ip="+req.ip);
	const jogosQtde = await db.all(
		`SELECT Jogos.id, COUNT(Anuncios.jogoId) as qtdeAnuncios
		FROM Jogos LEFT JOIN Anuncios
		ON Jogos.id=Anuncios.jogoId
		GROUP BY Jogos.id;`
	);
	jogos.map(jogo=>jogo._count = {anuncios: jogosQtde.find(j=>j.id==jogo.id).qtdeAnuncios});
	return resp.json(jogos);
})

servidor.get('/jogos/:id', async (req, resp)=>{
	const id = req.params.id;
	const db = await abrirBanco;
	const jogo = await db.get(`SELECT * FROM Jogos WHERE id = '${id}';`);
	console.log("GET jogo="+jogo.nome+", ip="+req.ip);
	return resp.json(jogo);
})

servidor.get('/anuncios', async (req, resp)=>{
	const db = await abrirBanco;
	const anuncios = await db.all(
		`SELECT id,jogoId,nomeDoUsuario,tempoDeJogoEmAnos,diasQueJoga,deHora,ateHora,usaChatDeVoz
		FROM Anuncios
		ORDER BY dataDeCriacao DESC;`
	);
	console.log("GET jogo/anuncios, qtde="+anuncios.length+", ip="+req.ip);
	return resp.json(anuncios.map(anuncio=>{
		return {...anuncio,
			diasQueJoga: anuncio.diasQueJoga.split(','),
			deHora: converterMinutosParaHoraString(anuncio.deHora),
			ateHora: converterMinutosParaHoraString(anuncio.ateHora)
		};
	}));
})

servidor.get('/jogos/:id/anuncios', async (req, resp)=>{
	const jogoId = req.params.id;
	const db = await abrirBanco;
	const anuncios = await db.all(
		`SELECT id,nomeDoUsuario,tempoDeJogoEmAnos,diasQueJoga,deHora,ateHora,usaChatDeVoz
		FROM Anuncios
		WHERE jogoId='${jogoId}'
		ORDER BY dataDeCriacao DESC;`
	);
	console.log("GET jogo/anuncios, qtde="+anuncios.length+", ip="+req.ip);
	return resp.json(anuncios.map(anuncio=>{
		return {...anuncio,
			diasQueJoga: anuncio.diasQueJoga.split(','),
			deHora: converterMinutosParaHoraString(anuncio.deHora),
			ateHora: converterMinutosParaHoraString(anuncio.ateHora)
		};
	}));
})

servidor.get('/anuncios/:id/discord', async (req, resp)=>{
	const anuncioId = req.params.id;
	const db = await abrirBanco;
	const anuncio = await db.get(`SELECT discord FROM Anuncios WHERE id='${anuncioId}';`);
	console.log("GET anuncios/discord, discord="+anuncio.discord+", ip="+req.ip);
	return resp.json({discord: anuncio.discord});
})

servidor.put('/jogos/:id/anuncios', async (req, resp)=>{
	const jogoId = req.params.id;
	const body = req.body;
	console.log("PUT anuncio, usuário="+body.nomeDoUsuario+", ip="+req.ip);
	const db = await abrirBanco;
	//const anuncio = {
	//	id: uuid(),
	//	jogoId: jogoId,
	//	nomeDoUsuario: body.nomeDoUsuario,
	//	tempoDeJogoEmAnos: body.tempoDeJogoEmAnos,
	//	discord: body.discord,
	//	diasQueJoga: body.diasQueJoga,
	//	deHora: converterHoraStringParaMinutos(body.deHora),
	//	ateHora: converterHoraStringParaMinutos(body.ateHora),
	//	usaChatDeVoz: body.usaChatDeVoz
	//};
	//console.log(Object.values(anuncio).join(' / '));
	//const teste = 
	await db.run(`INSERT INTO Anuncios
		(id, jogoId, nomeDoUsuario, tempoDeJogoEmAnos, discord, diasQueJoga, deHora, ateHora, usaChatDeVoz, dataDeCriacao)
		VALUES (?,?,?,?,?,?,?,?,?,?);`,
		[uuidv4(), jogoId, body.nomeDoUsuario, body.tempoDeJogoEmAnos, body.discord, body.diasQueJoga,
		converterHoraStringParaMinutos(body.deHora), converterHoraStringParaMinutos(body.ateHora),
		body.usaChatDeVoz, Date.now()],
		//[`${anuncio.id}, ${anuncio.jogoId}, ${anuncio.nomeDoUsuario}, ${anuncio.tempoDeJogoEmAnos}, ${anuncio.discord},
		//${anuncio.diasQueJoga}, ${anuncio.deHora}, ${anuncio.ateHora}, ${anuncio.usaChatDeVoz}`],
		//[anuncio.id, anuncio.jogoId, anuncio.nomeDoUsuario, anuncio.tempoDeJogoEmAnos, anuncio.discord,
		//anuncio.diasQueJoga, anuncio.deHora, anuncio.ateHora, anuncio.usaChatDeVoz],
		function(erro) {
			console.log('quando isso é executado??');
			if (erro) {
				console.log('erro:');
				console.log(erro);
				return console.log(erro);
			}
			console.log(`A row has been inserted with rowid ${this.lastID}`);
			return this.lastID;
		}
	)
	.then(async dados=>{
		//console.log("dados:");
		//console.log(dados);
		const anuncioPublicado = await db.get(
			`SELECT * FROM Anuncios WHERE dataDeCriacao = (SELECT MAX(dataDeCriacao) FROM Anuncios);`
		);
		//console.log(anuncioPublicado);
		return resp.status(201).json(anuncioPublicado);
	})
	.catch(erro=>{
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json(erro);
	});
})

function converterHoraStringParaMinutos(horaString) {
	const [horas, minutos] = horaString.split(':').map(Number);
	return horas*60 + minutos;
}

function converterMinutosParaHoraString(minutos) {
	const hora = Math.floor(minutos/60);
	const minuto = minutos%60;
	return String(hora).padStart(2,'0') + ":" + String(minuto).padStart(2,'0');
}

servidor.put('/registrar', async (req, resp)=>{
	try {
		const body = req.body;
		console.log("PUT registrar, usuário="+body.nomeDoUsuario+", ip="+req.ip);
		//console.log("sql="+`SELECT * FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		const db = await abrirBanco;
		//const usuarioJaExiste = await db.get(`SELECT nome FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		const usuarioJaExiste = await db.get(`SELECT nome FROM Usuarios WHERE nome = (?);`,[body.nomeDoUsuario]);
		//console.log("já existe="+usuarioJaExiste);
		if (usuarioJaExiste)
			return resp.status(409).json({erro: 'Este nome de usuário não está disponível.'});
		const senhaHash = await bcrypt.hash(body.senha, bcryptSaltRounds);
		//console.log("senhaHash="+senhaHash);
		//await db.run(`INSERT INTO Usuarios (id, nome, senhaHash, dataDeCriacao) VALUES (?,?,?,?);`,
			//[uuidv4(), body.nomeDoUsuario, senhaHash, Date.now()],
		await db.run(`INSERT INTO Usuarios (nome, senhaHash, dataDeCriacao) VALUES (?,?,?);`,
			[body.nomeDoUsuario, senhaHash, Date.now()],
			function(erro) {
				console.log('quando isso é executado??');
				if (erro) {
					console.log('erro:');
					console.log(erro);
					return console.log(erro);
				}
				console.log(`A row has been inserted with rowid ${this.lastID}`);
				return this.lastID;
			}
		);
		//const usuarioRegistrado = await db.get(
		//	`SELECT id,nome,dataDeCriacao FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`
		//);
		//console.log(usuarioRegistrado);
		//return resp.status(201).json({usuario: usuarioRegistrado});
		return resp.status(201).json({nome: body.nomeDoUsuario});
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
		//console.log("sql="+`SELECT * FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		const db = await abrirBanco;
		const usuarioExiste = await db.get(`SELECT * FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		//const usuarioExiste = await db.get(`SELECT * FROM Usuarios WHERE nome = (?);`,[body.nomeDoUsuario]);
		//console.log("existe="+usuarioExiste);
		if (!usuarioExiste)
			return resp.status(404).json({erro: 'Este nome de usuário não está registrado.'});
		//const senhaHash = await db.get(`SELECT senhaHash FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		const senhaCorreta = await bcrypt.compare(body.senha, usuarioExiste.senhaHash);
		if (!senhaCorreta)
			return resp.status(401).json({erro: 'Senha incorreta.'});
		return resp.status(201).json({nome: usuarioExiste.nome});
		//se for manter sessão:
		//const token = {id: usuarioExiste.id, nome: usuarioExiste.nome, token: uuidv4()};
		//await db.run(`INSERT INTO UsuariosLogados (id, nome, token) VALUES (?,?,?);`,
		//	[token.id, token.nome, token.token],
		//	function(erro) {
		//		console.log('quando isso é executado??');
		//		if (erro) {
		//			console.log('erro:');
		//			console.log(erro);
		//			return console.log(erro);
		//		}
		//		console.log(`A row has been inserted with rowid ${this.lastID}`);
		//		return this.lastID;
		//	}
		//);
		//return resp.status(201).json(token);
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
})

//se for manter sessão:
/*servidor.post('/sair', async (req, resp)=>{
	try{
	//const body = req.body;
	//console.log("POST sair, usuário="+body.nomeDoUsuario+", ip="+req.ip);
	//const db = await abrirBanco;
	//const usuarioExiste = await db.get(`SELECT id,nome FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
	//if (!usuarioExiste)
	//	return resp.status(404).json({erro: 'Este nome de usuário não está registrado.'});
	return resp.status(204).json(???);
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
})*/

servidor.post('/alterarsenha', async (req, resp)=>{
	try {
		const body = req.body;
		console.log("POST alterarsenha, usuário="+body.nomeDoUsuario+", ip="+req.ip);
		const db = await abrirBanco;
		const usuarioExiste = await db.get(`SELECT * FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		if (!usuarioExiste)
			return resp.status(404).json({erro: 'Este nome de usuário não está registrado.'});
		const senhaCorreta = await bcrypt.compare(body.senha, usuarioExiste.senhaHash);
		if (!senhaCorreta)
			return resp.status(401).json({erro: 'Senha incorreta.'});
		const novaSenhaHash = await bcrypt.hash(body.novaSenha, bcryptSaltRounds);
		//await db.run(`INSERT INTO Usuarios (id, nome, senhaHash, dataDeCriacao) VALUES (?,?,?,?);`,
			//[uuidv4(), body.nomeDoUsuario, senhaHash, Date.now()],
		await db.run(`UPDATE Usuarios SET senhaHash = '${novaSenhaHash}' WHERE nome = '${body.nomeDoUsuario}';`);
		return resp.status(200).json({ok: 'Senha alterada com sucesso.'});
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
})