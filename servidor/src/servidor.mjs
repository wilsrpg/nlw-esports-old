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

async function iniciar() {
	//const db = await abrirBanco;
	//await db.run(`PRAGMA foreign_keys = ON;`);
	//const A = await db.get(`PRAGMA foreign_keys;`);
	//console.log(A);
	
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
	const jogo = await db.get(`SELECT * FROM Jogos WHERE nomeUrl = '${jogoNomeUrl}';`);
	console.log("GET jogos/jogo="+jogo.nome+", ip="+req.ip);
	return resp.json(jogo);
});

servidor.post('/jogosrecentes', async (req, resp)=>{
	const db = await abrirBanco;
	const qtde = parseInt(req.body.qtde);
	console.log("GET jogosrecentes, qtde="+qtde+" ip="+req.ip);
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
		`SELECT Anuncios.id, jogoId, Jogos.nome AS nomeDoJogo, nomeDoUsuario, tempoDeJogoEmAnos,
			diasQueJoga, deHora, ateHora, usaChatDeVoz, dataDeCriacao
		FROM Anuncios JOIN Jogos ON jogoId = Jogos.id
		WHERE Jogos.nomeUrl LIKE (?)
		  AND nomeDoUsuario ${exatamente ? '=' : (naoContem ? 'NOT ' : '') + 'LIKE'} (?)
			AND tempoDeJogoEmAnos ${noMaximo ? '<=' : '>='} (?)
			${''/*AND diasQueJoga LIKE (?)
			AND deHora <= (?)
			AND ateHora >= (?)*/}
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

	//console.log({
	//	diasQueJoga: anuncios[0].diasQueJoga.split(','),
	//	horarioDeInicio: converterMinutosParaHoraString(anuncios[0].deHora),
	//	horarioDeTermino: converterMinutosParaHoraString(anuncios[0].ateHora)
	//});
	console.log("POST anuncios, qtde="+anuncios.length+", ip="+req.ip);
	return resp.json(anuncios.map(anuncio=>{
		return {...anuncio,
			diasQueJoga: anuncio.diasQueJoga.split(','),
			deHora: converterMinutosParaHoraString(anuncio.deHora),
			ateHora: converterMinutosParaHoraString(anuncio.ateHora)
		};
	}));
});

//só usado no modal de jogo selecionado, na página inicial
servidor.get('/jogos/:jogoNomeUrl/anuncios', async (req, resp)=>{
	const jogoNomeUrl = req.params.jogoNomeUrl;
	const db = await abrirBanco;
	const jogo = await db.get(`SELECT id FROM Jogos WHERE nomeUrl = '${jogoNomeUrl}';`);
	//console.log(jogo.id);
	const anuncios = await db.all(
		`SELECT id,nomeDoUsuario,tempoDeJogoEmAnos,diasQueJoga,deHora,ateHora,usaChatDeVoz,dataDeCriacao
		FROM Anuncios
		WHERE jogoId='${jogo.id}'
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
	const anuncio = await db.get(`SELECT discord FROM Anuncios WHERE id='${anuncioId}';`);
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
		const usuarioRegistrado = await db.get( `SELECT id,nome FROM Usuarios WHERE nome = (?);`, [body.nomeDoUsuario]);
		//console.log(usuarioRegistrado);
		//return resp.status(201).json({usuario: usuarioRegistrado});
		return resp.status(201).json({id: usuarioRegistrado.id, nome: usuarioRegistrado.nome});
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
});

servidor.post('/entrar', async (req, resp)=>{
	try {
		const body = req.body;
		console.log("POST entrar, usuário="+body.nomeDoUsuario+", ip="+req.ip);
		//console.log("sql="+`SELECT * FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		const db = await abrirBanco;
		//const usuarioExiste = await db.get(`SELECT * FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		const usuarioExiste = await db.get(`SELECT * FROM Usuarios WHERE nome = (?);`,[body.nomeDoUsuario]);
		//console.log("existe="+usuarioExiste);
		if (!usuarioExiste)
			return resp.status(404).json({erro: 'Este nome de usuário não está registrado.'});
		//const senhaHash = await db.get(`SELECT senhaHash FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		const senhaCorreta = await bcrypt.compare(body.senha, usuarioExiste.senhaHash);
		if (!senhaCorreta)
			return resp.status(401).json({erro: 'Senha incorreta.'});
		return resp.status(201).json({id: usuarioExiste.id, nome: usuarioExiste.nome});
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
});

//se for manter sessão:
/*servidor.post('/sair', async (req, resp)=>{
	try{
	//const body = req.body;
	//console.log("POST sair, usuário="+body.nomeDoUsuario+", ip="+req.ip);
	//const db = await abrirBanco;
	//const usuarioExiste = await db.get(`SELECT id,nome FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
	//if (!usuarioExiste)
	//	return resp.status(404).json({erro: 'Este nome de usuário não está registrado.'});
	return resp.status(200).json(???);
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
});*/

servidor.post('/alterarsenha', async (req, resp)=>{
	try {
		const body = req.body;
		console.log("POST alterarsenha, usuário="+body.nomeDoUsuario+", ip="+req.ip);
		const db = await abrirBanco;
		//const usuarioExiste = await db.get(`SELECT * FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		const usuarioExiste = await db.get(`SELECT * FROM Usuarios WHERE nome = (?);`,[body.nomeDoUsuario]);
		if (!usuarioExiste)
			return resp.status(404).json({erro: 'Este nome de usuário não está registrado.'});
		const senhaCorreta = await bcrypt.compare(body.senha, usuarioExiste.senhaHash);
		if (!senhaCorreta)
			return resp.status(401).json({erro: 'Senha incorreta.'});
		const novaSenhaHash = await bcrypt.hash(body.novaSenha, bcryptSaltRounds);
		//await db.run(`INSERT INTO Usuarios (id, nome, senhaHash, dataDeCriacao) VALUES (?,?,?,?);`,
			//[uuidv4(), body.nomeDoUsuario, senhaHash, Date.now()],
		//await db.run(`UPDATE Usuarios SET senhaHash = '${novaSenhaHash}' WHERE nome = '${body.nomeDoUsuario}';`);
		await db.run(`UPDATE Usuarios SET senhaHash = (?) WHERE nome = (?);`, [novaSenhaHash, body.nomeDoUsuario]);
		return resp.status(200).json({ok: 'Senha alterada com sucesso.'});
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
});

servidor.post('/excluirconta', async (req, resp)=>{
	try {
		const body = req.body;
		console.log("POST excluirconta, usuário="+body.nomeDoUsuario+", ip="+req.ip);
		const db = await abrirBanco;
		//const usuarioExiste = await db.get(`SELECT * FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		const usuarioExiste = await db.get(`SELECT * FROM Usuarios WHERE nome = (?);`,[body.nomeDoUsuario]);
		if (!usuarioExiste)
			return resp.status(404).json({erro: 'Este nome de usuário não está registrado.'});
		const senhaCorreta = await bcrypt.compare(body.senha, usuarioExiste.senhaHash);
		if (!senhaCorreta)
			return resp.status(401).json({erro: 'Senha incorreta.'});
		//await db.run(`DELETE FROM Usuarios WHERE nome = '${body.nomeDoUsuario}';`);
		await db.run(`DELETE FROM Usuarios WHERE nome = (?);`,[body.nomeDoUsuario]);
		return resp.status(200).json({ok: 'Conta excluída.'});
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
});

servidor.post('/excluiranuncio', async (req, resp)=>{
	try {
		const body = req.body;
		console.log("POST excluiranuncio, id="+body.idDoAnuncio+", ip="+req.ip);
		const db = await abrirBanco;
		await db.run(`DELETE FROM Anuncios WHERE id = (?);`,[body.idDoAnuncio]);
		//await new Promise(r=>setTimeout(r,1000));
		return resp.status(200).json({ok: 'Anúncio excluído.'});
	}
	catch (erro) {
		console.log("entrou no catch");
		console.log(erro);
		return resp.status(500).json({erro});
	}
});

servidor.put('/novoanuncio', async (req, resp)=>{
	const body = req.body;
	console.log("PUT novoanuncio, usuário="+body.idDoUsuario+", ip="+req.ip);

	console.log(body);
	return resp.status(200).json({ok: 'Anúncio recebido, mas não registrado.'});
	//const disponibilidade = [];
	//disponibilidade.push({
	//	diasQueJoga: body.diasQueJoga,
	//	horarioDeInicio: converterHoraStringParaMinutos(body.deHora),
	//	horarioDeTermino: converterHoraStringParaMinutos(body.ateHora)
	//});

	//const db = await abrirBanco;
	//await db.run(`INSERT INTO Anuncios2
	//	(idDoJogo, idDoUsuario, nomeNoJogo, tempoDeJogoEmMeses, discord, diasQueJoga, usaChatDeVoz, dataDeCriacao)
	//	VALUES (?,?,?,?,?,?,?,?);`,
	//	[body.idDoJogo, body.idDoUsuario, body.nomeNoJogo, body.tempoDeJogoEmMeses, body.discord, body.diasQueJoga,
	//	converterHoraStringParaMinutos(body.deHora), converterHoraStringParaMinutos(body.ateHora),
	//	body.usaChatDeVoz, Date.now()],
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
	//)
	//.then(async dados=>{
	//	//console.log("dados:");
	//	//console.log(dados);
	//	const anuncioPublicado = await db.get(
	//		`SELECT * FROM Anuncios WHERE dataDeCriacao = (SELECT MAX(dataDeCriacao) FROM Anuncios);`
	//	);
	//	//console.log(anuncioPublicado);
	//	return resp.status(201).json(anuncioPublicado);
	//})
	//.catch(erro=>{
	//	console.log("entrou no catch");
	//	console.log(erro);
	//	return resp.status(500).json(erro);
	//});
});

servidor.listen(
	process.env.PORTA_DO_SERVIDOR,
	()=>console.log("iniciou server, ouvindo porta "+process.env.PORTA_DO_SERVIDOR)
);