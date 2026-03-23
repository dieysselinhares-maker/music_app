let musicas = [
  { nome: "Música 1", arquivo: "musica1.mp3", capa: "capa1.jpg" },
  { nome: "Música 2", arquivo: "musica2.mp3", capa: "capa2.jpg" },
  { nome: "Música 3", arquivo: "musica3.mp3", capa: "capa3.jpg" }
];

let player = document.getElementById("player");
let nomeMusica = document.getElementById("nomeMusica");
let capa = document.getElementById("capa");
let progresso = document.getElementById("progresso");
let playlist = document.getElementById("playlist");
let favoritosLista = document.getElementById("favoritos");

let indexAtual = 0;
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function carregarMusica(index) {
  let musica = musicas[index];
  player.src = musica.arquivo;
  nomeMusica.innerText = musica.nome;
  capa.src = musica.capa;
}
function tocar() {
  player.play();
}

function pausar() {
  player.pause();
}

function proxima() {
  indexAtual = (indexAtual + 1) % musicas.length;
  carregarMusica(indexAtual);
  tocar();
}

function anterior() {
  indexAtual = (indexAtual - 1 + musicas.length) % musicas.length;
  carregarMusica(indexAtual);
  tocar();
}

player.ontimeupdate = () => {
  progresso.value = (player.currentTime / player.duration) * 100;
};

progresso.oninput = () => {
  player.currentTime = (progresso.value / 100) * player.duration;
};

musicas.forEach((musica, index) => {
  let li = document.createElement("li");
  li.innerHTML = `${musica.nome} <button onclick="favoritar(${index})">❤️</button>`;
  li.onclick = () => {
    indexAtual = index;
    carregarMusica(index);
    tocar();
  };
  playlist.appendChild(li);
});

function favoritar(index) {
  let musica = musicas[index];
 if (!favoritos.find(m => m.nome === musica.nome)) {
    favoritos.push(musica);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    atualizarFavoritos();
  }
}

function atualizarFavoritos() {
  favoritosLista.innerHTML = "";

  favoritos.forEach((musica) => {
    let li = document.createElement("li");
    li.innerText = musica.nome;

    li.onclick = () => {
      player.src = musica.arquivo;
      player.play();
nomeMusica.innerText = musica.nome;
      capa.src = musica.capa;
    };

    favoritosLista.appendChild(li);
  });
}

carregarMusica(0);
atualizarFavoritos();