import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Background from "../Static/Background";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status message when user starts typing again
    if (submitStatus.message) {
      setSubmitStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // For production (Vercel), use the API route
      // For development, we'll use a mailto fallback or you can use Vercel CLI
      const isProduction = window.location.hostname !== 'localhost';
      
      if (isProduction) {
        const response = await fetch('/api/nodemailer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setSubmitStatus({
            type: 'success',
            message: 'Thank you for reaching out! We will get back to you soon.'
          });
          // Reset form
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
        } else {
          throw new Error(data.error || 'Failed to send message');
        }
      } else {
        // Development fallback - compose mailto link
        const subject = encodeURIComponent(formData.subject || 'Contact Form Submission');
        const body = encodeURIComponent(
          `Name: ${formData.name}\n` +
          `Email: ${formData.email}\n` +
          `Phone: ${formData.phone || 'Not provided'}\n\n` +
          `Message:\n${formData.message}`
        );
        
        // Open default email client
        window.location.href = `mailto:latakshsariya146@gmail.com?subject=${subject}&body=${body}`;
        
        setSubmitStatus({
          type: 'success',
          message: 'Opening your email client... In production, this will send automatically via our server.'
        });
        
        // Reset form after a delay
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again or contact us directly at latakshsariya146@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: "onenot2production@gmail.com",
      link: "mailto:onenot2production@gmail.com",
      color: "#5227FF"
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+91 9716224033",
      subtext: "Krishna Mishra",
      link: "tel:+919716224033",
      color: "#FF9FFC"
    }
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: "📷",
      url: "https://www.instagram.com/1not2production/",
      color: "#E4405F",
    },
    {
      name: "YouTube",
      icon: "▶️",
      url: "https://www.youtube.com/@1not2production",
      color: "#FF0000",
    }
  ];

  return (
    <div
      className="relative min-h-screen text-white overflow-y-auto"
      style={{
        fontFamily: "Compressa",
      }}
    >
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <Background />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Get In
                </span>
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider mb-4 sm:mb-6">
                Touch
              </h1>
              <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
                Have a story to tell? Let's bring your vision to life.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="group flex items-start gap-3 sm:gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                >
                  <div 
                    className="text-2xl sm:text-3xl flex-shrink-0"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(82, 39, 255, 0.3))' }}
                  >
                    {info.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-1">
                      {info.label}
                    </h3>
                    <p className="text-base sm:text-lg font-medium break-words" style={{ color: info.color }}>
                      {info.value}
                    </p>
                    {info.subtext && (
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        {info.subtext}
                      </p>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-200">
                Follow Us
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 sm:px-5 py-3 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <span className="text-xl sm:text-2xl">{social.icon}</span>
                    <span className="font-medium text-sm sm:text-base">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light mb-5 sm:mb-6">
              Send us a <span className="text-purple-400">Message</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name */}
              <motion.div
                animate={{ 
                  scale: focusedField === 'name' ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-300">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300"
                  placeholder="John Doe"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                animate={{ 
                  scale: focusedField === 'email' ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-300">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </motion.div>

              {/* Phone */}
              <motion.div
                animate={{ 
                  scale: focusedField === 'phone' ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="phone" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-300">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300"
                  placeholder="+91 98765 43210"
                />
              </motion.div>

              {/* Subject */}
              <motion.div
                animate={{ 
                  scale: focusedField === 'subject' ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="subject" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-300">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300"
                  placeholder="Film Production Inquiry"
                />
              </motion.div>

              {/* Message */}
              <motion.div
                animate={{ 
                  scale: focusedField === 'message' ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-300">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`w-full py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg text-sm sm:text-base uppercase tracking-wider transition-all duration-300 shadow-lg shadow-purple-500/30 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message →'
                )}
              </motion.button>

              {/* Status Message */}
              {submitStatus.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-sm ${
                    submitStatus.type === 'success'
                      ? 'bg-green-500/20 border border-green-500/50 text-green-200'
                      : 'bg-red-500/20 border border-red-500/50 text-red-200'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @font-face {
          font-family: "Compressa";
          src: url("https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2")
            format("woff2");
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;