const API_KEY = "caa5e3d7a0734a918fcc99f9c89e410a";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load', () => fetchNews("India"));
function reload(){
  window.location.reload();
}


async function fetchNews (query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);

}
 
function bindData(articles){
    const cardsContainer = document.querySelector("#cards-container");
    const newsCardTemplate = document.querySelector("#template-news-card");

    cardsContainer.innerHTML = "";
    

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
          fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
  const newImg = cardClone.querySelector('#news-img');
  const newTitle = cardClone.querySelector('#news-title');
  const newSource = cardClone.querySelector('#news-source');
  const newDesc = cardClone.querySelector('#news-desc');


  newImg.src = article.urlToImage;
  newTitle.innerHTML = article.title;
  newDesc.innerHTML = article.description;


  const date = new Date(article.publishedAt).toLocaleString("en-US",{
    timeZone: "Asia/Jakarta"
  });

  newSource.innerHTML = `${article.source.name} -${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url,"_blank"); 
  })
  
}


let curSelectedNav = null;
function onNavItemClick(id){
         fetchNews(id);
         const navItem = document.getElementById(id);
         curSelectedNav?.classList.remove('active');
         curSelectedNav = navItem;
         curSelectedNav.classList.add('active');
         
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
  const query = searchText.value;
  if(!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove('active');
  curSelectedNav =null;
})
