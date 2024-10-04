import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

// Keyframe animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
`;

// Styled components
const ApodContainer = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;
  font-family: 'Poppins', sans-serif;
`;

const ApodTitle = styled.h2`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  animation: ${fadeInDown} 0.5s ease-in-out;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const ApodImageContainer = styled.div`
  margin: 30px 0;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ApodImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 700px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
`;

const ApodDescription = styled.p`
  font-size: 1.15rem;
  color: #34495e;
  line-height: 1.8;
  margin-top: 20px;
  padding: 0 20px;
  animation: ${fadeInUp} 0.7s ease-in-out;
  text-align: justify;
  letter-spacing: 0.5px;
`;

const LoadingMessage = styled.p`
  font-size: 1.5rem;
  color: #555;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;
  color: #e74c3c;
  font-weight: 600;
`;

const Apod = () => {
  const [apodData, setApodData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Add Google Font link dynamically in useEffect
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const fetchApodData = async () => {
      try {
        const response = await axios.get(
          'https://api.nasa.gov/planetary/apod?api_key=ThBqzqy59KHboLZrLnCyudYqwFB1iHS5DqxNw7oP'
        );
        setApodData(response.data);
      } catch (error) {
        setError('Error fetching APOD data');
      }
    };
    fetchApodData();
  }, []);

  return (
    <ApodContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {apodData ? (
        <div>
          <ApodTitle>{apodData.title}</ApodTitle>
          <ApodImageContainer>
            <ApodImage src={apodData.url} alt={apodData.title} />
          </ApodImageContainer>
          <ApodDescription>{apodData.explanation}</ApodDescription>
        </div>
      ) : (
        <LoadingMessage>Loading APOD...</LoadingMessage>
      )}
    </ApodContainer>
  );
};

export default Apod;