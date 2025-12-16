import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CreditCardIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { AppointmentFormData, Service, Hospital } from '../types';
import { formatCurrency, formatDate } from '../utils/helpers';

interface PaymentPageState {
  appointmentData: AppointmentFormData;
  service: Service;
  hospital: Hospital;
}

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as PaymentPageState;
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'cash'>('card');
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // If no state data, redirect back
  useEffect(() => {
    if (!state) {
      navigate('/hospitals');
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const { appointmentData, service, hospital } = state;

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Pay with Visa, Mastercard, or other cards',
      icon: CreditCardIcon,
      popular: true
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Pay using UPI apps like Google Pay, PhonePe',
      icon: BanknotesIcon,
      popular: false
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'Pay directly from your bank account',
      icon: BanknotesIcon,
      popular: false
    },
    {
      id: 'cash',
      name: 'Pay at Hospital',
      description: 'Pay cash when you visit the hospital',
      icon: BanknotesIcon,
      popular: false
    }
  ];

  const cardForm = {
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  };

  const [cardData, setCardData] = useState(cardForm);

  const handleCardInputChange = (field: keyof typeof cardData, value: string | boolean) => {
    setCardData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateCardForm = () => {
    if (paymentMethod === 'card') {
      if (!cardData.cardNumber || cardData.cardNumber.length < 16) {
        setError('Please enter a valid card number');
        return false;
      }
      if (!cardData.cardHolder) {
        setError('Please enter card holder name');
        return false;
      }
      if (!cardData.expiryDate) {
        setError('Please enter expiry date');
        return false;
      }
      if (!cardData.cvv || cardData.cvv.length < 3) {
        setError('Please enter a valid CVV');
        return false;
      }
    }
    return true;
  };

  const processPayment = async () => {
    if (!validateCardForm()) return;

    setProcessingPayment(true);
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // In real app, integrate with Razorpay/Stripe
      if (paymentMethod === 'card') {
        // Process card payment
        console.log('Processing card payment:', cardData);
      } else if (paymentMethod === 'upi') {
        // Process UPI payment
        console.log('Processing UPI payment');
      } else if (paymentMethod === 'netbanking') {
        // Process net banking payment
        console.log('Processing net banking payment');
      } else {
        // Cash payment - just confirm appointment
        console.log('Cash payment selected');
      }

      setPaymentSuccess(true);
      
      // Simulate appointment confirmation
      setTimeout(() => {
        navigate('/appointments?success=true');
      }, 2000);

    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setProcessingPayment(false);
      setLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your appointment has been confirmed. You will receive a confirmation email shortly.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Appointment Details</h3>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {formatDate(appointmentData.appointment_date)}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Time:</strong> {appointmentData.appointment_time}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Hospital:</strong> {hospital.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Service:</strong> {service.service_name}
              </p>
            </div>
            <button
              onClick={() => navigate('/appointments')}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View My Appointments
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Booking
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Payment</h1>
          <p className="text-gray-600 mt-2">Secure payment processing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
              
              {/* Payment Methods */}
              <div className="space-y-4 mb-8">
                {paymentMethods.map((method: any) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e: any) => setPaymentMethod(e.target.value)}
                      className="mr-4"
                    />
                    <method.icon className="w-6 h-6 text-gray-600 mr-3" />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-semibold text-gray-900">{method.name}</h3>
                        {method.popular && (
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Card Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardData.cardNumber}
                      onChange={(e: any) => handleCardInputChange('cardNumber', formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      value={cardData.cardHolder}
                      onChange={(e: any) => handleCardInputChange('cardHolder', e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardData.expiryDate}
                        onChange={(e: any) => handleCardInputChange('expiryDate', formatExpiryDate(e.target.value))}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardData.cvv}
                        onChange={(e: any) => handleCardInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="saveCard"
                      checked={cardData.saveCard}
                      onChange={(e: any) => handleCardInputChange('saveCard', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="saveCard" className="text-sm text-gray-600">
                      Save card for future payments
                    </label>
                  </div>
                </div>
              )}

              {/* UPI Payment */}
              {paymentMethod === 'upi' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">UPI Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      You will receive a payment request on your UPI app. Please approve it to complete the payment.
                    </p>
                  </div>
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === 'netbanking' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Select Bank</h3>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                    <option value="axis">Axis Bank</option>
                  </select>
                </div>
              )}

              {/* Cash Payment */}
              {paymentMethod === 'cash' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <ClockIcon className="w-5 h-5 text-yellow-600 mr-2" />
                    <h3 className="font-semibold text-yellow-800">Pay at Hospital</h3>
                  </div>
                  <p className="text-sm text-yellow-800 mb-3">
                    Please pay the consultation fee when you visit the hospital for your appointment.
                  </p>
                  <p className="text-sm text-yellow-700">
                    Make sure to arrive 15 minutes before your appointment time.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              {/* Pay Button */}
              <button
                onClick={processPayment}
                disabled={processingPayment || loading}
                className="w-full mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {processingPayment ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCardIcon className="w-5 h-5 mr-2" />
                    Pay {formatCurrency(service.price)}
                  </>
                )}
              </button>
            </div>

            {/* Security Badge */}
            <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-center text-sm text-gray-600">
                <ShieldCheckIcon className="w-5 h-5 text-green-600 mr-2" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Hospital</h3>
                  <p className="text-gray-600">{hospital.name}</p>
                  <p className="text-sm text-gray-500">{hospital.address}</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Service</h3>
                  <p className="text-gray-600">{service.service_name}</p>
                  <p className="text-sm text-gray-500">{service.description}</p>
                  <p className="text-sm text-gray-500">Duration: {service.duration_minutes || 30} minutes</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Appointment</h3>
                  <p className="text-gray-600">
                    {formatDate(appointmentData.appointment_date)}
                  </p>
                  <p className="text-sm text-gray-500">{appointmentData.appointment_time}</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Patient</h3>
                  <p className="text-gray-600">{appointmentData.patient_name}</p>
                  <p className="text-sm text-gray-500">{appointmentData.patient_email}</p>
                  <p className="text-sm text-gray-500">{appointmentData.patient_phone}</p>
                </div>

                <div className="pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Consultation Fee</span>
                    <span className="text-gray-900">{formatCurrency(service.price)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Platform Fee</span>
                    <span className="text-gray-900">{formatCurrency(10)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-blue-600">
                        {formatCurrency(service.price + 10)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
