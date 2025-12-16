import api, { handleResponse, handleError } from './api';
import { Hospital, HospitalFilters, ApiResponse } from '../types';

export class HospitalService {
  // Get all hospitals with optional filters
  static async getHospitals(filters?: HospitalFilters): Promise<Hospital[]> {
    try {
      const params = new URLSearchParams();
      
      if (filters?.search) params.append('search', filters.search);
      if (filters?.category) params.append('category', filters.category);
      if (filters?.city) params.append('city', filters.city);
      if (filters?.specialty) params.append('specialty', filters.specialty);
      if (filters?.rating) params.append('rating', filters.rating.toString());
      if (filters?.approved_only !== undefined) params.append('approved_only', filters.approved_only.toString());
      
      const response = await api.get(`/hospitals/?${params.toString()}`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get hospital by ID
  static async getHospitalById(id: number): Promise<Hospital> {
    try {
      const response = await api.get(`/hospitals/${id}`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get hospital services
  static async getHospitalServices(hospitalId: number): Promise<any[]> {
    try {
      const response = await api.get(`/hospitals/${hospitalId}/services`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Register a new hospital
  static async registerHospital(hospitalData: any): Promise<Hospital> {
    try {
      const response = await api.post('/hospitals/register', hospitalData);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Update hospital information
  static async updateHospital(id: number, hospitalData: Partial<Hospital>): Promise<Hospital> {
    try {
      const response = await api.put(`/hospitals/${id}`, hospitalData);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get hospital statistics
  static async getHospitalStats(hospitalId: number): Promise<any> {
    try {
      const response = await api.get(`/hospitals/${hospitalId}/stats`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Search hospitals
  static async searchHospitals(query: string): Promise<Hospital[]> {
    try {
      const response = await api.get(`/hospitals/?search=${encodeURIComponent(query)}`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get featured hospitals
  static async getFeaturedHospitals(limit: number = 6): Promise<Hospital[]> {
    try {
      const response = await api.get(`/hospitals/?limit=${limit}&approved_only=true`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get hospitals by category
  static async getHospitalsByCategory(category: string): Promise<Hospital[]> {
    try {
      const response = await api.get(`/hospitals/?category=${encodeURIComponent(category)}&approved_only=true`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get hospitals near a location
  static async getHospitalsNearLocation(lat: number, lng: number, radius: number = 10): Promise<Hospital[]> {
    try {
      // For now, just return approved hospitals. In production, this would use geospatial queries
      const response = await api.get(`/hospitals/?approved_only=true`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get hospital categories
  static async getCategories(): Promise<string[]> {
    try {
      const response = await api.get('/hospitals/categories/list');
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get hospital specialties
  static async getSpecialties(): Promise<string[]> {
    try {
      const response = await api.get('/hospitals/specialties/list');
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }
}

export default HospitalService;
