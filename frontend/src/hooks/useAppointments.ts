import { useState, useEffect, useCallback } from 'react';
import { Appointment, BookingFormData } from '../types';
import AppointmentService from '../services/appointmentService';
import { useAuth } from '../context/AuthContext';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch user's appointments
  const fetchAppointments = useCallback(async (status?: string) => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await AppointmentService.getPatientAppointments(user.id, status);
      setAppointments(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Create new appointment
  const createAppointment = useCallback(async (bookingData: BookingFormData): Promise<Appointment | null> => {
    try {
      setLoading(true);
      setError(null);
      const appointment = await AppointmentService.createAppointment(bookingData);
      setAppointments(prev => [...prev, appointment]);
      return appointment;
    } catch (err: any) {
      setError(err.message || 'Failed to create appointment');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update appointment
  const updateAppointment = useCallback(async (id: number, appointmentData: Partial<Appointment>): Promise<Appointment | null> => {
    try {
      setLoading(true);
      setError(null);
      const updatedAppointment = await AppointmentService.updateAppointment(id, appointmentData);
      setAppointments(prev => prev.map(apt => apt.id === id ? updatedAppointment : apt));
      return updatedAppointment;
    } catch (err: any) {
      setError(err.message || 'Failed to update appointment');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cancel appointment
  const cancelAppointment = useCallback(async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const cancelledAppointment = await AppointmentService.cancelAppointment(id);
      setAppointments(prev => prev.map(apt => apt.id === id ? cancelledAppointment : apt));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to cancel appointment');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Reschedule appointment
  const rescheduleAppointment = useCallback(async (id: number, newDate: string, newTime: string): Promise<Appointment | null> => {
    try {
      setLoading(true);
      setError(null);
      const rescheduledAppointment = await AppointmentService.rescheduleAppointment(id, newDate, newTime);
      setAppointments(prev => prev.map(apt => apt.id === id ? rescheduledAppointment : apt));
      return rescheduledAppointment;
    } catch (err: any) {
      setError(err.message || 'Failed to reschedule appointment');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get appointment by ID
  const getAppointmentById = useCallback(async (id: number): Promise<Appointment | null> => {
    try {
      setLoading(true);
      setError(null);
      const appointment = await AppointmentService.getAppointmentById(id);
      return appointment;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch appointment details');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get available time slots
  const getAvailableTimeSlots = useCallback(async (hospitalId: number, date: string): Promise<string[]> => {
    try {
      setLoading(true);
      setError(null);
      const timeSlots = await AppointmentService.getAvailableTimeSlots(hospitalId, date);
      return timeSlots;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch available time slots');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Check availability
  const checkAvailability = useCallback(async (hospitalId: number, date: string, time: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const isAvailable = await AppointmentService.checkAvailability(hospitalId, date, time);
      return isAvailable;
    } catch (err: any) {
      setError(err.message || 'Failed to check availability');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Send reminder
  const sendReminder = useCallback(async (appointmentId: number): Promise<boolean> => {
    try {
      await AppointmentService.sendReminder(appointmentId);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to send reminder');
      return false;
    }
  }, []);

  // Get appointment statistics
  const getAppointmentStats = useCallback(async () => {
    if (!user?.id) return null;
    
    try {
      setLoading(true);
      setError(null);
      const stats = await AppointmentService.getPatientAppointmentStats(user.id);
      return stats;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch appointment statistics');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Filter appointments by status
  const getAppointmentsByStatus = useCallback((status: string) => {
    return appointments.filter(apt => apt.status === status);
  }, [appointments]);

  // Get upcoming appointments
  const getUpcomingAppointments = useCallback(() => {
    return appointments.filter(apt => 
      apt.status === 'BOOKED' && 
      new Date(apt.appointment_date) > new Date()
    );
  }, [appointments]);

  // Get past appointments
  const getPastAppointments = useCallback(() => {
    return appointments.filter(apt => 
      apt.status === 'COMPLETED' || 
      (apt.status === 'BOOKED' && new Date(apt.appointment_date) <= new Date())
    );
  }, [appointments]);

  // Initial fetch
  useEffect(() => {
    if (user?.id) {
      fetchAppointments();
    }
  }, [user?.id, fetchAppointments]);

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    rescheduleAppointment,
    getAppointmentById,
    getAvailableTimeSlots,
    checkAvailability,
    sendReminder,
    getAppointmentStats,
    getAppointmentsByStatus,
    getUpcomingAppointments,
    getPastAppointments,
  };
};

export default useAppointments;
