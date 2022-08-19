import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

// Create an Array of React Refs
const sections = [
  {
    title: 'Title 1',
    subtitle: 'Subtitle 1'
  },
  {
    title: 'Title 2',
    subtitle: 'Subtitle 2'
  },
  {
    title: 'Title 3',
    subtitle: 'Subtitle 3'
  },
]
function App() {
  // state for backfround
  const [background, setBackground] = useState("#262626")

  // to target the header , default -> null
  const headerRef = useRef(null);

  // For REACT 18 and above with strict mode solutions
  useLayoutEffect(() => {
    let from = gsap
      .from(headerRef.current, {
        immediateRender: false,
        duration: 1,
        autoAlpha: 0,
        ease: 'none',
        delay: 1,
      })

    revealRefs.current.forEach((el, index) => {
      gsap.fromTo(el,
        {
          autoAlpha: 0
        },
        {
          duration: 1,
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: el,
            start: 'top center+=100',
            toggleActions: 'play none none reverse',
            markers: true
          }
        })
    })


    return () => {
      from.kill()
    }
  })

  // useEffect(() => {
  //   gsap.from(headerRef.current, {
  //     duration: 1,
  //     autoAlpha: 0,
  //     ease: 'none',
  //     delay: 1
  //   })
  // }, [])

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

  // Create an Array of React Refs for animation 
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }

    // now we have got this array setup in ref nicely so that we can loop over it in one of our use Effect and tween over them individually
    console.log(revealRefs.current);
  }

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
      <main className="App-main">
        {
          sections.map(section => {
            return (
              <div className="App-section" key={section.title} ref={addToRefs}>
                <h2>{section.title}</h2>
                <p>{section.subtitle}</p>
              </div>
            )
          })
        }
      </main>
    </div>
  );
}

export default App;
