# Movie Wishlist DApp

A decentralized application (DApp) that allows users to create and manage their personal movie watchlist on the Ethereum blockchain. Users can add movies, mark them as watched, and view their wishlist.

## Features

- Connect with MetaMask wallet
- Add movies with title and director information
- View personal movie wishlist
- Mark movies as watched
- Persistent storage on the Ethereum blockchain
- Responsive web design

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Web3.js
- MetaMask
- Ethereum Smart Contract

## Prerequisites

- MetaMask browser extension installed
- Some ETH in your wallet for gas fees (if using mainnet)
- Modern web browser (Chrome, Firefox, Edge, etc.)

## Smart Contract Details

The application interacts with a smart contract deployed at:
`0xdc0b56cf00f6a5f6d947e8641c1a0eff2c208724`

### Contract Functions

- `addMovie(string _title, string _director)`: Add a new movie to the wishlist
- `getWishlist()`: Retrieve the user's movie wishlist
- `markAsWatched(uint256 _index)`: Mark a specific movie as watched

## Installation & Setup

1. Clone this repository:
```bash
git clone [repository-url]
```

2. Open the `index.html` file in a web browser, or serve it using a local development server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js's http-server
npx http-server
```

3. Ensure MetaMask is installed and connected to the appropriate network

## Usage

1. Connect your MetaMask wallet when prompted
2. Add a movie:
   - Enter the movie title
   - Enter the director's name
   - Click "Add Movie"
3. View your wishlist:
   - Click "Get Wishlist" to see your movies
   - Movies will display with their title, director, and watched status
4. Mark movies as watched:
   - Click "Mark as Watched" next to any movie to update its status

## Styling

The application features a clean, modern design with:
- Responsive layout
- Card-based design
- Clear typography
- Visual feedback for user actions
- Consistent color scheme
- Mobile-friendly interface

## Security Features

- Secure MetaMask integration
- Individual user data isolation
- Transaction signing for all blockchain interactions
- Input validation

## Error Handling

The application includes error handling for:
- MetaMask connection issues
- Transaction failures
- Network issues
- Invalid input data

## Events

The smart contract emits the following event:
```solidity
event MovieAdded(
    address indexed user,
    string title,
    string director
)
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.
