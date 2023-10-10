let myIndex = 0;
mainCarousel();

function mainCarousel() {
  let i;
  let SliderImgs = document.getElementsByClassName("mySlides");
  for (i = 0; i < SliderImgs.length; i++) {
    SliderImgs[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > SliderImgs.length) {
    myIndex = 1;
  }
  SliderImgs[myIndex - 1].style.display = "block";
  setTimeout(mainCarousel, 4000);
}

function fetchDataFromGoogleBooks(query, callback) {
  const xhr = new XMLHttpRequest();
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}`;

  xhr.open("GET", apiUrl, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.items) {
          const books = response.items.map((item) => {
            return {
              id: item.id,
              title: item.volumeInfo.title,
              authors: item.volumeInfo.authors,
              description: item.volumeInfo.description,
              thumbnail: item.volumeInfo.imageLinks
                ? item.volumeInfo.imageLinks.thumbnail
                : "No thumbnail available",
            };
          });
          callback(books);
        } else {
          console.error("No items found in the API response.");
        }
      } else {
        console.error(
          "Error fetching data from Google Books API. Status code: " +
            xhr.status
        );
      }
    }
  };
  xhr.send();
}

function displayBooks(books) {
  const resultsDiv = document.querySelector(".product-section");
  resultsDiv.innerHTML = "";

  books.forEach((book) => {
    const bookDiv = document.createElement("section");
    bookDiv.classList = "product-card";
    bookDiv.id = `${book.id}`;
    bookDiv.innerHTML = `
    
    <img
      src="${book.thumbnail}"
      alt="${book.title}"
    />
    <h3>${book.title}</h3>
    <p>
    ${book.description || "No description available"}
    </p>
    <span class="authors">${
      book.authors ? book.authors.join(", ") : "Unknown"
    }</span>
    <div class="BtnsDiv">
    <button class="Btns" onclick="addToCart()">Add to cart</button>
    <button class="Btns" onclick="viewDetails(this.closest('section').id)">View details</button>
    </div>
    `;
    resultsDiv.appendChild(bookDiv);
  });
}

function getBooks() {
  fetchDataFromGoogleBooks("software development", displayBooks);
}

let addToCartCount = 0;
const cartCount = document.querySelector(".cart-count");
function addToCart() {
  addToCartCount++;
  cartCount.innerHTML = `${addToCartCount}`;
  if (addToCartCount > 0) {
    cartCount.style.display = "block";
  }
}

function booksFilter() {
  const searchInput = document.getElementById("searchInput").value.trim();
  if (searchInput !== "") {
    fetchDataFromGoogleBooks(searchInput, displayBooks);
  } else {
    alert("Please enter a search query.");
  }
}

function viewDetails(id) {
  let bookApi = `https://www.googleapis.com/books/v1/volumes/${id}`;
  localStorage.setItem("bookAbi", bookApi);
  localStorage.setItem("addToCartV", addToCartCount);
  window.location.href = "./bookdetails.html";
}

getBooks();
