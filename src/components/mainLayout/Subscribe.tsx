// components/Subscribe.js

const Subscribe = () => {
  return (
    <div className="max-w-md mx-auto bg-white  border overflow-hidden md:max-w-2xl mt-32 mb-10 rounded-xl shadow-md">
      <div className="md:flex flex-col">
        <div className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 ">
            Subscribe to our newsletter
          </h2>
          <p className="text-gray-600">
            Get updates on our latest projects and news straight to your inbox.
          </p>
        </div>
        <form className="p-8 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              className="mt-1 focus:ring-gray-500  block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-10"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
