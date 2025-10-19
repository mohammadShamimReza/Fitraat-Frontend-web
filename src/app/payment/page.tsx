// "use client";

// import { usePaymentInitMutation } from "@/redux/api/payment";
// import { useAppSelector } from "@/redux/hooks";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button, Card, Input, message, Select } from "antd";
// import { useEffect, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";

// const { Option } = Select;

// // Zod schema
// const schema = z.object({
//   cus_name: z.string().min(1, "Please enter your name"),
//   cus_email: z
//     .string()
//     .email("Please enter a valid email")
//     .min(1, "Please enter your email"),
//   total_amount: z.number().positive(),
//   product_name: z.string(),
//   product_category: z.string(),
//   product_profile: z.string(),
//   cus_add1: z.string(),
//   cus_country: z.string(),
//   cus_phone: z.string(),
//   currency: z.enum(["USD", "BDT"], {
//     required_error: "Please select a currency",
//   }),
//   userId: z.string().min(1, "User ID is required"),
// });

// type PaymentFormValues = z.infer<typeof schema>;

// const PaymentPage = () => {
//   const [paymentInit] = usePaymentInitMutation();
//   const [loading, setLoading] = useState(false);

//   const userInfo = useAppSelector((state) => state.auth.userInfo);

//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm<PaymentFormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       cus_name: userInfo?.username || "",
//       cus_email: userInfo?.email || "",
//       currency: "BDT",
//       total_amount: 2000,
//       userId: userInfo?.id?.toString() || "",
//       product_name: "Detox-dopamine",
//       product_category: "Mental & physical",
//       product_profile: "Fitraat",
//       cus_add1: "Dhaka",
//       cus_country: "Bangladesh",
//       cus_phone: userInfo?.phone || "",
//     },
//   });

//   const selectedCurrency = watch("currency");

//   useEffect(() => {
//     if (selectedCurrency === "USD") {
//       setValue("total_amount", 20);
//     } else if (selectedCurrency === "BDT") {
//       setValue("total_amount", 2000);
//     }
//   }, [selectedCurrency, setValue]);

//   const onSubmit = async (data: PaymentFormValues) => {
//     console.log(data, "this");
//     setLoading(true);
//     try {
//       const result = await paymentInit(data).unwrap();
//       if (result?.url) {
//         window.location.replace(result.url);
//       } else {
//         message.error("Please try again later");
//       }
//     } catch {
//       message.error("Server has some issues, please try again later");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <Card className="w-full max-w-md p-8 bg-gray-900 shadow-lg">
//         <h2 className="text-2xl font-bold text-center mb-4">Payment Details</h2>

//         {/* Use standard HTML form instead of AntD Form */}
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Name */}
//           <div className="mb-4">
//             <label className="block mb-1">Name</label>
//             <Controller
//               name="cus_name"
//               control={control}
//               render={({ field }) => (
//                 <Input
//                   {...field}
//                   placeholder="Enter your name"
//                   className="border-gray-700"
//                 />
//               )}
//             />
//             {errors.cus_name && (
//               <p className="text-red-500 text-sm">{errors.cus_name.message}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div className="mb-4">
//             <label className="block mb-1">Email</label>
//             <Controller
//               name="cus_email"
//               control={control}
//               render={({ field }) => (
//                 <Input
//                   {...field}
//                   type="email"
//                   placeholder="Enter your email"
//                   className="border-gray-700"
//                 />
//               )}
//             />
//             {errors.cus_email && (
//               <p className="text-red-500 text-sm">{errors.cus_email.message}</p>
//             )}
//           </div>

//           {/* Total Amount */}
//           <div className="mb-4">
//             <label className="block mb-1">Total Amount</label>
//             <Controller
//               name="total_amount"
//               control={control}
//               render={({ field }) => (
//                 <Input
//                   {...field}
//                   type="number"
//                   disabled
//                   value={selectedCurrency === "USD" ? 20 : 2000}
//                   className="border-gray-700"
//                 />
//               )}
//             />
//           </div>

//           {/* Currency */}
//           <div className="mb-4">
//             <label className="block mb-1">Currency</label>
//             <Controller
//               name="currency"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   {...field}
//                   className="border-gray-700 w-full"
//                   onChange={(value) => field.onChange(value)}
//                   value={field.value}
//                 >
//                   <Option value="USD">USD</Option>
//                   <Option value="BDT">BDT</Option>
//                 </Select>
//               )}
//             />
//             {errors.currency && (
//               <p className="text-red-500 text-sm">{errors.currency.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <Button
//             type="primary"
//             htmlType="submit"
//             loading={loading}
//             className="w-full bg-blue-500 hover:bg-blue-600"
//           >
//             {loading ? "Loading..." : "Pay Now With SSLCommerz"}
//           </Button>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default PaymentPage;


"use client";

import { usePaymentInitMutation } from "@/redux/api/payment";
import { useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Input, message, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const { Option } = Select;

// ✅ Validation schema
const schema = z.object({
  cus_name: z.string().min(1, "Please enter your name"),
  cus_email: z.string().email("Invalid email"),
  cus_phone: z.string().min(1, "Phone is required"),
  total_amount: z.number().positive(),
  currency: z.enum(["USD", "BDT"]),
  product_name: z.string(),
  product_category: z.string(),
  product_profile: z.string(),
  cus_add1: z.string(),
  cus_country: z.string(),
  userId: z.string(),
});

type PaymentFormValues = z.infer<typeof schema>;

const PaymentPage: React.FC = () => {
  const [paymentInit] = usePaymentInitMutation();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [loading, setLoading] = useState(false);

  // ✅ React Hook Form setup
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      cus_name: userInfo?.username || "",
      cus_email: userInfo?.email || "",
      cus_phone: userInfo?.phone || "",
      total_amount: 2000,
      currency: "BDT",
      product_name: "Detox-dopamine",
      product_category: "Mental & Physical",
      product_profile: "Fitraat",
      cus_add1: "Dhaka",
      cus_country: "Bangladesh",
      userId: userInfo?.id?.toString() || "",
    },
  });

  const currency = watch("currency");

  // 💰 Update total based on currency
  useEffect(() => {
    setValue("total_amount", currency === "USD" ? 20 : 2000);
  }, [currency, setValue]);

  // 🧾 Submit Handler
  const onSubmit = async (data: PaymentFormValues) => {
    try {
      setLoading(true);
      const result = await paymentInit(data).unwrap();

      if (result?.url) {
        window.location.replace(result.url);
      } else {
        message.error("Payment initialization failed");
      }
    } catch (err) {
      console.error(err);
      message.error("Server error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f6fa",
        padding: 20,
      }}
    >
      <Card
        title="💳 Payment Details"
        bordered={false}
        style={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <label style={{ fontWeight: 500 }}>Name</label>
          <Controller
            name="cus_name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter your name" />
            )}
          />
          {errors.cus_name && (
            <p style={{ color: "red" }}>{errors.cus_name.message}</p>
          )}

          {/* Email */}
          <label style={{ fontWeight: 500, marginTop: 12 }}>Email</label>
          <Controller
            name="cus_email"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter your email" type="email" />
            )}
          />
          {errors.cus_email && (
            <p style={{ color: "red" }}>{errors.cus_email.message}</p>
          )}

          {/* Phone */}
          <label style={{ fontWeight: 500, marginTop: 12 }}>Phone</label>
          <Controller
            name="cus_phone"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="01XXXXXXXXX" />
            )}
          />
          {errors.cus_phone && (
            <p style={{ color: "red" }}>{errors.cus_phone.message}</p>
          )}

          {/* Currency */}
          <label style={{ fontWeight: 500, marginTop: 12 }}>Currency</label>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <Select {...field} style={{ width: "100%" }}>
                <Option value="BDT">BDT</Option>
                <Option value="USD">USD</Option>
              </Select>
            )}
          />
          {errors.currency && (
            <p style={{ color: "red" }}>{errors.currency.message}</p>
          )}

          {/* Total Amount */}
          <label style={{ fontWeight: 500, marginTop: 12 }}>Total Amount</label>
          <Controller
            name="total_amount"
            control={control}
            render={({ field }) => (
              <Input {...field} type="number" disabled value={field.value} />
            )}
          />

          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={loading}
            style={{ marginTop: 20, height: 45 }}
          >
            {loading ? <Spin /> : "Pay Now with SSLCommerz"}
          </Button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: 16,
            color: "#777",
            fontSize: 13,
          }}
        >
          🔒 Secure payment powered by SSLCommerz
        </p>
      </Card>
    </div>
  );
};

export default PaymentPage;
