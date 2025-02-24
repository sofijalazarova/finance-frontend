const Contact = () => {
  return (
    <div className="max-w-full max-h-screen mt-20 mx-auto text-gray-800 p-10 rounded-xl shadow-lg">
      <header className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl font-semibold uppercase mb-4 text-gray-900">
          Contact Us
        </h2>
        <p className="text-gray-600">
          We do things differently, providing key digital services. Focused on
          helping our clients build a successful business on web and mobile.
        </p>
      </header>

      <div className="flex justify-center gap-20">
        <div className="flex flex-row justify-center">
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
              />
              <input
                type="tel"
                placeholder="Your phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
            />
            <textarea
              rows="5"
              placeholder="Message"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="text-left space-y-6">
          <div>
            <span className="text-blue-600 text-2xl">📍</span>
            <p className="text-gray-700">Orange, California, US</p>
          </div>
          <div>
            <span className="text-blue-600 text-2xl">📞</span>
            <p className="text-gray-700">+1 555 2566 112</p>
          </div>
          <div>
            <span className="text-blue-600 text-2xl">✉️</span>
            <p className="text-gray-700">
              <a href="mailto:info@htmlstream.com" className="hover:underline">
                info@htmlstream.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
