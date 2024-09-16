import { useState, useEffect, useRef } from "react";
import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import shouldForwardProp from "@styled-system/should-forward-prop";
import rays from "/rays.svg";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Druk Wide Bold Bold';
    font-style: normal;
    font-weight: normal;
    src: local('Druk Wide Bold Bold'), url('DrukWideBold.woff') format('woff');
    }

    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;1,100&display=swap');
`;

const StyledScrollController = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

const StyledScrollTrigger = styled.div`
  width: 100%;
  height: 1200vh;
  pointer-events: none;
`;

const StyledGraphicsWrapper = styled.div
  .withConfig({
    shouldForwardProp: (prop) =>
      (shouldForwardProp(prop) && prop !== "scroll") || prop !== "screenHeight",
  })
  .attrs<{ scroll: number; screenHeight: number }>(
    ({ scroll, screenHeight }) => ({
      style: {
        background: `${
          scroll >= screenHeight * 8
            ? "black"
            : "radial-gradient(circle, rgba(254,248,255,1) 14%, rgba(233,199,221,1) 56%, rgba(184,94,121,1) 72%, rgba(87,16,89,1) 81%, rgba(11,9,32,1) 89%)"
        }`,
      },
    })
  )<{ scroll: number; screenHeight: number }>`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

const StyledRays = styled.img
  .withConfig({
    shouldForwardProp: (prop) =>
      (shouldForwardProp(prop) && prop !== "scroll") || prop !== "screenHeight",
  })
  .attrs<{ scroll: number; screenHeight: number }>(
    ({ scroll, screenHeight }) => ({
      style: {
        display: `${
          scroll <= screenHeight * 2 || scroll >= screenHeight * 8
            ? "none"
            : "block"
        }`,
        transform: `scale(${
          scroll >= screenHeight * 8
            ? 1.07
            : 1 + (scroll / (screenHeight * 8)) * 0.07
        })`,
      },
    })
  )<{ src: string; alt: string; scroll: number; screenHeight: number }>`
  width: 100%;
  position: absolute;
  top: 0;
  transform-origin: center top;
  z-index: -5;
`;

const StyledJohnny = styled.img
  .withConfig({
    shouldForwardProp: (prop) =>
      (shouldForwardProp(prop) && prop !== "scroll") || prop !== "screenHeight",
  })
  .attrs<{ scroll: number; screenHeight: number }>(
    ({ scroll, screenHeight }) => ({
      style: {
        display: `${scroll <= screenHeight * 4 ? "none" : "block"}`,
        bottom: `${
          scroll >= screenHeight * 8
            ? 50
            : 45 + (scroll / (screenHeight * 8)) * 5
        }%`,
      },
    })
  )<{ src: string; alt: string; scroll: number; screenHeight: number }>`
  width: 20%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 50%);
  z-index: 1;
`;

const StyledForeground = styled.img
  .withConfig({
    shouldForwardProp: (prop) =>
      (shouldForwardProp(prop) && prop !== "scroll") || prop !== "screenHeight",
  })
  .attrs<{ scroll: number; screenHeight: number }>(
    ({ scroll, screenHeight }) => ({
      style: {
        display: `${scroll >= screenHeight * 8 ? "none" : "block"}`,
        bottom: `${
          scroll >= screenHeight * 8
            ? -4
            : -1 + (scroll / (screenHeight * 8)) * -3
        }vh`,
        transform: `scale(${
          scroll >= screenHeight * 8
            ? 1.07
            : 1 + (scroll / (screenHeight * 8)) * 0.07
        })`,
      },
    })
  )<{ src: string; alt: string; scroll: number; screenHeight: number }>`
  width: 100%;
  position: absolute;
  left: 0;
  z-index: 1;
`;

const StyledBackground = styled.img
  .withConfig({
    shouldForwardProp: (prop) =>
      (shouldForwardProp(prop) && prop !== "scroll") || prop !== "screenHeight",
  })
  .attrs<{ scroll: number; screenHeight: number }>(
    ({ scroll, screenHeight }) => ({
      style: {
        display: `${scroll >= screenHeight * 8 ? "none" : "block"}`,
        bottom: `${
          scroll >= screenHeight * 8
            ? 12
            : 14 - (scroll / (screenHeight * 8)) * 2
        }vh`,
        transform: `scale(${
          scroll >= screenHeight * 8
            ? 1.03
            : 1 + (scroll / (screenHeight * 8)) * 0.03
        })`,
      },
    })
  )<{ src: string; alt: string; scroll: number; screenHeight: number }>`
width: 100%;
position: absolute;
left: 0;
z-index: -3;
`;

const StyledBuildingsLeft = styled.img
  .withConfig({
    shouldForwardProp: (prop) =>
      (shouldForwardProp(prop) && prop !== "scroll") || prop !== "screenHeight",
  })
  .attrs<{ scroll: number; screenHeight: number }>(
    ({ scroll, screenHeight }) => ({
      style: {
        display: `${scroll >= screenHeight * 8 ? "none" : "block"}`,
        width: `${
          scroll >= screenHeight * 8
            ? 23
            : 22 + (scroll / (screenHeight * 8)) * 1
        }%`,
        bottom: `${
          scroll >= screenHeight * 8
            ? 11
            : 14 - (scroll / (screenHeight * 8)) * 3
        }vh`,
        left: `${
          scroll >= screenHeight * 8
            ? 18
            : 20 - (scroll / (screenHeight * 8)) * 2
        }vw`,
      },
    })
  )<{ src: string; alt: string; scroll: number; screenHeight: number }>`
  position: absolute;
  z-index: -2;
`;

const StyledBuildingsRight = styled.img
  .withConfig({
    shouldForwardProp: (prop) =>
      (shouldForwardProp(prop) && prop !== "scroll") || prop !== "screenHeight",
  })
  .attrs<{ scroll: number; screenHeight: number }>(
    ({ scroll, screenHeight }) => ({
      style: {
        display: `${scroll >= screenHeight * 8 ? "none" : "block"}`,
        width: `${
          scroll >= screenHeight * 8
            ? 38
            : 37 + (scroll / (screenHeight * 8)) * 1
        }%`,
        bottom: `${
          scroll >= screenHeight * 8
            ? 11
            : 14 - (scroll / (screenHeight * 8)) * 3
        }vh`,
        right: `${
          scroll >= screenHeight * 8 ? 5 : 7 - (scroll / (screenHeight * 8)) * 2
        }vw`,
      },
    })
  )<{ src: string; alt: string; scroll: number; screenHeight: number }>`
position: absolute;
z-index: -2;
`;

const StyledTowers = styled.img
  .withConfig({
    shouldForwardProp: (prop) =>
      (shouldForwardProp(prop) && prop !== "scroll") || prop !== "screenHeight",
  })
  .attrs<{ scroll: number; screenHeight: number }>(
    ({ scroll, screenHeight }) => ({
      style: {
        display: `${
          scroll <= screenHeight || scroll >= screenHeight * 8
            ? "none"
            : "block"
        }`,
        top: `${
          scroll >= screenHeight * 8 ? 3 : 5 - (scroll / (screenHeight * 8)) * 2
        }vh`,
      },
    })
  )<{ src: string; alt: string; scroll: number; screenHeight: number }>`
  width: 20vw;
  left: 50vw;
  transform: translateX(-50%);
  position: absolute;
  z-index: -4;
`;

const StyledWhiteTowers = styled.img
  .withConfig({
    shouldForwardProp: (prop) =>
      (shouldForwardProp(prop) && prop !== "scroll") || prop !== "screenHeight",
  })
  .attrs<{ scroll: number; screenHeight: number }>(
    ({ scroll, screenHeight }) => ({
      style: {
        display: `${scroll < screenHeight * 8 ? "none" : "block"}`,
        top: `${
          scroll <= screenHeight * 8
            ? 3
            : 3 + ((scroll - screenHeight * 8) / (screenHeight * 4)) * 6
        }vh`,
      },
    })
  )<{ src: string; alt: string; scroll: number; screenHeight: number }>`
  width: 20vw;
  left: 50%;
  transform:  translateX(-50%);
  position: absolute;
  z-index: 1;
`;

const StyledLightning = styled.img
  .withConfig({
    shouldForwardProp: (prop) =>
      (shouldForwardProp(prop) && prop !== "scroll") || prop !== "screenHeight",
  })
  .attrs<{ scroll: number; screenHeight: number }>(
    ({ scroll, screenHeight }) => ({
      style: {
        display: `${scroll < screenHeight * 8 ? "none" : "block"}`,
        transform: `scale(${
          scroll <= screenHeight * 8
            ? 100
            : 100 + ((scroll - screenHeight * 8) / (screenHeight * 4)) * 10
        }%)`,
      },
    })
  )<{ src: string; alt: string; scroll: number; screenHeight: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  z-index: 1;
`;

const StyledTitle = styled.div
  .withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "scroll",
  })
  .attrs<{ scroll: number; screenHeight: number }>(
    ({ scroll, screenHeight }) => ({
      style: {
        opacity: `${scroll >= screenHeight * 8 ? 1 : 0}`,
      },
    })
  )<{ scroll: number; screenHeight: number }>`
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -30%);
  z-index: 2;
  .title {
   font-family:'Druk Wide Bold Bold';
   color: red;
   text-shadow: 2px 2px 0px rgba(0,0,0,0.9);
  }
  .subtitle {
   font-family:'Roboto';
   color: white;
  }
  & > * {
    margin: 0;
    text-align: center;
  }
  & > *:first-child {
    font-size: 6vw;
  }
  & > *:nth-child(2) {
    font-size: 2.5vw;
  }
  & > *:nth-child(3) {
    font-size: 4vw;
    margin-top: 2vh;
  }
  & > *:nth-child(4) {
    font-size: 0.8vw;
    margin-top: 8em;
    letter-spacing: 0.3em;
  }
  & > *:nth-child(5) {
    font-size: 1.5vw;
    letter-spacing: 0.3em;
    margin-top: 0.5em;
  }
`;

function App() {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollControllerRef = useRef<HTMLDivElement>(null);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const handleScroll = () => {
    console.log(scrollControllerRef.current?.scrollTop || 0);
    if (scrollControllerRef.current) {
      setScrollTop(scrollControllerRef.current.scrollTop);
    }
  };

  const handleResize = () => {
    setScreenHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <StyledScrollController
        id="scroll-controller"
        onScroll={handleScroll}
        ref={scrollControllerRef}
      >
        <StyledScrollTrigger id="aaa" />
        <StyledGraphicsWrapper scroll={scrollTop} screenHeight={screenHeight}>
          <StyledForeground
            src={`${import.meta.env.BASE_URL}foreground.png`}
            alt="Illustration foreground"
            scroll={scrollTop}
            screenHeight={screenHeight}
          />
          <StyledWhiteTowers
            src={`${import.meta.env.BASE_URL}white_towers.png`}
            alt="Illustration towers"
            scroll={scrollTop}
            screenHeight={screenHeight}
          />
          <StyledLightning
            src={`${import.meta.env.BASE_URL}lightning.png`}
            alt="Illustration lightning"
            scroll={scrollTop}
            screenHeight={screenHeight}
          />
          <StyledJohnny
            src={`${import.meta.env.BASE_URL}johnny.png`}
            alt="Illustration Johnny"
            scroll={scrollTop}
            screenHeight={screenHeight}
          />
          <StyledTitle scroll={scrollTop} screenHeight={screenHeight}>
            <p className="title">JOHNNY</p>
            <p className="title">SAVES</p>
            <p className="title">ROCK AND ROLL</p>
            <p className="subtitle">A GAME INSPIRED BY</p>
            <p className="subtitle">
              THE SPIRIT OF <b>CREATIVITY</b>
            </p>
          </StyledTitle>
          <StyledBuildingsLeft
            src={`${import.meta.env.BASE_URL}buildings_left.png`}
            alt="Illustration buildings left"
            scroll={scrollTop}
            screenHeight={screenHeight}
          />
          <StyledBuildingsRight
            src={`${import.meta.env.BASE_URL}buildings_right.png`}
            alt="Illustration buildings right"
            scroll={scrollTop}
            screenHeight={screenHeight}
          />
          <StyledTowers
            src={`${import.meta.env.BASE_URL}towers.png`}
            alt="Illustration buildings right"
            scroll={scrollTop}
            screenHeight={screenHeight}
          />
          <StyledBackground
            src={`${import.meta.env.BASE_URL}buildings_background.png`}
            alt="Illustration background"
            scroll={scrollTop}
            screenHeight={screenHeight}
          />
          <StyledRays
            src={rays}
            alt="Illustration rays"
            scroll={scrollTop}
            screenHeight={screenHeight}
          />
        </StyledGraphicsWrapper>
      </StyledScrollController>
    </>
  );
}

export default App;
