import React from 'react';
import Tabs from './components/Tabs';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import './App.css';

// Global styles including the font
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #ffffff; /* Fixed the background color */
    color: #000000; /* Fixed the color */
  }
`;

// Keyframe animation for the title and introduction
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled component for the title
const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  color: #f1f1f1;
  text-transform: uppercase;
  letter-spacing: 3px;
  animation: ${fadeIn} 1.5s ease-out;
  margin: 20px 0;
`;

// Styled component for the introduction text with black color
const IntroText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  color: #000000; /* Changed the color to black */
  max-width: 800px;
  margin: 20px auto;
  text-align: center;
  line-height: 1.5;
  animation: ${fadeIn} 2s ease-out;
`;

// Main container for introduction and tabs
const AppContainer = styled.div`
  text-align: center;
`;

const App = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <header className="App-header">
        <Title>NASA Data Viewer</Title>
      </header>
      
      <IntroText>
        Welcome to the NASA Data Viewer! Explore stunning astronomy images, satellite tracking, and insights into space science. This platform allows you to access data from NASA’s APIs and interact with fascinating data visualizations about our universe.
      </IntroText>
      
      <Tabs />
    </AppContainer>
  );
};

export default App;