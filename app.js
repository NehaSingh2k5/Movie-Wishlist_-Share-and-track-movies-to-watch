const contractAddress = "0xdc0b56cf00f6a5f6d947e8641c1a0eff2c208724";
const contractABI = [
    [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_title",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_director",
                    "type": "string"
                }
            ],
            "name": "addMovie",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_index",
                    "type": "uint256"
                }
            ],
            "name": "markAsWatched",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "director",
                    "type": "string"
                }
            ],
            "name": "MovieAdded",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "getWishlist",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "title",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "director",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "watched",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct MovieWishlist.Movie[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];

let web3;
let movieWishlistContract;
let userAccount;

// Initialize web3 and the contract
async function init() {
  if (window.ethereum) {
    try {
      // Request account access
      await ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);

      // Get the user's account
      const accounts = await web3.eth.getAccounts();
      userAccount = accounts[0];

      // Initialize the contract
      movieWishlistContract = new web3.eth.Contract(contractABI, contractAddress);

      // Load the wishlist
      loadWishlist();
    } catch (error) {
      console.error("User denied account access or other error:", error);
    }
  } else {
    alert("MetaMask is not installed. Please install it to use this app!");
  }
}

// Load the wishlist from the blockchain
async function loadWishlist() {
  const wishlistElement = document.getElementById("wishlist");
  wishlistElement.innerHTML = "";

  try {
    const movies = await movieWishlistContract.methods.getWishlist().call({ from: userAccount });

    if (movies.length === 0) {
      wishlistElement.innerHTML = "<li>No movies in your wishlist yet!</li>";
    }

    movies.forEach((movie, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${movie.title} by ${movie.director} - ${
        movie.watched ? "<span>Watched</span>" : `<button onclick="markAsWatched(${index})">Mark as Watched</button>`
      }`;
      wishlistElement.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading wishlist:", error);
  }
}

// Add a new movie to the wishlist
async function addMovie(title, director) {
  try {
    await movieWishlistContract.methods
      .addMovie(title, director)
      .send({ from: userAccount });

    alert("Movie added successfully!");
    loadWishlist();
  } catch (error) {
    console.error("Error adding movie:", error);
  }
}

// Mark a movie as watched
async function markAsWatched(index) {
  try {
    await movieWishlistContract.methods
      .markAsWatched(index)
      .send({ from: userAccount });

    alert("Movie marked as watched!");
    loadWishlist();
  } catch (error) {
    console.error("Error marking movie as watched:", error);
  }
}

// Handle form submission
document.getElementById("addMovieForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const director = document.getElementById("director").value;

  if (title && director) {
    addMovie(title, director);
  } else {
    alert("Please fill in both fields!");
  }
});

// Initialize the app
init();
