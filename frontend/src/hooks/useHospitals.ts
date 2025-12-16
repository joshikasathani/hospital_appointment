import { useState, useEffect, useCallback } from 'react';
import { Hospital, HospitalFilters } from '../types';
import HospitalService from '../services/hospitalService';

export const useHospitals = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<HospitalFilters>({});

  // Fetch hospitals with filters
  const fetchHospitals = useCallback(async (customFilters?: HospitalFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const fetchedHospitals = await HospitalService.getHospitals({
        ...customFilters,
        approved_only: true // Only show approved hospitals by default
      });
      
      setHospitals(fetchedHospitals);
    } catch (err: any) {
      console.error('Failed to fetch hospitals from backend:', err);
      // Fallback to sample data if backend fails
      const sampleHospitals: Hospital[] = [
        {
          id: 1,
          name: 'City General Hospital',
          address: '123 Main St, New York, NY 10001',
          city: 'New York',
          contact_email: 'info@citygeneral.com',
          contact_phone: '+1 (555) 123-4567',
          category: 'Multi-Specialty',
          specialties: ['Cardiology', 'Neurology'],
          facilities: ['Emergency Room', 'ICU'],
          services: ['General Medicine', 'Surgery'],
          timings: { 'monday': '8:00 AM - 8:00 PM' },
          images: ['https://images.unsplash.com/photo-1538108149393?w=800'],
          description: 'A leading multi-specialty hospital with comprehensive care',
          is_approved: true,
          rating: 4.5,
          price_range: '$100 - $500'
        },
        {
          id: 2,
          name: 'MediCare Center',
          address: '456 Oak Ave, Los Angeles, CA 90001',
          city: 'Los Angeles',
          contact_email: 'info@medicare.com',
          contact_phone: '+1 (555) 987-6543',
          category: 'General',
          specialties: ['Internal Medicine', 'Pediatrics'],
          facilities: ['Emergency Room', 'Laboratory'],
          services: ['Primary Care', 'Pediatrics'],
          timings: { 'monday': '9:00 AM - 6:00 PM' },
          images: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6cb79?w=800'],
          description: 'Providing quality healthcare services to the community',
          is_approved: true,
          rating: 4.2,
          price_range: '$50 - $300'
        }
      ];
      setHospitals(sampleHospitals);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search hospitals
  const searchHospitals = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const searchedHospitals = await HospitalService.searchHospitals(query);
      setHospitals(searchedHospitals);
    } catch (err: any) {
      console.error('Failed to search hospitals:', err);
      // Fallback to sample data filtered by search query
      const sampleHospitals: Hospital[] = [
        {
          id: 1,
          name: 'City General Hospital',
          address: '123 Main St, New York, NY 10001',
          city: 'New York',
          contact_email: 'info@citygeneral.com',
          contact_phone: '+1 (555) 123-4567',
          category: 'Multi-Specialty',
          specialties: ['Cardiology', 'Neurology'],
          facilities: ['Emergency Room', 'ICU'],
          services: ['General Medicine', 'Surgery'],
          timings: { 'monday': '8:00 AM - 8:00 PM' },
          images: ['https://images.unsplash.com/photo-1538108149393?w=800'],
          description: 'A leading multi-specialty hospital with comprehensive care',
          is_approved: true,
          rating: 4.5,
          price_range: '$100 - $500'
        }
      ].filter(h => h.name.toLowerCase().includes(query.toLowerCase()));
      setHospitals(sampleHospitals);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get featured hospitals
  const getFeaturedHospitals = useCallback(async (limit: number = 6) => {
    try {
      setLoading(true);
      setError(null);
      const featuredHospitals = await HospitalService.getFeaturedHospitals(limit);
      setHospitals(featuredHospitals);
    } catch (err: any) {
      console.error('Failed to fetch featured hospitals:', err);
      // Fallback to sample data
      const sampleHospitals: Hospital[] = [
        {
          id: 1,
          name: 'City General Hospital',
          address: '123 Main St, New York, NY 10001',
          city: 'New York',
          contact_email: 'info@citygeneral.com',
          contact_phone: '+1 (555) 123-4567',
          category: 'Multi-Specialty',
          specialties: ['Cardiology', 'Neurology'],
          facilities: ['Emergency Room', 'ICU'],
          services: ['General Medicine', 'Surgery'],
          timings: { 'monday': '8:00 AM - 8:00 PM' },
          images: ['https://images.unsplash.com/photo-1538108149393?w=800'],
          description: 'A leading multi-specialty hospital with comprehensive care',
          is_approved: true,
          rating: 4.5,
          price_range: '$100 - $500'
        },
        {
          id: 2,
          name: 'MediCare Center',
          address: '456 Oak Ave, Los Angeles, CA 90001',
          city: 'Los Angeles',
          contact_email: 'info@medicare.com',
          contact_phone: '+1 (555) 987-6543',
          category: 'General',
          specialties: ['Internal Medicine', 'Pediatrics'],
          facilities: ['Emergency Room', 'Laboratory'],
          services: ['Primary Care', 'Pediatrics'],
          timings: { 'monday': '9:00 AM - 6:00 PM' },
          images: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6cb79?w=800'],
          description: 'Providing quality healthcare services to the community',
          is_approved: true,
          rating: 4.2,
          price_range: '$50 - $300'
        }
      ].slice(0, limit);
      setHospitals(sampleHospitals);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get hospital by ID
  const getHospitalById = useCallback(async (id: number): Promise<Hospital | null> => {
    try {
      setLoading(true);
      setError(null);
      const hospital = await HospitalService.getHospitalById(id);
      return hospital;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch hospital details');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<HospitalFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    return updatedFilters;
  }, [filters]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Get hospitals by category
  const getHospitalsByCategory = useCallback(async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      const categoryHospitals = await HospitalService.getHospitalsByCategory(category);
      setHospitals(categoryHospitals);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch hospitals by category');
    } finally {
      setLoading(false);
    }
  }, []);

  // Get hospitals near location
  const getHospitalsNearLocation = useCallback(async (lat: number, lng: number, radius: number = 10) => {
    try {
      setLoading(true);
      setError(null);
      const nearbyHospitals = await HospitalService.getHospitalsNearLocation(lat, lng, radius);
      setHospitals(nearbyHospitals);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch nearby hospitals');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchHospitals();
  }, []);

  return {
    hospitals,
    loading,
    error,
    filters,
    fetchHospitals,
    searchHospitals,
    getFeaturedHospitals,
    getHospitalById,
    updateFilters,
    resetFilters,
    getHospitalsByCategory,
    getHospitalsNearLocation,
  };
};

export default useHospitals;
