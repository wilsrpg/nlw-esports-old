import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
//import { config as dotenvConfig } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
//import { PORTA } from '../../enderecoDoServidor';
import crypto from 'crypto';

const PORTA = '3333';

const servidor = express();
servidor.use(express.json());
servidor.use(cors({
	//origin: 'http://meudominio.com'
}));

//dotenvConfig();

const abrirBanco = open({
	filename: '../db/db.sqlite',
	driver: sqlite3.Database
});

const bcryptSaltRounds = 10;

async function iniciar() {
	//const db = await abrirBanco;
	//await db.run(`PRAGMA foreign_keys = ON;`);
	//const A = await db.get(`PRAGMA foreign_keys;`);
	//console.log(A);
	
	//await db.run(`DELETE FROM Disponibilidades WHERE idDoAnuncio = 35;`);
	//await db.run(`INSERT INTO Disponibilidades(idDoAnuncio,dias,horaDeInicio,horaDeTermino) VALUES (34,2,3,4);`);
	//await db.run(`DELETE FROM Sessoes WHERE id IN (1,2);`);
	//await db.run(`ALTER TABLE Sessoes ADD COLUMN manterSessao BOOLEAN NOT NULL;`);
	//await db.run(`ALTER TABLE SessoesAtivas RENAME TO Sessoes;`);
	//await db.run(`DELETE FROM Sessoes WHERE id IN (1,2);`);
	//await db.run(`ALTER TABLE Sessoes ADD COLUMN seletor TEXT NOT NULL;`);
	//await db.run(`ALTER TABLE Sessoes RENAME COLUMN tokenDaSessao TO tokenDaSessaoHash;`);
	//await db.run(`ALTER TABLE teste RENAME TO Sessoes;`);
	//await db.run(`ALTER TABLE Sessoes ADD COLUMN idDoUsuario INTEGER NOT NULL;`);
	//await db.run(`ALTER TABLE Sessoes ADD COLUMN tokenDaSessao TEXT NOT NULL;`);
	//await db.run(`ALTER TABLE Sessoes ADD COLUMN dataDeExpiracao DATETIME NOT NULL;`);

	//await db.run(`UPDATE Anuncios2 SET idDoUsuario = 12 WHERE idDoUsuario = -1 AND idDoAnuncio = 20;`);
	//await db.run(`DELETE FROM Anuncios2 WHERE idDoAnuncio > 37;`);
	//await db.run(`DELETE FROM Disponibilidades WHERE idDoAnuncio > 37;`);
	//await db.run(`UPDATE Anuncios2 SET idDoUsuario = 1 WHERE idDoUsuario = -1 AND idDoAnuncio IN (2,5,8,9,37);`);
	//await db.run(`UPDATE Anuncios2 SET idDoUsuario = 10 WHERE idDoUsuario = -1 AND idDoAnuncio IN (15,19,36);`);
	//await db.run(`UPDATE Anuncios2 SET idDoUsuario = 3 WHERE idDoUsuario = -1 AND idDoAnuncio IN (22,23,24,32);`);
	//await db.run(`UPDATE Anuncios2 SET idDoUsuario = 2 WHERE idDoUsuario = -1 AND idDoAnuncio IN (6);`);

	//await db.run(`CREATE TABLE IF NOT EXISTS Disponibilidades (
	//	idDoAnuncio INTEGER NOT NULL,
	//	dias TEXT NOT NULL,
	//	horaDeInicio INTEGER NOT NULL,
	//	horaDeTermino INTEGER NOT NULL,
	//	FOREIGN KEY (idDoAnuncio) REFERENCES Anuncios2(idDoAnuncio)
	//	ON DELETE CASCADE);`
	//);

	//await db.run(`ALTER TABLE Anuncios2 RENAME COLUMN id TO idDoAnuncio;`);
	//await db.run(`ALTER TABLE Anuncios2 DROP COLUMN nomeDoJogo;`);
	//await db.run(`ALTER TABLE Anuncios2 RENAME COLUMN nomeDoUsuario TO nomeNoJogo;`);
	//await db.run(`ALTER TABLE Anuncios2 DROP COLUMN tempoDeJogoEmAnos;`);

	//await db.run(`INSERT INTO Disponibilidades
	//	SELECT idDoAnuncio,diasQueJoga,horaDeInicio,horaDeTermino FROM Anuncios2;`
	//);
	//await db.run(`ALTER TABLE Anuncios2 DROP COLUMN diasQueJoga;`);
	//await db.run(`ALTER TABLE Anuncios2 DROP COLUMN horaDeInicio;`);
	//await db.run(`ALTER TABLE Anuncios2 DROP COLUMN horaDeTermino;`);

	//await db.run(`ALTER TABLE Jogos ADD COLUMN uuid TEXT DEFAULT 0;`);
	//await db.run(`UPDATE Jogos SET uuid = id WHERE uuid = 0;`);
	//await db.run(`UPDATE Jogos SET id = rowid WHERE uuid = 'id';`); //sqlite n dxa mudar tipo, então n adianta fazer isso... o jeito é recriar
	//await db.run(`ALTER TABLE Jogos RENAME COLUMN id TO uuid;`);
	//await db.run(`ALTER TABLE Anuncios RENAME COLUMN id TO uuid;`);
	//await db.run(`ALTER TABLE Anuncios ADD COLUMN uuid ;`);
	//await db.run(`CREATE TABLE IF NOT EXISTS teste (id INTEGER PRIMARY KEY);`);
	//await db.run(`ALTER TABLE Jogo RENAME TO Jogos;`);
	//await db.run(`ALTER TABLE Anuncio RENAME TO Anuncios;`);
	//await db.run(`ALTER TABLE Jogos RENAME COLUMN url TO nomeUrl;`);
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
	
	//db.run(`CREATE TABLE IF NOT EXISTS Jogos2 (
	//	id INTEGER PRIMARY KEY,
	//	nome TEXT NOT NULL,
	//	nomeUrl TEXT NOT NULL,
	//	urlImagem TEXT NOT NULL,
	//	uuid TEXT);`
	//);
	//db.run(`CREATE TABLE IF NOT EXISTS Anuncios2 (
	//	id INTEGER PRIMARY KEY,
	//	idDoJogo INTEGER NOT NULL,
	//	nomeDoJogo TEXT NOT NULL,
	//	idDoUsuario INTEGER NOT NULL,
	//	nomeDoUsuario TEXT NOT NULL,
	//	tempoDeJogoEmAnos INTEGER NOT NULL,
	//	tempoDeJogoEmMeses INTEGER NOT NULL,
	//	discord TEXT NOT NULL,
	//	diasQueJoga TEXT NOT NULL,
	//	deHora INTEGER NOT NULL,
	//	ateHora INTEGER NOT NULL,
	//	usaChatDeVoz BOOLEAN NOT NULL,
	//	dataDeCriacao INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
	//	uuid TEXT);`
	//);

	//const a = await db.all(`SELECT rowid,nome,nomeUrl,urlImagem,id FROM Jogos;`);
	//const a = await db.all(`SELECT rowid,nomeDoUsuario,tempoDeJogoEmAnos,discord,diasQueJoga,deHora,ateHora,usaChatDeVoz,dataDeCriacao,id,jogoId FROM Anuncios;`);
	//const j = await db.all(`SELECT rowid,id,nome FROM Jogos;`);
	//const u = await db.all(`SELECT * FROM Usuarios;`);
	//a.map(anuncio=>{
	//	anuncio.idDoJogo = j.find(jo=>jo.id == anuncio.jogoId).rowid;
	//	anuncio.nomeDoJogo = j.find(jo=>jo.id == anuncio.jogoId).nome;
	//	let uid = u.find(us=>us.nome == anuncio.nomeDoUsuario);
	//	if (uid) anuncio.idDoUsuario = uid.id;
	//	else anuncio.idDoUsuario = -1;
	//	anuncio.tempoDeJogoEmMeses = anuncio.tempoDeJogoEmAnos * 12;
	//	anuncio.horaDeInicio = anuncio.deHora;
	//	anuncio.horaDeTermino = anuncio.ateHora;
	//	anuncio.uuid = anuncio.id;
	//});
	//console.log(a);

	//await db.run(`DELETE FROM Anuncios2;`);

	//let i=0;
	//while(i < a.length) {
	//	await db.run(`INSERT INTO Anuncios2
	//		(idDoJogo, nomeDoJogo, idDoUsuario, nomeDoUsuario, tempoDeJogoEmAnos, tempoDeJogoEmMeses, discord, diasQueJoga, horaDeInicio, horaDeTermino, usaChatDeVoz, dataDeCriacao, uuid)
	//		VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);`, [a[i].idDoJogo, a[i].nomeDoJogo, a[i].idDoUsuario, a[i].nomeDoUsuario, a[i].tempoDeJogoEmAnos, a[i].tempoDeJogoEmMeses, a[i].discord, a[i].diasQueJoga, a[i].horaDeInicio, a[i].horaDeTermino, a[i].usaChatDeVoz, a[i].dataDeCriacao, a[i].uuid]
	//	);
	//	console.log('inseriu registro '+(i+1)+' (nome='+a[i].nomeDoUsuario+', discord='+a[i].discord+', jogo='+a[i].nomeDoJogo+')');
	//	i++;
	//}
	//a.map(async (an,i)=>{
		//console.log([i, an.idDoJogo, an.nomeDoJogo, an.idDoUsuario, an.nomeDoUsuario, an.tempoDeJogoEmAnos, an.tempoDeJogoEmMeses, an.discord, an.diasQueJoga, an.horaDeInicio, an.horaDeTermino, an.usaChatDeVoz, an.dataDeCriacao].join(', '));
		//await db.run(`INSERT INTO Anuncios2
		//	(idDoJogo, nomeDoJogo, idDoUsuario, nomeDoUsuario, tempoDeJogoEmAnos, tempoDeJogoEmMeses, discord, diasQueJoga, horaDeInicio, horaDeTermino, usaChatDeVoz, dataDeCriacao, uuid)
		//	VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);`, [an.idDoJogo, an.nomeDoJogo, an.idDoUsuario, an.nomeDoUsuario, an.tempoDeJogoEmAnos, an.tempoDeJogoEmMeses, an.discord, an.diasQueJoga, an.horaDeInicio, an.horaDeTermino, an.usaChatDeVoz, an.dataDeCriacao, an.uuid]
		//);
		//console.log('inseriu registro '+(i+1)+' (nome='+an.nomeDoUsuario+', discord='+an.discord+')');
	//});


	//const anunciosCertos = await db.all('SELECT * FROM Anuncios WHERE dataDeCriacao > 1690864594730;');
	//await db.run(`INSERT INTO Anuncios2 SELECT * FROM Anuncios WHERE dataDeCriacao > 1690864594730;`);
	//anunciosCertos.map(anu=>db.run(`UPDATE Anuncios2 SET dataDeCriacao = (?) WHERE dataDeCriacao > 1690864594730;`,
	//	[new Date(anu.dataDeCriacao).getTime()]
	//));
	//anunciosCertos.map(anu=>db.run(`UPDATE Anuncios2 SET dataDeCriacao = (?) WHERE dataDeCriacao > 1690864594730;`,
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
	//servidor.listen(
	//	process.env.PORTA_DO_SERVIDOR,
	//	()=>console.log("iniciou server, ouvindo porta "+process.env.PORTA_DO_SERVIDOR)
	//);
}
iniciar();

servidor.get('/jogos', async (req, resp)=>{
	const db = await abrirBanco;
	const jogos = await db.all(
		`SELECT Jogos.id,nome,nomeUrl,urlImagem,COUNT(Anuncios.jogoId) AS qtdeAnuncios
		FROM Jogos LEFT JOIN Anuncios
		ON Jogos.id = jogoId
		GROUP BY Jogos.id
		ORDER BY MAX(dataDeCriacao) DESC;`
	);
	console.log("GET jogos, qtde="+jogos.length+", ip="+req.ip);
	//const jogosQtde = await db.all(
	//	`SELECT Jogos.id, COUNT(Anuncios.jogoId) AS qtdeAnuncios
	//	FROM Jogos LEFT JOIN Anuncios
	//	ON Jogos.id=Anuncios.jogoId
	//	GROUP BY Jogos.id;`
	//);
	//jogos.map(jogo=>jogo._count = {anuncios: jogosQtde.find(j=>j.id==jogo.id).qtdeAnuncios});
	jogos.map(jogo=>jogo._count = {anuncios: jogo.qtdeAnuncios});
	return resp.json(jogos);
});

servidor.get('/jogos2', async (req, resp)=>{
	const db = await abrirBanco;
	const jogos = await db.all(
		`SELECT Jogos2.id,nome,nomeUrl,urlImagem,COUNT(Anuncios.jogoId) AS qtdeAnuncios
		FROM Jogos2 LEFT JOIN Anuncios
		ON Jogos2.id = jogoId
		GROUP BY Jogos2.id
		ORDER BY MAX(dataDeCriacao) DESC;`
	);
	console.log("GET jogos2, qtde="+jogos.length+", ip="+req.ip);
	//const jogosQtde = await db.all(
	//	`SELECT Jogos.id, COUNT(Anuncios.jogoId) AS qtdeAnuncios
	//	FROM Jogos LEFT JOIN Anuncios
	//	ON Jogos.id=Anuncios.jogoId
	//	GROUP BY Jogos.id;`
	//);
	//jogos.map(jogo=>jogo._count = {anuncios: jogosQtde.find(j=>j.id==jogo.id).qtdeAnuncios});
	jogos.map(jogo=>jogo._count = {anuncios: jogo.qtdeAnuncios});
	return resp.json(jogos);
});

servidor.get('/jogos/:jogoNomeUrl', async (req, resp)=>{
	const jogoNomeUrl = req.params.jogoNomeUrl;
	const db = await abrirBanco;
	const jogo = await db.get(`SELECT id,nome,nomeUrl,urlImagem FROM Jogos WHERE nomeUrl = '${jogoNomeUrl}';`);
	console.log("GET jogos/jogo="+jogo.nome+", ip="+req.ip);
	return resp.json(jogo);
});

servidor.get('/jogos-recentes/:qtde', async (req, resp)=>{
	const db = await abrirBanco;
	const qtde = parseInt(req.params.qtde);
	console.log("GET jogos-recentes, qtde="+qtde+" ip="+req.ip);
	const jogos = await db.all(
		`SELECT Jogos.id,nome,nomeUrl,urlImagem,COUNT(Anuncios.jogoId) AS qtdeAnuncios
		FROM Jogos LEFT JOIN Anuncios
		ON Jogos.id = jogoId
		GROUP BY Jogos.id
		ORDER BY MAX(dataDeCriacao) DESC
		LIMIT '${qtde}';`
	);
	jogos.map(jogo=>jogo._count = {anuncios: jogo.qtdeAnuncios});
	return resp.json(jogos);
});

servidor.post('/anuncios', async (req, resp)=>{
	const body = req.body;
	//console.log("POST anuncios, ip="+req.ip+", body:");
	if (!body.jogo) body.jogo = '%';

	if (!body.idDoUsuario) body.idDoUsuario = '%';
	//console.log("body.idDoUsuario="+body.idDoUsuario);
	
	let naoContem = false, exatamente = false;
	if (!body.nome) body.nome = '%';
	else if (!body.opcoesNome) body.nome = '%'+body.nome+'%';
	else if (body.opcoesNome == 'comecaCom') body.nome = body.nome+'%';
	else if (body.opcoesNome == 'terminaCom') body.nome = '%'+body.nome;
	else if (body.opcoesNome == 'exatamente') exatamente = true;
	else if (body.opcoesNome == 'naoContem') {
		naoContem = true;
		body.nome = '%'+body.nome+'%';
	}

	//if (!body.discord) body.discord = '%';
	
	let tempoDeJogoEmAnos = 0, tempoDeJogoEmAnos2 = 0;
	//let tempoDeJogoEmMeses = 0, tempoDeJogoEmMeses2 = 0;
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

	const b2 = {
		//jogoId: jogoId,
		jogo: body.jogo,
		nome: body.nome,
		naoContem: naoContem,
		//discord: body.discord,
		tempoDeJogoEmAnos: tempoDeJogoEmAnos,
		noMaximo: noMaximo,
		entre: entre,
		tempoDeJogoEmAnos2: tempoDeJogoEmAnos2,
		//emTodos: emTodos,
		//diasQueJoga: diasQueJoga,
		//deHora: deHora,
		//ateHora: ateHora,
		//virandoNoite: virandoNoite,
		usaChatDeVoz: body.usaChatDeVoz
	}
	//console.log('body convertido:');
	//console.log(b2);

	const db = await abrirBanco;
	let anuncios = await db.all(
		`SELECT idDoAnuncio, idDoJogo, idDoUsuario, Jogos2.nome AS nomeDoJogo, nomeNoJogo, tempoDeJogoEmMeses,
			usaChatDeVoz, dataDeCriacao
		FROM Anuncios2 JOIN Jogos2 ON idDoJogo = Jogos2.id
		WHERE Jogos2.nomeUrl LIKE (?)
		  AND idDoUsuario ${body.idDoUsuario == '%' ? 'LIKE' : '=' } (?)
			AND nomeNoJogo ${exatamente ? '=' : (naoContem ? 'NOT ' : '') + 'LIKE'} (?)
			AND tempoDeJogoEmMeses ${noMaximo ? '<=' : '>='} (?)
			AND usaChatDeVoz LIKE (?)
		ORDER BY dataDeCriacao DESC;`,
		[body.jogo, body.idDoUsuario, body.nome, tempoDeJogoEmAnos*12, body.usaChatDeVoz]
	);
	//let anuncios = await db.all(
	//	`SELECT Anuncios.id, jogoId, Jogos.nome AS nomeDoJogo, nomeDoUsuario, tempoDeJogoEmAnos,
	//		diasQueJoga, deHora, ateHora, usaChatDeVoz, dataDeCriacao
	//	FROM Anuncios JOIN Jogos ON jogoId = Jogos.id
	//	WHERE Jogos.nomeUrl LIKE (?)
	//	  AND nomeDoUsuario ${exatamente ? '=' : (naoContem ? 'NOT ' : '') + 'LIKE'} (?)
	//		AND tempoDeJogoEmAnos ${noMaximo ? '<=' : '>='} (?)
	//		${''/*AND diasQueJoga LIKE (?)
	//		AND deHora <= (?)
	//		AND ateHora >= (?)*/}
	//		AND usaChatDeVoz LIKE (?)
	//	ORDER BY dataDeCriacao DESC;`,
	//	[body.jogo, body.nome, tempoDeJogoEmAnos, body.usaChatDeVoz]
	//);
	//console.log('qtde an='+anuncios.length);
	//console.log(anuncios);
	let idsDosAnuncios = anuncios.map(an=>an.idDoAnuncio).join();
	//console.log(idsDosAnuncios);
	let disponibilidades = await db.all(`SELECT idDoAnuncio,dias,horaDeInicio,horaDeTermino FROM Disponibilidades WHERE idDoAnuncio IN (${idsDosAnuncios});`);
	//console.log('qtde disp='+disponibilidades.length);
	anuncios.map(an=>{
		an.disponibilidades = disponibilidades.filter(disp=>disp.idDoAnuncio == an.idDoAnuncio);
		//console.log(an.disponibilidades);
	});
	//disponibilidades.map(disp=>{

	//})
	//console.log(disponibilidades);
	//console.log(anuncios);

	//console.log("ants do filtro d tempoDeJogoEntre, qtde= "+anuncios.length);

	if (entre)
		//anuncios = anuncios.filter(anuncio=>anuncio.tempoDeJogoEmAnos <= tempoDeJogoEmAnos2);
		anuncios = anuncios.filter(anuncio=>anuncio.tempoDeJogoEmMeses <= tempoDeJogoEmAnos2*12);
	
	//console.log("dps do filtro d tempoDeJogoEntre e ants do d disponibilidade, qtde= "+anuncios.length);
		
	if (body.qtdeFiltrosDisponibilidade) {
		//const disponibilidades = [];
		let diasQueJoga;
		const dias = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
		let deHora;
		let ateHora;
		//let virandoNoite = false;
		let disponivelEmTodos = false;
		let anunciosOu = [];

		for (let i = 0; i < body.qtdeFiltrosDisponibilidade; i++) {
			//console.log('ants do filtro '+i);
			//console.log(anuncios);
			
      let id = i == 0 ? '' : i+1;
			if (body['quando'+id] == 'qualquerDia')
				//diasQueJoga = '.*';
				diasQueJoga = [];
			else if (body['quando'+id] == 'todoDia')
				//diasQueJoga = '0,1,2,3,4,5,6';
				diasQueJoga = [0,1,2,3,4,5,6];
			else if (body['quando'+id] == 'semana')
				//diasQueJoga = '.*1,2,3,4,5.*';
				diasQueJoga = [1,2,3,4,5];
			else if (body['quando'+id] == 'finsDeSemana')
				//diasQueJoga = '0.*6';
				diasQueJoga = [0,6];
			else
				dias.some((dia,i)=>{
					if (dia == body['quando'+id]) {
						//diasQueJoga = '.*'+i+'.*';
						diasQueJoga = [i];
						return true;
					}
				});

			//console.log('diasQueJoga'+id+'= '+diasQueJoga);

			if (body['de'+id])
				deHora = converterHoraStringParaMinutos(body['de'+id]);
			else
				deHora = undefined;
			if (body['ate'+id])
				ateHora = converterHoraStringParaMinutos(body['ate'+id]);
			else
				ateHora = undefined;
			//if (deHora > ateHora)
			//	virandoNoite = true;
			if (body.opcoesDisponibilidade)
				disponivelEmTodos = true;

			//disponibilidades.push({diasQueJoga, deHora, ateHora});
			//console.log('deHora~ateHora= '+deHora+'~'+ateHora);

			//if(!disponivelEmTodos) {
			//	;
			//} else
			anuncios = anuncios.filter(anuncio=>{
				//anuncio.disponibilidades;
				//for (let j = 0; j < anuncio.disponibilidades.length; j++) {
				//	const element = anuncio.disponibilidades[j];
				//}
				let dispEncontradas = [];
				let encontrouTodas = false;
				//console.log('diasQueJoga busca=');
				//console.log(diasQueJoga);
				diasQueJoga.map(dia=>{
					//console.log('dia='+dia);
					//anuncio.disponibilidades.map(disp=>{
					for (let j = 0; j < anuncio.disponibilidades.length && !encontrouTodas; j++) {
						const disp = anuncio.disponibilidades[j];
						
						let arrDisp = disp.dias.split(',');
						//console.log('j='+j+', disp e arrDisp=');
						//console.log(disp);
						//console.log(arrDisp);
					
						//console.log('deHora~ateHora= '+deHora+'~'+ateHora);
						let horaDeInicio = deHora;
						if (horaDeInicio == undefined)
							horaDeInicio = disp.horaDeInicio;
						let horaDeTermino = ateHora;
						if (horaDeTermino == undefined)
							horaDeTermino = disp.horaDeTermino;
						//console.log('horaDeInicio~horaDeTermino= '+horaDeInicio+'~'+horaDeTermino);
						let duracaoBusca = (1440 + horaDeTermino - horaDeInicio) % 1440;
						let duracaoAnuncio = (1440 + disp.horaDeTermino - disp.horaDeInicio) % 1440;
						let diferencaInicio = (1440 - disp.horaDeInicio + horaDeInicio) % 1440;
						//console.log('duracaoBusca,duracaoAnuncio,diferencaInicio= '+duracaoBusca+','+duracaoAnuncio+','+diferencaInicio);
						
						if (duracaoAnuncio - diferencaInicio >= duracaoBusca && arrDisp.some(d=>d==dia)) {
							dispEncontradas.push(dia);
							dispEncontradas.sort();
						}
						//console.log('dispEncontradas e diasQueJoga=');
						//console.log(dispEncontradas);
						//console.log(diasQueJoga);
						if (dispEncontradas.join() == diasQueJoga.join())
							encontrouTodas = true;
						//console.log(encontrouTodas);
					}
					//});
				});
				//let passou2 = disp.diasQueJoga.match(diasQueJoga)
				//							&& duracaoAnuncio - diferencaInicio >= duracaoBusca;
				let passou2 = encontrouTodas;
				if (!disponivelEmTodos){
					if (passou2)
						anunciosOu.push(anuncio);
					passou2 = !passou2;
				}
				return passou2;

				let horaDeInicio = deHora || anuncio.disponibilidades[0].horaDeInicio;
				let horaDeTermino = ateHora || anuncio.disponibilidades[0].horaDeTermino;
				console.log('horaDeInicio~horaDeTermino= '+horaDeInicio+'~'+horaDeTermino);
				//if (!body['de'+id])
				//if (deHora == undefined)
				//		horaDeInicio = anuncio.disponibilidades[0].horaDeInicio;
				//if (!body['ate'+id])
				//if (ateHora == undefined)
				//		horaDeTermino = anuncio.disponibilidades[0].horaDeTermino;
				//let anuncioVirandoNoite = anuncio.horaDeInicio > anuncio.horaDeTermino;
				let duracaoBusca = (1440 + horaDeTermino - horaDeInicio) % 1440;
				//if (duracaoBusca < 0) duracaoBusca += 1440;
				let duracaoAnuncio = (1440 + anuncio.disponibilidades[0].horaDeTermino - anuncio.disponibilidades[0].horaDeInicio) % 1440;
				//if (duracaoAnuncio < 0) duracaoAnuncio += 1440;
				//console.log('duração busca/anúncio= '+duracaoBusca+'/'+duracaoAnuncio);
				let diferencaInicio = (1440 - anuncio.disponibilidades[0].horaDeInicio + horaDeInicio) % 1440;
				//duracaoAnuncio = anuncio.horaDeInicio > horaDeInicio ? anuncio.horaDeInicio + duracaoAnuncio - 1440 - horaDeInicio : duracaoAnuncio;
				//console.log('duração anúncio2= '+duracaoAnuncio+', condições:');

				//console.log('tá nos dias que joga='+anuncio.diasQueJoga.match(diasQueJoga) ? true : false);
				//console.log('tá no período q joga='+duracaoAnuncio - diferençaInicio >= duracaoBusca);

				let passou = anuncio.disponibilidades[0].diasQueJoga.match(diasQueJoga)
										 && duracaoAnuncio - diferencaInicio >= duracaoBusca;
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
			
		//console.log(disponibilidades);
	}
	//console.log("dps do filtro d disponibilidade, qtde="+anuncios.length);

	//console.log({
	//	diasQueJoga: anuncios[0].diasQueJoga.split(','),
	//	horarioDeInicio: converterMinutosParaHoraString(anuncios[0].deHora),
	//	horarioDeTermino: converterMinutosParaHoraString(anuncios[0].ateHora)
	//});
	anuncios.map(anuncio=>{
		anuncio.disponibilidades.sort((a,b)=>a.dias - b.dias);
		anuncio.disponibilidades.map(disp=>{
			disp.dias = disp.dias.split(',');
			disp.horaDeInicio = converterMinutosParaHoraString(disp.horaDeInicio);
			disp.horaDeTermino = converterMinutosParaHoraString(disp.horaDeTermino);
		});
	});

	console.log("POST anuncios, qtde="+anuncios.length+", ip="+req.ip);
	return resp.json(anuncios.map(anuncio=>{
		return {...anuncio,
			nomeDoUsuario: anuncio.nomeNoJogo,
			tempoDeJogoEmAnos: anuncio.tempoDeJogoEmMeses/12,
			//diasQueJoga: anuncio.diasQueJoga.split(','),
			diasQueJoga: anuncio.disponibilidades[0].dias,
			//deHora: converterMinutosParaHoraString(anuncio.disponibilidades[0].horaDeInicio),
			//ateHora: converterMinutosParaHoraString(anuncio.disponibilidades[0].horaDeTermino)
			deHora: anuncio.disponibilidades[0].horaDeInicio,
			ateHora: anuncio.disponibilidades[0].horaDeTermino
		};
	}));
});

//só usado no modal de jogo selecionado, na antiga página inicial
servidor.get('/jogos/:jogoNomeUrl/anuncios', async (req, resp)=>{
	const jogoNomeUrl = req.params.jogoNomeUrl;
	const db = await abrirBanco;
	const jogo = await db.get(`SELECT id FROM Jogos WHERE nomeUrl = '${jogoNomeUrl}';`);
	//console.log(jogo.id);
	const anuncios = await db.all(
		`SELECT id,nomeDoUsuario,tempoDeJogoEmAnos,diasQueJoga,deHora,ateHora,usaChatDeVoz,dataDeCriacao
		FROM Anuncios
		WHERE jogoId = ${jogo.id}
		ORDER BY dataDeCriacao DESC;`
	);
	console.log("GET jogos/"+jogoNomeUrl+"/anuncios, qtde="+anuncios.length+", ip="+req.ip);
	return resp.json(anuncios.map(anuncio=>{
		return {...anuncio,
			diasQueJoga: anuncio.diasQueJoga.split(','),
			deHora: converterMinutosParaHoraString(anuncio.deHora),
			ateHora: converterMinutosParaHoraString(anuncio.ateHora)
		};
	}));
});

//usado no modal conectar, nos cartões de anúncios
servidor.get('/anuncios/:id/discord', async (req, resp)=>{
	const anuncioId = req.params.id;
	const db = await abrirBanco;
	const anuncio = await db.get(`SELECT discord FROM Anuncios2 WHERE idDoAnuncio = ${anuncioId};`);
	console.log("GET anuncios/id/discord, discord="+anuncio.discord+", ip="+req.ip);
	return resp.json({discord: anuncio.discord});
});

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
});

function converterHoraStringParaMinutos(horaString) {
	const [horas, minutos] = horaString.split(':').map(Number);
	return horas*60 + minutos;
}

function converterMinutosParaHoraString(minutos) {
	const hora = Math.floor(minutos/60);
	const minuto = minutos%60;
	return String(hora).padStart(2,'0') + ":" + String(minuto).padStart(2,'0');
}

servidor.put('/usuarios', async (req, resp)=>{
	try {
		const body = req.body;
		console.log("PUT contas, usuário="+body.nomeDoUsuario+", ip="+req.ip);
		//console.log("sql="+`SELECT * FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		const db = await abrirBanco;
		//const usuarioJaExiste = await db.get(`SELECT nome FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		const usuarioJaExiste = await db.get(`SELECT nome FROM Usuarios WHERE nome = (?);`, [body.nomeDoUsuario]);
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
		const usuarioRegistrado = await db.get( `SELECT id,nome FROM Usuarios WHERE dataDeCriacao = (SELECT MAX(dataDeCriacao) FROM Usuarios;`);
		//console.log(usuarioRegistrado);
		//return resp.status(201).json({usuario: usuarioRegistrado});
		return resp.status(201).json({id: usuarioRegistrado.id, nome: usuarioRegistrado.nome});
		//const token = {id: usuarioRegistrado.id, nome: usuarioRegistrado.nome, tokenDaSessao: uuidv4()};
		//const tokenDaSessaoHash = await bcrypt.hash(token.tokenDaSessao, bcryptSaltRounds);
		//const daquiAUmMes = Date.now()+30*24*60*60*1000;
		//await db.run(`INSERT INTO Sessoes (tokenDaSessaoHash, idDoUsuario, dataDeExpiracao) VALUES (?,?,?);`,
		//	[tokenDaSessaoHash, token.id, daquiAUmMes],
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
});

servidor.put('/sessoes', async (req, resp)=>{
	try {
		const body = req.body;
		console.log("PUT sessoes, usuário="+body.nomeDoUsuario+", manter sessão="+body.manterSessao+", ip="+req.ip);
		const db = await abrirBanco;
		//const usuarioExiste = await db.get(`SELECT * FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		const usuarioExiste = await db.get(`SELECT id,senhaHash,nome FROM Usuarios WHERE nome = (?);`, [body.nomeDoUsuario]);
		//console.log("existe="+usuarioExiste);
		if (!usuarioExiste)
			return resp.status(404).json({erro: 'Este nome de usuário não está registrado.'});
		const senhaCorreta = await bcrypt.compare(body.senha, usuarioExiste.senhaHash);
		if (!senhaCorreta)
			return resp.status(401).json({erro: 'Senha incorreta.'});
		//return resp.status(201).json({id: usuarioExiste.id, nome: usuarioExiste.nome});
		//se for manter sessão:
		const resposta = {id: usuarioExiste.id, nome: usuarioExiste.nome, manterSessao: body.manterSessao};
		//if (body.manterSessao) {
			const seletor = crypto.randomBytes(4).toString('hex');
			const tokenDaSessao = uuidv4();
			resposta.tokenDaSessao = seletor + '-' + tokenDaSessao ;
			//console.log("seletor,token="+seletor+','+tokenDaSessao);
			const tokenDaSessaoHash = await bcrypt.hash(tokenDaSessao, bcryptSaltRounds);
			const dataDeExpiracao = Date.now() + 30 * 24*60*60*1000;
			resposta.dataDeExpiracao = dataDeExpiracao;
			await db.run(`INSERT INTO Sessoes (idDoUsuario, seletor, tokenDaSessaoHash, dataDeExpiracao, manterSessao)
				VALUES (${resposta.id}, '${seletor}', '${tokenDaSessaoHash}', ${dataDeExpiracao}, ${body.manterSessao});`,
				//[tokenDaSessaoHash, token.id, daquiAUmMes],
			//const token = {id: usuarioExiste.id, nome: usuarioExiste.nome, token: uuidv4()};
			//await db.run(`INSERT INTO Sessoes (id, nome, token) VALUES (?,?,?);`,
			//	[token.id, token.nome, token.token],
				function(erro) {
					console.log('quando isso é executado?? - criando sessão');
					if (erro) {
						console.log('erro:');
						console.log(erro);
						return console.log(erro);
					}
					console.log(`A row has been inserted with rowid ${this.lastID}`);
					return this.lastID;
				}
			);
		//}
		return resp.status(201).json(resposta);
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
});

//se for manter sessão:
//servidor.post('/sessoes', async (req, resp)=>{
servidor.get('/sessoes/:tokenDaSessao', async (req, resp)=>{
	try {
		//const body = req.body;
		const tokenDaSessao = req.params.tokenDaSessao;
		const db = await abrirBanco;
		const seletor = tokenDaSessao.slice(0,8);
		const token = tokenDaSessao.slice(9);
		console.log('POST sessoes/tokenDaSessao, seletor='+seletor+', ip='+req.ip);
		const sessaoExiste = await db.get(`SELECT id,idDoUsuario,tokenDaSessaoHash,dataDeExpiracao,manterSessao
			FROM Sessoes WHERE seletor = '${seletor}';`);
		if (!sessaoExiste)
			return resp.status(404).json({erro: 'Sessão inexistente.'});
		if(sessaoExiste.dataDeExpiracao < Date.now())
			return resp.status(404).json({erro: 'Sessão expirada.'});
		const sessaoValida = await bcrypt.compare(token, sessaoExiste.tokenDaSessaoHash);
		if (!sessaoValida)
			return resp.status(404).json({erro: 'Sessão inválida.'});
			//cookie roubado? oq deve ser feito nesse caso?

		const usuarioExiste = await db.get(`SELECT nome FROM Usuarios WHERE id = ${sessaoExiste.idDoUsuario};`);
		const novoTokenDaSessao = uuidv4();
		const resposta = {
			id: sessaoExiste.idDoUsuario,
			nome: usuarioExiste.nome,
			tokenDaSessao: seletor + '-' + novoTokenDaSessao,
			manterSessao: sessaoExiste.manterSessao
		};
		const novoTokenDaSessaoHash = await bcrypt.hash(novoTokenDaSessao, bcryptSaltRounds);
		resposta.dataDeExpiracao = Date.now() + 30 * 24*60*60*1000;
		await db.run(`UPDATE Sessoes
			SET tokenDaSessaoHash = '${novoTokenDaSessaoHash}', dataDeExpiracao = ${resposta.dataDeExpiracao}
			WHERE id = ${sessaoExiste.id};`,
			//[tokenDaNovaSessaoHash, daquiAUmMes],
		//const token = {id: usuarioExiste.id, nome: usuarioExiste.nome, token: uuidv4()};
		//await db.run(`INSERT INTO Sessoes (id, nome, token) VALUES (?,?,?);`,
		//	[token.id, token.nome, token.token],
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
		return resp.status(201).json(resposta);
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
});

//se for manter sessão:
servidor.delete('/sessoes/:tokenDaSessao', async (req, resp)=>{
	try {
		//const body = req.body;
		const tokenDaSessao = req.params.tokenDaSessao;
		//const seletor = body.tokenDaSessao.slice(0,8);
		//const tokenDaSessao = body.tokenDaSessao.slice(9);
		const seletor = tokenDaSessao.slice(0,8);
		const token = tokenDaSessao.slice(9);
		console.log('DELETE sessoes/tokenDaSessao, seletor='+seletor+', ip='+req.ip);
		const db = await abrirBanco;
		const sessaoExiste = await db.get(`SELECT id,tokenDaSessaoHash FROM Sessoes WHERE seletor = '${seletor}';`);
		if (!sessaoExiste)
			return resp.status(404).json({erro: 'Sessão inexistente.'});
		const sessaoValida = await bcrypt.compare(token, sessaoExiste.tokenDaSessaoHash);
		if (!sessaoValida)
			return resp.status(404).json({erro: 'Sessão inválida.'});
			//cookie roubado? oq deve ser feito nesse caso?
		
		await db.run(`DELETE FROM Sessoes WHERE id = ${sessaoExiste.id};`);
		return resp.status(200).json({ok: 'Sessão excluída.'});
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
});

//se for manter sessão:
servidor.delete('/outras-sessoes/:id/:tokenDaSessao', async (req, resp)=>{
	try {
		//const body = req.body;
		const id = req.params.id;
		const tokenDaSessao = req.params.tokenDaSessao;
		const seletor = tokenDaSessao.slice(0,8);
		const token = tokenDaSessao.slice(9);
		console.log('POST outras-sessoes/id/tokenDaSessao, id do usuário='+id+', seletor='+seletor+', ip='+req.ip);
		const db = await abrirBanco;
		const sessaoExiste = await db.get(`SELECT id,tokenDaSessaoHash FROM Sessoes WHERE idDoUsuario = ${id} AND seletor = '${seletor}';`);
		if (!sessaoExiste)
			return resp.status(404).json({erro: 'Sessão inexistente.'});
		const sessaoValida = await bcrypt.compare(token, sessaoExiste.tokenDaSessaoHash);
		if (!sessaoValida)
			return resp.status(404).json({erro: 'Sessão inválida.'});
			//cookie roubado? oq deve ser feito nesse caso?
		
		const sessoesConectadas = await db.get(`SELECT COUNT(*) AS qtde FROM Sessoes WHERE idDoUsuario = ${id} AND seletor != '${seletor}';`);
		//if (!qtde)
		//	qtde = 0;
		await db.run(`DELETE FROM Sessoes WHERE idDoUsuario = ${id} AND seletor != '${seletor}';`);
		return resp.status(200).json({qtdeSessoesDesconectadas: sessoesConectadas.qtde});
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
});

servidor.post('/usuarios/senha', async (req, resp)=>{
	try {
		const body = req.body;
		const id = parseInt(body.id);
		console.log("POST usuarios/senha, id do usuário="+body.id+", ip="+req.ip);
		const db = await abrirBanco;
		//const usuarioExiste = await db.get(`SELECT * FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		const usuarioExiste = await db.get(`SELECT id,senhaHash FROM Usuarios WHERE id = ${id};`,
			function(erro) {
				console.log('quando isso é executado?? - buscando usuário');
				if (erro) {
					console.log('erro:');
					console.log(erro);
					return console.log(erro);
				}
				console.log(`A row has been inserted with rowid ${this.lastID}`);
				return this.lastID;
			}
		);
		if (!usuarioExiste)
			return resp.status(404).json({erro: 'Usuário não encontrado.'});
		const senhaCorreta = await bcrypt.compare(body.senha, usuarioExiste.senhaHash);
		if (!senhaCorreta)
			return resp.status(401).json({erro: 'Senha incorreta.'});
		const novaSenhaHash = await bcrypt.hash(body.novaSenha, bcryptSaltRounds);
		//await db.run(`INSERT INTO Usuarios (id, nome, senhaHash, dataDeCriacao) VALUES (?,?,?,?);`,
			//[uuidv4(), body.nomeDoUsuario, senhaHash, Date.now()],
		//await db.run(`UPDATE Usuarios SET senhaHash = '${novaSenhaHash}' WHERE nome = '${body.nomeDoUsuario}';`);
		await db.run(`UPDATE Usuarios SET senhaHash = '${novaSenhaHash}' WHERE id = ${id};`,
			function(erro) {
				console.log('quando isso é executado?? - atualizando senha');
				if (erro) {
					console.log('erro:');
					console.log(erro);
					return console.log(erro);
				}
				console.log(`A row has been inserted with rowid ${this.lastID}`);
				return this.lastID;
			}
		);
		await db.run(`DELETE FROM Sessoes WHERE idDoUsuario = ${id};`,
			function(erro) {
				console.log('quando isso é executado?? - excluindo sessões');
				if (erro) {
					console.log('erro:');
					console.log(erro);
					return console.log(erro);
				}
				console.log(`A row has been inserted with rowid ${this.lastID}`);
				return this.lastID;
			}
		);
		return resp.status(200).json({ok: 'Senha alterada com sucesso.'});
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
});

servidor.delete('/usuarios/:id', async (req, resp)=>{
	try {
		const body = req.body;
		const id = parseInt(req.params.id);
		//const id = parseInt(body.id);
		console.log("DELETE contas, id do usuário="+id+", ip="+req.ip);
		const db = await abrirBanco;
		//const usuarioExiste = await db.get(`SELECT * FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		const usuarioExiste = await db.get(`SELECT id,senhaHash FROM Usuarios WHERE id = ${id};`,
			function(erro) {
				console.log('quando isso é executado?? - buscando usuário');
				if (erro) {
					console.log('erro:');
					console.log(erro);
					return console.log(erro);
				}
				console.log(`A row has been inserted with rowid ${this.lastID}`);
				return this.lastID;
			}
		);
		if (!usuarioExiste)
			return resp.status(404).json({erro: 'Este nome de usuário não está registrado.'});
		const senhaCorreta = await bcrypt.compare(body.senha, usuarioExiste.senhaHash);
		if (!senhaCorreta)
			return resp.status(401).json({erro: 'Senha incorreta.'});
		//await db.run(`DELETE FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		await db.run(`DELETE FROM Usuarios WHERE id = ${id};`,
			function(erro) {
				console.log('quando isso é executado?? - excluindo usuário');
				if (erro) {
					console.log('erro:');
					console.log(erro);
					return console.log(erro);
				}
				console.log(`A row has been inserted with rowid ${this.lastID}`);
				return this.lastID;
			}
		);
		await db.run(`DELETE FROM Sessoes WHERE idDoUsuario = ${id};`,
			function(erro) {
				console.log('quando isso é executado?? - excluindo sessões');
				if (erro) {
					console.log('erro:');
					console.log(erro);
					return console.log(erro);
				}
				console.log(`A row has been inserted with rowid ${this.lastID}`);
				return this.lastID;
			}
		);
		return resp.status(200).json({ok: 'Conta excluída.'});
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
});

servidor.delete('/anuncios/:id', async (req, resp)=>{
	try {
		//const body = req.body;
		const id = parseInt(req.params.id);
		//const id = parseInt(body.idDoAnuncio);
		console.log("DELETE anuncios/id, id="+id+", ip="+req.ip);
		const db = await abrirBanco;
		await db.run(`DELETE FROM Anuncios2 WHERE idDoAnuncio = ${id};`);
		await db.run(`DELETE FROM Disponibilidades WHERE idDoAnuncio = ${id};`);
		//await new Promise(r=>setTimeout(r,1000));
		return resp.status(200).json({ok: 'Anúncio excluído.'});
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
});

servidor.put('/anuncios', async (req, resp)=>{
	try {
		const body = req.body;
		console.log("PUT anuncios, usuário="+body.idDoUsuario+", ip="+req.ip);

		//console.log(body);
		//console.log(body.disponibilidades);
		//return resp.status(200).json({ok: 'Anúncio recebido, mas não registrado.'});
		//const disponibilidade = [];
		//disponibilidade.push({
		//	diasQueJoga: body.diasQueJoga,
		//	horarioDeInicio: converterHoraStringParaMinutos(body.deHora),
		//	horarioDeTermino: converterHoraStringParaMinutos(body.ateHora)
		//});

		const db = await abrirBanco;
		await db.run(`INSERT INTO Anuncios2
			(idDoJogo, idDoUsuario, nomeNoJogo, tempoDeJogoEmMeses, discord, usaChatDeVoz, dataDeCriacao)
			VALUES (?,?,?,?,?,?,?);`,
			[body.idDoJogo, body.idDoUsuario, body.nomeNoJogo, body.tempoDeJogoEmMeses, body.discord, body.usaChatDeVoz,
				Date.now()],
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
		const anuncioPublicado = await db.get(
			`SELECT idDoAnuncio FROM Anuncios2 WHERE dataDeCriacao = (SELECT MAX(dataDeCriacao) FROM Anuncios2);`
		);

		let i = 0;
		while (i < body.disponibilidades.length) {
			await db.run(`INSERT INTO Disponibilidades
				(idDoAnuncio, dias, horaDeInicio, horaDeTermino)
				VALUES (?,?,?,?);`,
				[anuncioPublicado.idDoAnuncio, body.disponibilidades[i].dias,
					converterHoraStringParaMinutos(body.disponibilidades[i].horaDeInicio),
					converterHoraStringParaMinutos(body.disponibilidades[i].horaDeTermino)
				],
				function(err) {
					console.log('quando isso é executado??');
					if (err) {
						console.log('erro:');
						console.log(err);
						return console.log(err);
					}
					console.log(`A row has been inserted with rowid ${this.lastID}`);
					return this.lastID;
				}
			);
			i++;
			//console.log(i+','+body.disponibilidades.length);
		}
		//console.log(anuncioPublicado);
		return resp.status(201).json(anuncioPublicado);
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
});

servidor.listen(PORTA, ()=>console.log("iniciou server, ouvindo porta "+PORTA));