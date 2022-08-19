import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { gsap } from 'gsap';

function App() {
  // state for backfround
  const [background, setBackground] = useState("#262626")

  // to target the header , default -> null
  const headerRef = useRef(null);

  // useLayoutEffect(() => {
  //   let from = gsap
  //     .from(headerRef.current, {
  //       immediateRender: false,
  //       duration: 1,
  //       autoAlpha: 0,
  //       ease: 'none',
  //       delay: 1,
  //     })
  //   return () => {
  //     from.kill()
  //   }
  // })

  // animate when state changes
  const toggleBackground = () => {
    const color = background !== '#262626' ? "#5a7d95" : "#1b4943"
    setBackground(color)
  }

  useEffect(() => {
    gsap.to(headerRef.current, {
      immediateRender: false,
      duration: 1,
      backgroundColor: background

    })
  }, [background])


  return (
    <div className="App">
      {/* fade in header when page loads - we need to target the header DOM Element
      and tween the opacity  */}
      <header ref={headerRef} className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => toggleBackground()}>Toggle Background</button>
        <p>
          Scroll down to see sections being revealed by ScrollTrigger
        </p>

      </header>
    </div>
  );
}

export default App;
