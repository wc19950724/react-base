import { Component } from "react";

export default class App extends Component {
  state = {
    value: "Taylor",
  };
  inputHandler = (e: React.FormEvent) => {
    this.setState({
      value: (e.target as HTMLInputElement).value,
    });
  };
  render() {
    return (
      <>
        <div>hello world</div>
        <input type="text" onInput={this.inputHandler} />
        <div>input value: {this.state.value}</div>
      </>
    );
  }
}
