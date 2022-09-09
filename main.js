function renderResponse(response) {
  const list = document.getElementById("films-list"); // busca o elemento da lista no HTML
  list.innerHTML = "";
  response.forEach((film) => {
    // faz uma interacao dentro do array de filmes, percorrendo elemento
    const filmCard = document.createElement("div"); // cria uma div para cada filme
    filmCard.style.backgroundImage = `url(${film.image_url})`; // coloca a imagem de fundo
    filmCard.className = "film-card"; // estiliza o film card
    filmCard.onclick = function () {
      // funcao executada quando clica no card
      const modal = document.getElementById("modal"); // busca o modal no HTML
      modal.style.visibility = "visible"; // coloca o modal visivel
      const modalContent = document.getElementById("modal-content"); // busca o conteudo do modal no HTML
      modalContent.innerHTML = ""; // limpa tudo estiver dentro

      const filmTitle = document.createTextNode(film.title); // cria um node text com o titulo do filme
      const filmTitleElement = document.createElement("h1"); // cria um elemento para o titulo
      filmTitleElement.appendChild(filmTitle); // coloca o texto dentro do elemento do titulo
      modalContent.appendChild(filmTitleElement); // coloca o elemento do titulo dentro do modal content

      const filmSubTitle = document.createTextNode(film.subtitle); // Cria um subtitulo para o filme
      const filmSubtitleElement = document.createElement("h3"); // Cria um elemento para o subtitulo
      filmSubtitleElement.appendChild(filmSubTitle); // coloca o texto dentro do elemento do subtitulo
      modalContent.appendChild(filmSubtitleElement); // coloca o elemento do subtitulo dentro do modal content

      const filmDescription = document.createTextNode(film.description);
      const filmDescriptionElement = document.createElement("p");
      filmDescriptionElement.appendChild(filmDescription);
      modalContent.appendChild(filmDescriptionElement);
    };
    list.appendChild(filmCard);
  });
}

window.onload = function () {
  // busca todos os filmes na api
  fetch("https://sevencoders-starwars-wiki.herokuapp.com/films") // Link da API para puxar os filmes
    .then(async (data) => {
      const response = await data.json(); // pega o resultado, transforma e json
      renderResponse(response);
    })
    .catch((error) => {
      console.log({ error });
      alert("Erro ao carregar os filmes");
    });
};

function hideModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}

function onSearch() {
  const searchValue = document.getElementById("search-input").value; // Função para a barra de pesquisa puxar o conteúdo

  fetch(
    searchValue.length === 0
      ? "https://sevencoders-starwars-wiki.herokuapp.com/films"
      : `https://sevencoders-starwars-wiki.herokuapp.com/search?query=${searchValue}` // Link para puxar os filmes na barra de pesquisa
  )
    .then(async (data) => {
      const response = await data.json();
      renderResponse(response);
    })
    .catch((error) => {
      alert("Falha ao realizar a busca");
    });
}