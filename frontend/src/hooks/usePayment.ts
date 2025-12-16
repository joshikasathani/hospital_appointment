import { useState, useCallback } from 'react';
import { PaymentData, PaymentResponse } from '../types';
import PaymentService from '../services/paymentService';

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  // Initialize payment
  const initiatePayment = useCallback(async (paymentData: PaymentData): Promise<PaymentResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      setPaymentStatus('processing');
      
      // Validate payment data
      const validationErrors = PaymentService.validatePaymentData(paymentData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }
      
      const response = await PaymentService.initiatePayment(paymentData);
      setPaymentStatus('success');
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to initiate payment');
      setPaymentStatus('failed');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Complete payment
  const completePayment = useCallback(async (paymentId: string, paymentDetails: any): Promise<PaymentResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      setPaymentStatus('processing');
      
      const response = await PaymentService.completePayment(paymentId, paymentDetails);
      setPaymentStatus('success');
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to complete payment');
      setPaymentStatus('failed');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get payment status
  const getPaymentStatus = useCallback(async (paymentId: string): Promise<PaymentResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await PaymentService.getPaymentStatus(paymentId);
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to get payment status');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Process Razorpay payment
  const processRazorpayPayment = useCallback(async (orderId: string, paymentId: string, signature: string): Promise<PaymentResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      setPaymentStatus('processing');
      
      const response = await PaymentService.processRazorpayPayment(orderId, paymentId, signature);
      setPaymentStatus('success');
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to process Razorpay payment');
      setPaymentStatus('failed');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Process Stripe payment
  const processStripePayment = useCallback(async (paymentIntentId: string): Promise<PaymentResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      setPaymentStatus('processing');
      
      const response = await PaymentService.processStripePayment(paymentIntentId);
      setPaymentStatus('success');
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to process Stripe payment');
      setPaymentStatus('failed');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Calculate payment amount
  const calculatePaymentAmount = useCallback((servicePrice: number, partialPayment: boolean = false, partialPercentage: number = 20) => {
    return PaymentService.calculatePaymentAmount(servicePrice, partialPayment, partialPercentage);
  }, []);

  // Apply discount code
  const applyDiscountCode = useCallback(async (code: string, amount: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await PaymentService.applyDiscountCode(code, amount);
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to apply discount code');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Generate receipt
  const generateReceipt = useCallback(async (paymentId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const receipt = await PaymentService.generateReceipt(paymentId);
      return receipt;
    } catch (err: any) {
      setError(err.message || 'Failed to generate receipt');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset payment status
  const resetPaymentStatus = useCallback(() => {
    setPaymentStatus('idle');
    setError(null);
  }, []);

  // Get payment methods
  const getPaymentMethods = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const methods = await PaymentService.getPaymentMethods();
      return methods;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch payment methods');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    paymentStatus,
    initiatePayment,
    completePayment,
    getPaymentStatus,
    processRazorpayPayment,
    processStripePayment,
    calculatePaymentAmount,
    applyDiscountCode,
    generateReceipt,
    resetPaymentStatus,
    getPaymentMethods,
  };
};

export default usePayment;
