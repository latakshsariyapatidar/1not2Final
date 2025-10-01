import React from 'react';

const ContactPage = () => {
  return (
    <div className="w-full h-full p-8 pt-20 text-[#EAEAEA] overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center">
          Get In
          <span className="block text-[#EAEAEA]">
            Touch
          </span>
        </h1>
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div className="p-6 bg-[#2B2B2B] rounded-lg border border-[#3C3C3C]">
            <h3 className="text-2xl font-semibold mb-6 text-[#5227FF]">Contact Information</h3>
            <div className="space-y-4">
              <p className="text-[#A0A0A0]">
                <span className="text-[#EAEAEA] font-semibold">Email:</span> info@productionhouse.com
              </p>
              <p className="text-[#A0A0A0]">
                <span className="text-[#EAEAEA] font-semibold">Phone:</span> +1 (555) 123-4567
              </p>
              <p className="text-[#A0A0A0]">
                <span className="text-[#EAEAEA] font-semibold">Address:</span> 123 Creative Street, Film City
              </p>
            </div>
          </div>
          <div className="p-6 bg-[#2B2B2B] rounded-lg border border-[#3C3C3C]">
            <h3 className="text-2xl font-semibold mb-6 text-[#5227FF]">Ready to Create?</h3>
            <p className="text-[#A0A0A0] leading-relaxed mb-6">
              Let's bring your vision to life. Contact us today to discuss your next project
              and discover how we can help tell your story through the power of film.
            </p>
            <button className="bg-[#5227FF] hover:bg-[#FF9FFC] text-[#EAEAEA] px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;