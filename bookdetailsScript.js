document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = localStorage.getItem("bookAbi");
  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const bookTitle = data.volumeInfo.title;
      const bookDescription = data.volumeInfo.description;
      const bookAuthors = data.volumeInfo.authors;
      const bookPublisher = data.volumeInfo.publisher;
      const publishedDate = data.volumeInfo.publishedDate;
      const bookCoverUrl = data.volumeInfo.imageLinks.thumbnail;

      document.querySelector(".book-title").textContent = bookTitle;
      document.querySelector(".book-description").textContent = bookDescription;

      const authorsList = document.querySelector(".authors");
      authorsList.innerHTML = "";
      bookAuthors.forEach(function (author) {
        const li = document.createElement("li");
        li.textContent = author;
        authorsList.appendChild(li);
      });

      document.querySelector(".publisher span").textContent = bookPublisher;
      document.querySelector(".published-date span").textContent =
        publishedDate;
      document.querySelector(".book-image img").src = bookCoverUrl;
    } else {
      console.error("Error loading book details: " + xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error("Network error occurred.");
  };

  xhr.send();
});
updateCart();
function updateCart() {
  cartV = localStorage.getItem("addToCartV");
  cartCount = document.querySelector(".cart-count");
  cartCount.innerHTML = cartV;
  if (cartV > 0) {
    cartCount.style.display = "block";
  }
}
