import React from 'react';
import LoginStackNav from './app/components/Navigation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  // TODO: handle login page here
  render() {
    return <LoginStackNav />;
  }
}

export default App;
