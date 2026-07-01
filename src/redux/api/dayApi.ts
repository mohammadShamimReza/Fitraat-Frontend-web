import { ProDaysResponse } from "@/types/contantType";
import { baseApi } from "./baseApi";

const proDAYS = "/pro-days";

export const daysApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthDaysByDayId: builder.query<ProDaysResponse, number>({
      query: (id: number) =>
        `${proDAYS}?filters[dayId][$eq]=${id}&populate[0]=pro_blog.image&populate[1]=regulerVideo&populate[2]=meditationVideo&populate[3]=pro_quizz.quizzess.options&populate[4]=pro_kagel.kagelTimes.times`,
      transformResponse: (rawResult: ProDaysResponse) => {
        return rawResult;
      },
    }),
  }),
});

export const { useGetAuthDaysByDayIdQuery } = daysApi;
