import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { config as dotenvConfig } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

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

async function iniciar(){
	//const db = await abrirBanco;
	//const ultimoAnuncio = await db.get('SELECT * FROM Anuncio WHERE dataDeCriacao = (SELECT MAX(dataDeCriacao) FROM Anuncio);');
	//const anuncioEspecifico = await db.get('SELECT * FROM Anuncio WHERE id = "a4a5b098-7cde-4a45-842f-57ad0706ab12";');
	//console.log(ultimoAnuncio.dataDeCriacao);
	//const d = new Date(ultimoAnuncio.dataDeCriacao);
	//console.log(d.getTime());
	//const anunciosErrados = await db.all('SELECT * FROM Anuncio WHERE dataDeCriacao > 1690864594730;');
	//console.log(anunciosErrados.length);
	//db.run(`CREATE TABLE IF NOT EXISTS Anuncio2 (
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

	//const anunciosCertos = await db.all('SELECT * FROM Anuncio WHERE dataDeCriacao > 1690864594730;');
	//await db.run(`INSERT INTO Anuncio2 SELECT * FROM Anuncio WHERE dataDeCriacao > 1690864594730;`);
	//anunciosCertos.map(anu=>db.run(`UPDATE Anuncio2 SET dataDeCriacao = ? WHERE dataDeCriacao > 1690864594730;`,
	//	[new Date(anu.dataDeCriacao).getTime()]
	//));
	//anunciosCertos.map(anu=>db.run(`UPDATE Anuncio2 SET dataDeCriacao = ? WHERE dataDeCriacao > 1690864594730;`,
	//	[new Date(anu.dataDeCriacao).getTime()]
	//));

	//anunciosCertos.map((an)=>{an.dataDeCriacao = new Date(an.dataDeCriacao).getTime()});
	//console.log(anunciosCertos);
	//let anunciosStringInterrogacoes = anunciosCertos.map(() => '(?)').join();
	//anunciosCertos.map(async(an)=>{await db.run(`INSERT INTO Anuncio2 VALUES (?);`, an);});
	//await db.run(`INSERT INTO Anuncio2
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
	//const teste = await db.get('SELECT * FROM Anuncio2;');
	//console.log(teste);
	//await db.run(`DROP TABLE Anuncio;`);
	//await db.run(`ALTER TABLE Anuncio2 RENAME TO Anuncio;`);

	//await db.migrate();
	servidor.listen(
		process.env.PORTA_DO_SERVIDOR,
		()=>console.log("iniciou server, ouvindo porta "+process.env.PORTA_DO_SERVIDOR)
	);
}
iniciar();

servidor.get('/jogos', async (req, resp) => {
	const db = await abrirBanco;
	const jogos = await db.all('SELECT * FROM Jogo;');
	console.log("GET jogos, qtde="+jogos.length+", ip="+req.ip);
	const jogosQtde = await db.all(
		`SELECT Jogo.id, COUNT(Anuncio.jogoId) as qtdeAnuncios
		FROM Jogo LEFT JOIN Anuncio
		ON Jogo.id=Anuncio.jogoId
		GROUP BY Jogo.id;`
	);
	jogos.map(jogo=>jogo._count = {anuncios: jogosQtde.find(j=>j.id==jogo.id).qtdeAnuncios});
	return resp.json(jogos);
})

servidor.get('/anuncios', async (req, resp) => {
	const db = await abrirBanco;
	const anuncios = await db.all('SELECT * FROM Anuncio;');
	console.log("GET anuncios, qtde="+anuncios.length+", ip="+req.ip);
	return resp.json(anuncios);
})

servidor.get('/jogos/:id/anuncios', async (req, resp) => {
	const jogoId = req.params.id;
	const db = await abrirBanco;
	const anuncios = await db.all(
		`SELECT id,nomeDoUsuario,tempoDeJogoEmAnos,diasQueJoga,deHora,ateHora,usaChatDeVoz
		FROM Anuncio
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

servidor.get('/anuncios/:id/discord', async (req, resp) => {
	const anuncioId = req.params.id;
	const db = await abrirBanco;
	const anuncio = await db.get(`SELECT discord FROM Anuncio WHERE id='${anuncioId}';`);
	console.log("GET anuncios/discord, discord="+anuncio.discord+", ip="+req.ip);
	return resp.json({discord: anuncio.discord});
})

servidor.post('/jogos/:id/anuncios', async (req, resp) => {
	const jogoId = req.params.id;
	const body = req.body;
	console.log("POST anuncio, usuário="+body.nomeDoUsuario+", ip="+req.ip);
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
	await db.run(`INSERT INTO Anuncio
		(id, jogoId, nomeDoUsuario, tempoDeJogoEmAnos, discord, diasQueJoga, deHora, ateHora, usaChatDeVoz, dataDeCriacao)
		VALUES (?,?,?,?,?,?,?,?,?,?);`,
		[uuidv4(), jogoId, body.nomeDoUsuario, body.tempoDeJogoEmAnos, body.discord, body.diasQueJoga,
		converterHoraStringParaMinutos(body.deHora), converterHoraStringParaMinutos(body.ateHora),
		body.usaChatDeVoz, Date.now()],
		//[`${anuncio.id}, ${anuncio.jogoId}, ${anuncio.nomeDoUsuario}, ${anuncio.tempoDeJogoEmAnos}, ${anuncio.discord},
		//${anuncio.diasQueJoga}, ${anuncio.deHora}, ${anuncio.ateHora}, ${anuncio.usaChatDeVoz}`],
		//[anuncio.id, anuncio.jogoId, anuncio.nomeDoUsuario, anuncio.tempoDeJogoEmAnos, anuncio.discord,
		//anuncio.diasQueJoga, anuncio.deHora, anuncio.ateHora, anuncio.usaChatDeVoz],
		function(erro){
			console.log('entrou');
			if(erro){
				console.log('erro:');
				console.log(erro);
				return console.log(erro);
			}
			console.log(`A row has been inserted with rowid ${this.lastID}`);
			return this.lastID;
		}
	).then(async (dados)=>{
		//console.log("dados:");
		//console.log(dados);
		const anuncioPublicado = await db.get(
			`SELECT * FROM Anuncio WHERE dataDeCriacao = (SELECT MAX(dataDeCriacao) FROM Anuncio);`
		);
		//console.log(anuncioPublicado);
		return resp.status(201).json(anuncioPublicado);
	})
	.catch(async (erro)=>{
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
