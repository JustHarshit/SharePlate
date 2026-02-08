import axios from 'axios';
import { Capacitor } from '@capacitor/core';
import { getItem } from './utils/storage';

// Determine the correct API base URL
const getBaseUrl = () => {
  if (Capacitor.isNativePlatform()) {
    // Production API for mobile apps
    return 'https://your-production-domain.com/api';
    // OR for testing with local backend on same network:
    // return 'http://YOUR_LOCAL_IP:5000/api'; // e.g., http://192.168.1.100:5000/api
  }
  // For web development
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getBaseUrl();

export const sendMessageToBot = async (message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chatbot/message`, { message });
    return response.data;
  } catch (error) {
    console.error('Error communicating with the chatbot:', error);
    throw error;
  }
};

export const fetchProtectedData = async (endpoint) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching protected data:', error);
    throw error;
  }
};