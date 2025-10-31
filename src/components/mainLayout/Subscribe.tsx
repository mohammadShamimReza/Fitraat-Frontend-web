"use client";
import { useCreateSubscribersMutation } from "@/redux/api/subscribeApi";
import { Error } from "@/types/contantType";
import { message } from "antd";
import { FormEvent, useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const [createSubscribers, { isLoading }] = useCreateSubscribersMutation();

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userEmail = (event.target as HTMLFormElement).email.value;
    setEmail(userEmail);

    if (userEmail !== "") {
      try {
        const result: any | Error = await createSubscribers({
          email: userEmail,
        });
        console.log(result, "resutl");
        if (result?.error) {
          result?.error.data.error.message === "This attribute must be unique"
            ? message.error("Email is already subscribed")
            : "";
        } else {
          setEmail("");

          message.success("Thanks for subscribing us");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error("Something went wrong");
    }
  };

  return (
    <div className=" mx-auto bg-white my-28 overflow-hidden  w-full  ">
      <div className="md:flex flex-col">
        <div className=" text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 ">
            Subscribe to our newsletter
          </h2>
          <p className="text-gray-600">
            Get updates on our latest projects and news straight to your inbox.
          </p>
        </div>
        <form onSubmit={handleSubscribe} className="mx-auto  space-y-4 w-2/3">
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
              value={email}
              placeholder="Enter you email address"
              onChange={(e) => setEmail(e.target.value)} // Update the email state on change
              className="mt-1 focus:ring-gray-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-10 p-5"
            />
          </div>
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
