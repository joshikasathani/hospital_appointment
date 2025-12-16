import api, { handleResponse, handleError } from './api';
import { PaymentData, PaymentResponse } from '../types';

export class PaymentService {
  // Initialize payment
  static async initiatePayment(paymentData: PaymentData): Promise<PaymentResponse> {
    try {
      const response = await api.post('/api/payments/initiate', paymentData);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Complete payment
  static async completePayment(paymentId: string, paymentDetails: any): Promise<PaymentResponse> {
    try {
      const response = await api.post(`/api/payments/complete/${paymentId}`, paymentDetails);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get payment status
  static async getPaymentStatus(paymentId: string): Promise<PaymentResponse> {
    try {
      const response = await api.get(`/api/payments/${paymentId}/status`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Refund payment
  static async refundPayment(paymentId: string, reason?: string): Promise<PaymentResponse> {
    try {
      const response = await api.post(`/api/payments/${paymentId}/refund`, { reason });
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get payment history for user
  static async getPaymentHistory(userId: number): Promise<PaymentResponse[]> {
    try {
      const response = await api.get(`/api/users/${userId}/payments`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Calculate payment amount
  static calculatePaymentAmount(servicePrice: number, partialPayment: boolean = false, partialPercentage: number = 20): {
    totalAmount: number;
    partialAmount: number;
    remainingAmount: number;
  } {
    const totalAmount = servicePrice;
    const partialAmount = partialPayment ? (totalAmount * partialPercentage) / 100 : 0;
    const remainingAmount = totalAmount - partialAmount;

    return {
      totalAmount,
      partialAmount,
      remainingAmount
    };
  }

  // Validate payment data
  static validatePaymentData(paymentData: PaymentData): string[] {
    const errors: string[] = [];

    if (!paymentData.appointment_id) {
      errors.push('Appointment ID is required');
    }

    if (!paymentData.amount || paymentData.amount <= 0) {
      errors.push('Payment amount must be greater than 0');
    }

    if (!['razorpay', 'stripe'].includes(paymentData.payment_method)) {
      errors.push('Invalid payment method');
    }

    return errors;
  }

  // Generate payment receipt
  static async generateReceipt(paymentId: string): Promise<any> {
    try {
      const response = await api.get(`/api/payments/${paymentId}/receipt`);
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Process Razorpay payment
  static async processRazorpayPayment(orderId: string, paymentId: string, signature: string): Promise<PaymentResponse> {
    try {
      const response = await api.post('/api/payments/razorpay/verify', {
        order_id: orderId,
        payment_id: paymentId,
        signature: signature
      });
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Process Stripe payment
  static async processStripePayment(paymentIntentId: string): Promise<PaymentResponse> {
    try {
      const response = await api.post('/api/payments/stripe/confirm', {
        payment_intent_id: paymentIntentId
      });
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Get payment methods
  static async getPaymentMethods(): Promise<any[]> {
    try {
      const response = await api.get('/api/payments/methods');
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  // Apply discount code
  static async applyDiscountCode(code: string, amount: number): Promise<any> {
    try {
      const response = await api.post('/api/payments/discount', {
        code,
        amount
      });
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }
}

export default PaymentService;
