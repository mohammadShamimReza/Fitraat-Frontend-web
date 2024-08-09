"use client";

import { useUpdateUserDayMutation } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hooks";

function PaymentResult({ params }: { params: { slug: string } }) {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [updateUser, { isError, isLoading, isSuccess }] =
    useUpdateUserDayMutation();
  const userId = userInfo?.id;
  const result =
    params.slug[0] === "redirectSuccess"
      ? "success"
      : params.slug[0] === "fail"
      ? "fail"
      : params.slug[0] === "cancel"
      ? "cancel"
      : "";
  if (result === "success") {
    if (userId === parseInt(params.slug[1])) {
      //update user info paid with true
      try {
      } catch (error) {}
    }
  } else if (result === "fail" || result === "cancel") {
    //delete user tranId
  }
  return <div>page form</div>;
}

export default PaymentResult;
