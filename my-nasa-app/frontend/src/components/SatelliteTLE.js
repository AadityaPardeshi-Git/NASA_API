import React, { useState, useEffect } from 'react';
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

const rotateIn = keyframes`
  0% {
    transform: rotate(0deg);
    opacity: 0;
  }
  100% {
    transform: rotate(360deg);
    opacity: 1;
  }
`;

// Styled components
const SatelliteContainer = styled.div`
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

const SatelliteTitle = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  animation: ${fadeInUp} 0.5s ease-in-out;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const SatelliteDataContainer = styled.div`
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 12px;
  margin: 15px 0;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 0.7s ease-in-out;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }

  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(52, 152, 219, 0.4), transparent);
    animation: ${rotateIn} 6s linear infinite;
    z-index: 0;
  }
`;

const SatelliteDataLine = styled.p`
  font-size: 1.1rem;
  color: #34495e;
  line-height: 1.6;
  margin: 10px 0;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #3498db;
  }
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

const SatelliteTLE = ({ satellites }) => {
    const [tleData, setTleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Dynamically load the Poppins font
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        const fetchTLEData = async () => {
            try {
                const dataPromises = satellites.map(satellite => 
                    axios.get(`https://tle.ivanstanojevic.me/api/tle/${satellite}`)
                );
                const responses = await Promise.all(dataPromises);
                setTleData(responses.map(response => response.data));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching TLE data:', error.response || error.message);
                setError('Failed to fetch TLE data');
                setLoading(false);
            }
        };
        
        fetchTLEData();
    }, [satellites]);

    if (loading) return <LoadingMessage>Loading TLE data...</LoadingMessage>;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;

    return (
        <SatelliteContainer>
            {tleData.map((data) => (
                <SatelliteDataContainer key={data.satelliteId}>
                    <SatelliteTitle>Satellite TLE Data (ID: {data.satelliteId})</SatelliteTitle>
                    <SatelliteDataLine>Line 1: {data.line1}</SatelliteDataLine>
                    <SatelliteDataLine>Line 2: {data.line2}</SatelliteDataLine>
                </SatelliteDataContainer>
            ))}
        </SatelliteContainer>
    );
};

export default SatelliteTLE;