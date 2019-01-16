import React, {Component} from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "option1"
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleOptionChange = event => {
    this.setState({
      selectedOption: event.target.value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.selectGame(this.state.selectedOption);
  };

  render() {
    return (
      <div>
        <h5>Choose your card game:</h5>
        <form onSubmit={this.handleFormSubmit}>
          <label>
            <input
              type="radio"
              name="cardgame"
              value="war"
              checked={this.state.selectedOption === "war"}
              onChange={this.handleOptionChange}
            />
            War
          </label>
          <label>
            <input
              type="radio"
              name="cardgame"
              value="blackjack"
              checked={this.state.selectedOption === "blackjack"}
              onChange={this.handleOptionChange}
            />
            Blackjack
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Form;