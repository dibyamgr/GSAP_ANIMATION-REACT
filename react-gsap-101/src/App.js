import React, { useEffect, useRef } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  // to target the header , default -> null
  const headerRef = useRef(null);

  useEffect(() => {
    console.log(headerRef)
  }, [headerRef])
  // set header Ref as dependency

  return (
    <div className="App">
      {/* fade in header when page loads - we need to target the header DOM Element
      and twig the opacity  */}
      <header ref={headerRef} className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Scroll down to see sections being revealed by ScrollTrigger
        </p>

      </header>
    </div>
  );
}

export default App;
