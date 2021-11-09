import React, { Component } from "react";

class Dog extends Component {
  constructor() {
    super();
    this.state = {
      dogUrl: undefined,
      loading: true,
    }
    this.fetchDog = this.fetchDog.bind(this);
  }

  async fetchDog() {
    this.setState(
      { loading: true },
      async () => {
        const apiUrl = 'https://dog.ceo/api/breeds/image/random';
        const resultReq = await fetch(apiUrl).then((res) => res.json());
        this.setState({
          dogUrl: resultReq.message,
          loading: false,
        });
      }
    )
  }

  componentDidMount() {
    this.fetchDog();
  }

  componentDidUpdate() {
    if(this.state.dogUrl) {
      const race = this.state.dogUrl.split('/')[4];
      localStorage.setItem('doguinho', this.state.dogUrl);
      alert(race)
    }
  }

  shouldComponentUpdate(_nextProps, nextState) {
    const { dogUrl } = nextState;
    if (dogUrl) {
      return dogUrl.includes('terrier') ? false : true;
    }
    return true;
  }

  dogHandler() {
    const { dogUrl } = this.state;
    return (
      <img src={dogUrl} alt="" />
    )
  }

  render() {
    const { loading } = this.state;
    const loadingElement = <p>Loading ...</p>;

    return (
      <div>
        { loading ? loadingElement : this.dogHandler() }
        <button onClick={this.fetchDog}>Mais um doguinho!</button>
      </div>
    )
  }
}

export default Dog;