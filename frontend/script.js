document.addEventListener("DOMContentLoaded", () => {
  // Load articles
  fetch("/articles")
    .then(response => response.json())
    .then(articles => {
      const container = document.getElementById("articles-container");
      container.innerHTML = "";

      articles.forEach(article => {
        const articleDiv = document.createElement("div");
        articleDiv.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.content}</p>
        `;
        container.appendChild(articleDiv);
      });
    })
    .catch(error => {
      console.error("Error loading articles:", error);
      document.getElementById("articles-container").innerHTML = "<p>Error loading articles.</p>";
    });

  // Load news updates
  fetch("/news")
    .then(response => response.json())
    .then(news => {
      const container = document.getElementById("news-container");
      container.innerHTML = "";

      news.forEach(item => {
        const newsDiv = document.createElement("div");
        newsDiv.innerHTML = `
          <h3>${item.title}</h3>
          <p><strong>${item.date}</strong></p>
          <p>${item.content}</p>
        `;
        container.appendChild(newsDiv);
      });
    })
    .catch(error => {
      console.error("Error loading news:", error);
      document.getElementById("news-container").innerHTML = "<p>Error loading news.</p>";
    });
});

// Function to handle voting
function castVote(vote) {
  const voteResult = document.getElementById('vote-result');
  voteResult.innerHTML = `You voted: ${vote}`;
}
