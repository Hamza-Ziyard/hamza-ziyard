import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactModal({ isOpen, onClose, initialMessage = '' }) {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: initialMessage,
  });

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form status when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrorMessage('');
      setFormData((prev) => ({
        ...prev,
        message: initialMessage,
      }));
    }
  }, [isOpen, initialMessage]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/meajoged', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json().catch(() => ({}));
        if (data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors.map((err) => err.message).join(', '));
        } else {
          setErrorMessage('Something went wrong. Please try again later.');
        }
        setStatus('error');
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-left"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {status === 'success' ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-gray-600 dark:text-zinc-400 text-sm mb-6">
                  Thanks for reaching out! I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Let's chat</h2>
                <p className="text-sm text-gray-600 dark:text-zinc-400 mb-6">
                  Fill out the form below and I'll get back to you soon.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-700/80 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@mail.com"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-700/80 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                      Your message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={8}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can I help you?"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-700/80 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-xs rounded-xl">
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-center">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-50 bg-[#1a1a1a] dark:bg-white dark:text-black text-white hover:opacity-90 transition-all font-semibold text-sm sm:text-base px-7 py-3 rounded-full shadow-md hover:scale-[1.02] duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
