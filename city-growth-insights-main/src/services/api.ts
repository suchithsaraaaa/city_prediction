import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  population: number;
}

export interface Prediction {
  id: number;
  city: City;
  growth_score: number;
  predicted_growth: number;
  livability_score: number;
  livability_growth: number;
  gdp_current: number;
  gdp_growth_rate: number;
  crime_rate: number;
  traffic_index: number;
  aqi: number;
  historic_growth: { year: number; growth_rate: number; gdp: number }[];
  positive_factors: string[];
  negative_factors: string[];
}

export interface NewsItem {
  title: string;
  link: string;
  source: string;
  published: string;
}

export const fetchCities = async (): Promise<City[]> => {
  const response = await api.get('/api/cities/');
  return response.data;
};

export const fetchPredictions = async (): Promise<Prediction[]> => {
  const response = await api.get('/api/predictions/');
  return response.data;
};

export const fetchNews = async (country: string = 'India'): Promise<NewsItem[]> => {
  const response = await api.get(`/api/news/?country=${country}`);
  return response.data;
};

export default api;
