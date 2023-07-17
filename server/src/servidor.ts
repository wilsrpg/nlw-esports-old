import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client';

//console.log("iniciou server");

const servidor = express();
servidor.use(express.json());
servidor.use(cors({
	//origin: 'http://meudominio.com'
}));
const prisma = new PrismaClient(
	//{log:['query']}
);

//criação da lista inicial de jogos
/* n prestou
servidor.get('/cadastrarjogospadrao', () => {
	prisma.jogo.create({
		data: {
			nome: "Sword of Mana",
			url: "https://gamefaqs.gamespot.com/gba/914616-sword-of-mana/",
			urlImagem: "https://gamefaqs.gamespot.com/a/box/8/7/2/52872_thumb.jpg"
		}
	});
	prisma.jogo.create({
		data: {
			nome: "Golden Sun",
			url: "https://gamefaqs.gamespot.com/gba/468548-golden-sun/",
			urlImagem: "https://gamefaqs.gamespot.com/a/box/8/0/5/12805_thumb.jpg"
		}
	});
	prisma.jogo.create({
		data: {
			nome: "Golden Sun: The Lost Age",
			url: "https://gamefaqs.gamespot.com/gba/561356-golden-sun-the-lost-age/",
			urlImagem: "https://gamefaqs.gamespot.com/a/box/7/6/9/17769_thumb.jpg"
		}
	});
	prisma.jogo.create({
		data: {
			nome: "Pokémon Emerald Version",
			url: "https://gamefaqs.gamespot.com/gba/921905-pokemon-emerald-version/",
			urlImagem: "https://gamefaqs.gamespot.com/a/box/6/0/2/61602_thumb.jpg"
		}
	});
	prisma.jogo.create({
		data: {
			nome: "Chrono Trigger",
			url: "https://gamefaqs.gamespot.com/snes/563538-chrono-trigger/",
			urlImagem: "https://gamefaqs.gamespot.com/a/box/3/0/2/20302_thumb.jpg"
		}
	});
	prisma.jogo.create({
		data: {
			nome: "Seiken Densetsu 3",
			url: "https://gamefaqs.gamespot.com/snes/588648-seiken-densetsu-3/",
			urlImagem: "https://gamefaqs.gamespot.com/a/box/1/2/8/51128_thumb.jpg"
		}
	});
})*/
/*<GameBanner nome="Sword of Mana"
		url="https://gamefaqs.gamespot.com/gba/914616-sword-of-mana/"
		urlImagem="https://gamefaqs.gamespot.com/a/box/8/7/2/52872_thumb.jpg"
		qtdeAnuncios="6"
	/>
	<GameBanner nome="Golden Sun"
		url="https://gamefaqs.gamespot.com/gba/468548-golden-sun/"
		urlImagem="https://gamefaqs.gamespot.com/a/box/8/0/5/12805_thumb.jpg"
		qtdeAnuncios="5"
	/>
	<GameBanner nome="Golden Sun: The Lost Age"
		url="https://gamefaqs.gamespot.com/gba/561356-golden-sun-the-lost-age/"
		urlImagem="https://gamefaqs.gamespot.com/a/box/7/6/9/17769_thumb.jpg"
		qtdeAnuncios="4"
	/>
	<GameBanner nome="Pokémon Emerald Version"
		url="https://gamefaqs.gamespot.com/gba/921905-pokemon-emerald-version/"
		urlImagem="https://gamefaqs.gamespot.com/a/box/6/0/2/61602_thumb.jpg"
		qtdeAnuncios="3"
	/>
	<GameBanner nome="Chrono Trigger"
		url="https://gamefaqs.gamespot.com/snes/563538-chrono-trigger/"
		urlImagem="https://gamefaqs.gamespot.com/a/box/3/0/2/20302_thumb.jpg"
		qtdeAnuncios="2"
	/>
	<GameBanner nome="Seiken Densetsu 3"
		url="https://gamefaqs.gamespot.com/snes/588648-seiken-densetsu-3/"
		urlImagem="https://gamefaqs.gamespot.com/a/box/1/2/8/51128_thumb.jpg"
		qtdeAnuncios="1"
	/>*/

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
	return resp.json(jogos);
})

servidor.get('/anuncios', async (req, resp) => {
	const anuncios = await prisma.anuncio.findMany();
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
	return resp.status(201).json(anuncio);
})

function converterHoraStringParaMinutos(horaString:string) {
	const [horas, minutos] = horaString.split(':').map(Number);
	//const minutos = h*60+m;
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

	return resp.json(anuncios.map((anuncio)=>{
		return {...anuncio, diasQueJoga: anuncio.diasQueJoga.split(','),
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
	return resp.json({discord: anuncio.discord});
})

servidor.listen(3333, ()=>console.log("iniciou server, ouvindo porta 3333"));