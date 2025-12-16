import React, { useState } from 'react';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contact_method: 'email'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const contactInfo = {
    phone: '+1 (555) 123-4567',
    email: 'support@hospitalbooking.com',
    address: '123 Business Ave, Suite 100, New York, NY 10001',
    hours: {
      weekday: 'Monday - Friday: 9:00 AM - 6:00 PM',
      weekend: 'Saturday - Sunday: 10:00 AM - 4:00 PM'
    }
  };

  const contactMethods = [
    {
      id: 'email',
      name: 'Email',
      description: 'We\'ll respond within 24 hours',
      icon: EnvelopeIcon
    },
    {
      id: 'phone',
      name: 'Phone',
      description: 'Call us for immediate assistance',
      icon: PhoneIcon
    },
    {
      id: 'chat',
      name: 'Live Chat',
      description: 'Chat with our support team',
      icon: ChatBubbleLeftRightIcon
    }
  ];

  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment by searching for hospitals, selecting a service, and following the booking process. You\'ll need to provide your personal information and select a convenient date and time.'
    },
    {
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time through your appointments page.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept credit/debit cards, UPI, net banking, and cash payments at the hospital. All online payments are secure and encrypted.'
    },
    {
      question: 'How do I know if a hospital is available?',
      answer: 'Each hospital\'s availability is shown on their profile page. You can see real-time availability and book accordingly.'
    },
    {
      question: 'Is my medical information secure?',
      answer: 'Yes, we use industry-standard encryption and security measures to protect your personal and medical information.'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, submit to API
      console.log('Contact form submitted:', formData);
      
      setSubmitted(true);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We're here to help you with any questions or concerns about our hospital booking services
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e: any) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e: any) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e: any) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e: any) => handleInputChange('subject', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="payment">Payment Issue</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="space-y-2">
                    {contactMethods.map((method: any) => (
                      <label key={method.id} className="flex items-center">
                        <input
                          type="radio"
                          name="contact_method"
                          value={method.id}
                          checked={formData.contact_method === method.id}
                          onChange={(e: any) => handleInputChange('contact_method', e.target.value)}
                          className="mr-3"
                        />
                        <method.icon className="w-5 h-5 text-gray-600 mr-2" />
                        <div>
                          <span className="font-medium text-gray-900">{method.name}</span>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e: any) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2" />
                    <span className="text-red-700">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <PhoneIcon className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">{contactInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <EnvelopeIcon className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">{contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">{contactInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ClockIcon className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Business Hours</p>
                    <p className="text-gray-600 text-sm">{contactInfo.hours.weekday}</p>
                    <p className="text-gray-600 text-sm">{contactInfo.hours.weekend}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-2">Emergency Support</h3>
              <p className="text-red-800 mb-4">
                For medical emergencies, please call your local emergency services immediately.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="font-bold text-red-600 text-xl">911</p>
                <p className="text-sm text-gray-600">Emergency Services</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  f
                </button>
                <button className="w-10 h-10 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                  t
                </button>
                <button className="w-10 h-10 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                  i
                </button>
                <button className="w-10 h-10 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  in
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our hospital booking services
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-sm">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        expandedFaq === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
