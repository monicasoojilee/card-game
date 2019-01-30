import React, {Component} from 'react';
import Header from './_header.jsx';
import Login from './Login.jsx';
import Blackjack from './Blackjack.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {players: [],
                  inQueue: true};
    this.sendBlackjackHands = this.sendBlackjackHands.bind(this);
  }

  loginInfo = (email, password, gameType) => {
    const userLogin = {
      type: 'login',
      email: email,
      password: password,
      gameType: gameType
    };
    this.socket.send(JSON.stringify(userLogin));
  }

  sendBlackjackHands = hands => {
    let handData = {type: "blackjackHand", data: hands}
    this.socket.send(JSON.stringify(handData));
  }

  componentDidMount() {
    // connects to Web Socket server
    this.socket = new WebSocket(
      'ws://localhost:3001'
    );

    // receives data from server
    this.socket.onmessage = (event) => {
      let serverData = JSON.parse(event.data);

      switch (serverData.type) {
        case 'session':
        let gameID = serverData.gameID;
        // let clientID = serverData.clientID;
        let playerOne = serverData.playerOne;
        let playerTwo = serverData.playerTwo;

        this.setState({ gameID: gameID,
                        playerOne: playerOne,
                        playerTwo: playerTwo });
        break;

        case 'login':
          if (serverData.users && (serverData.users.length === 2)) {
            this.setState({players: serverData.users, game_id: serverData.game_id, inQueue: false, currentDeck: serverData.currentDeck});
          } else {
            this.setState({inQueue: true});
          }
        break;

        // case 'currentDeck':
        // this.setState({currentDeck: serverData.data});
        // break;

        case 'blackjackHand':
        this.setState({currentDeck: serverData.data.currentDeck,
                       player1Hand: serverData.data.player1Hand,
                       player2Hand: serverData.data.player2Hand});
        break;
      }
    };
  }
  render() {
    return (
      <div>
        <Header />
        <Login loginInfo={this.loginInfo}/>
        {this.state.inQueue ? '' :
          <Blackjack currentDeck={this.state.currentDeck} sendBlackjackHands={this.sendBlackjackHands} player1Hand={this.state.player1Hand} player2Hand={this.state.player2Hand}/>}
      </div>
    );
  }
}
export default App;
