import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Appointment, BookingFormData, PaymentData } from '../types';

// Appointment State Types
interface AppointmentState {
  appointments: Appointment[];
  currentBooking: BookingFormData | null;
  selectedHospital: any | null;
  selectedService: any | null;
  selectedDate: string;
  selectedTime: string;
  loading: boolean;
  error: string | null;
  paymentData: PaymentData | null;
}

// Appointment Actions
type AppointmentAction =
  | { type: 'SET_APPOINTMENTS'; payload: Appointment[] }
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'UPDATE_APPOINTMENT'; payload: Appointment }
  | { type: 'DELETE_APPOINTMENT'; payload: number }
  | { type: 'SET_CURRENT_BOOKING'; payload: BookingFormData }
  | { type: 'SET_SELECTED_HOSPITAL'; payload: any }
  | { type: 'SET_SELECTED_SERVICE'; payload: any }
  | { type: 'SET_SELECTED_DATE'; payload: string }
  | { type: 'SET_SELECTED_TIME'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PAYMENT_DATA'; payload: PaymentData }
  | { type: 'CLEAR_BOOKING' }
  | { type: 'RESET_STATE' };

// Initial State
const initialState: AppointmentState = {
  appointments: [],
  currentBooking: null,
  selectedHospital: null,
  selectedService: null,
  selectedDate: '',
  selectedTime: '',
  loading: false,
  error: null,
  paymentData: null,
};

// Reducer
const appointmentReducer = (state: AppointmentState, action: AppointmentAction): AppointmentState => {
  switch (action.type) {
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: action.payload };
    
    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [...state.appointments, action.payload] };
    
    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(apt =>
          apt.id === action.payload.id ? action.payload : apt
        )
      };
    
    case 'DELETE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.filter(apt => apt.id !== action.payload)
      };
    
    case 'SET_CURRENT_BOOKING':
      return { ...state, currentBooking: action.payload };
    
    case 'SET_SELECTED_HOSPITAL':
      return { ...state, selectedHospital: action.payload };
    
    case 'SET_SELECTED_SERVICE':
      return { ...state, selectedService: action.payload };
    
    case 'SET_SELECTED_DATE':
      return { ...state, selectedDate: action.payload };
    
    case 'SET_SELECTED_TIME':
      return { ...state, selectedTime: action.payload };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_PAYMENT_DATA':
      return { ...state, paymentData: action.payload };
    
    case 'CLEAR_BOOKING':
      return {
        ...state,
        currentBooking: null,
        selectedHospital: null,
        selectedService: null,
        selectedDate: '',
        selectedTime: '',
        paymentData: null,
      };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
};

// Context
const AppointmentContext = createContext<{
  state: AppointmentState;
  dispatch: React.Dispatch<AppointmentAction>;
  // Helper functions
  setAppointments: (appointments: Appointment[]) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (appointment: Appointment) => void;
  deleteAppointment: (id: number) => void;
  setCurrentBooking: (booking: BookingFormData) => void;
  setSelectedHospital: (hospital: any) => void;
  setSelectedService: (service: any) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPaymentData: (paymentData: PaymentData) => void;
  clearBooking: () => void;
  resetState: () => void;
} | null>(null);

// Provider
export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appointmentReducer, initialState);

  // Helper functions
  const setAppointments = (appointments: Appointment[]) => {
    dispatch({ type: 'SET_APPOINTMENTS', payload: appointments });
  };

  const addAppointment = (appointment: Appointment) => {
    dispatch({ type: 'ADD_APPOINTMENT', payload: appointment });
  };

  const updateAppointment = (appointment: Appointment) => {
    dispatch({ type: 'UPDATE_APPOINTMENT', payload: appointment });
  };

  const deleteAppointment = (id: number) => {
    dispatch({ type: 'DELETE_APPOINTMENT', payload: id });
  };

  const setCurrentBooking = (booking: BookingFormData) => {
    dispatch({ type: 'SET_CURRENT_BOOKING', payload: booking });
  };

  const setSelectedHospital = (hospital: any) => {
    dispatch({ type: 'SET_SELECTED_HOSPITAL', payload: hospital });
  };

  const setSelectedService = (service: any) => {
    dispatch({ type: 'SET_SELECTED_SERVICE', payload: service });
  };

  const setSelectedDate = (date: string) => {
    dispatch({ type: 'SET_SELECTED_DATE', payload: date });
  };

  const setSelectedTime = (time: string) => {
    dispatch({ type: 'SET_SELECTED_TIME', payload: time });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setPaymentData = (paymentData: PaymentData) => {
    dispatch({ type: 'SET_PAYMENT_DATA', payload: paymentData });
  };

  const clearBooking = () => {
    dispatch({ type: 'CLEAR_BOOKING' });
  };

  const resetState = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  return (
    <AppointmentContext.Provider
      value={{
        state,
        dispatch,
        setAppointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        setCurrentBooking,
        setSelectedHospital,
        setSelectedService,
        setSelectedDate,
        setSelectedTime,
        setLoading,
        setError,
        setPaymentData,
        clearBooking,
        resetState,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

// Hook
export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};

export default AppointmentContext;
