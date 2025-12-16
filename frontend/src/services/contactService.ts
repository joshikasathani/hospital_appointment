import api, { handleResponse, handleError } from './api';
import { ContactData } from '../types';

export class ContactService {
  // Submit contact form
  static async submitContact(contactData: ContactData): Promise<any> {
    try {
      const response = await api.post('/api/contact', contactData);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get contact information
  static async getContactInfo(): Promise<any> {
    try {
      const response = await api.get('/api/contact/info');
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Subscribe to newsletter
  static async subscribeNewsletter(email: string): Promise<any> {
    try {
      const response = await api.post('/api/newsletter/subscribe', { email });
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Validate contact form data
  static validateContactData(contactData: ContactData): string[] {
    const errors: string[] = [];

    if (!contactData.name || contactData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!contactData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
      errors.push('Please enter a valid email address');
    }

    if (contactData.phone && !/^[+]?[\d\s-()]+$/.test(contactData.phone)) {
      errors.push('Please enter a valid phone number');
    }

    if (!contactData.message || contactData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    return errors;
  }
}

export default ContactService;
