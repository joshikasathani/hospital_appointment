import api, { handleResponse, handleError } from './api';
import { Appointment, BookingFormData } from '../types';

export class AppointmentService {
  // Create a new appointment
  static async createAppointment(bookingData: BookingFormData): Promise<Appointment> {
    try {
      const response = await api.post('/appointments/', bookingData);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get appointment by ID
  static async getAppointmentById(id: number): Promise<Appointment> {
    try {
      const response = await api.get(`/appointments/${id}`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Update appointment
  static async updateAppointment(id: number, appointmentData: Partial<Appointment>): Promise<Appointment> {
    try {
      const response = await api.put(`/appointments/${id}`, appointmentData);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Cancel appointment
  static async cancelAppointment(id: number): Promise<Appointment> {
    try {
      const response = await api.patch(`/appointments/${id}/cancel`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Reschedule appointment
  static async rescheduleAppointment(id: number, newDate: string, newTime: string): Promise<Appointment> {
    try {
      const response = await api.patch(`/appointments/${id}/reschedule`, {
        appointment_date: newDate,
        appointment_time: newTime
      });
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get patient's appointments
  static async getPatientAppointments(patientId: number, status?: string): Promise<Appointment[]> {
    try {
      const params = status ? `?status=${status}` : '';
      const response = await api.get(`/appointments/my-appointments${params}`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get hospital's appointments
  static async getHospitalAppointments(hospitalId: number, date?: string): Promise<Appointment[]> {
    try {
      const params = date ? `?date=${date}` : '';
      const response = await api.get(`/appointments/hospital/${hospitalId}${params}`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get available time slots for a specific date and hospital
  static async getAvailableTimeSlots(hospitalId: number, date: string): Promise<string[]> {
    try {
      const response = await api.get(`/appointments/available-slots/${hospitalId}?date=${date}`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Check appointment availability
  static async checkAvailability(hospitalId: number, date: string, time: string): Promise<boolean> {
    try {
      const response = await api.post(`/appointments/check-availability`, {
        hospital_id: hospitalId,
        date,
        time
      });
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get appointment statistics for patient
  static async getPatientAppointmentStats(patientId: number): Promise<any> {
    try {
      const response = await api.get(`/appointments/stats/patient/${patientId}`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get appointment statistics for hospital
  static async getHospitalAppointmentStats(hospitalId: number): Promise<any> {
    try {
      const response = await api.get(`/appointments/stats/hospital/${hospitalId}`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Send appointment reminder
  static async sendReminder(appointmentId: number): Promise<void> {
    try {
      await api.post(`/appointments/${appointmentId}/reminder`);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get appointment history
  static async getAppointmentHistory(patientId: number, limit: number = 10): Promise<Appointment[]> {
    try {
      const response = await api.get(`/appointments/history/patient/${patientId}?limit=${limit}`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }
}

export default AppointmentService;
