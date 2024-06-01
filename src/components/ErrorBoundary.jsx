import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to trigger fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>Please refresh the page or try again later.</p>
        </div>
      );
    }

    // Render children if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
