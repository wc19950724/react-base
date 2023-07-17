import { Component, ReactNode } from "react";

export interface IProps {
  fallback?: ReactNode;
  children: ReactNode;
}

export interface IState {
  hasError: boolean;
  errorText: ReactNode | string;
}

export default class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hasError: false,
      errorText: "",
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch: Component["componentDidCatch"] = (error, info) => {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.log(error, info.componentStack);
    this.setState({
      errorText: <p>{String(error)}</p>,
    });
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || this.state.errorText;
    }

    return this.props.children;
  }
}
