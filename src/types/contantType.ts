

type BlogImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

type BlogImage = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    large: BlogImageFormat;
    medium: BlogImageFormat;
    small: BlogImageFormat;
    thumbnail: BlogImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export interface Blog {
  id: number;
  documentId: string;
  topic: string;
  title: string;
  content: string;
  tag: string;
  dayId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: BlogImage;
}

export interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface BlogData {
  data: Blog[];
  meta: Meta;
}



export interface Emergencys {
  data: {
    attributes: {
      vedio_url: string;
      message: string;
    };
  }[];
  meta: Meta;
}

export interface KegelTimes {
  attributes: {
    times: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  };
  id: number;
}

export interface Kegel {
  data: {
    attributes: {
      KagelId: number;
      createdAt: string;
      kegel_times: {
        data: KegelTimes[];
      };
      publishedAt: string;
      updatedAt: string;
    };
  };
}

export interface Video {
  data: {
    attributes: {
      vedeoId: number;
      createdAt: string;

      updatedAt: string;
      publishedAt: string;

      VideoUrl: string;
      videoId: number;
    };
    id: number;
  };
}

export interface Day {
  attributes: {
    DayId: number;
    createdAt: string;

    updatedAt: string;
    blog: {
      data: Blog;
    };
    kegel: Kegel;
    publishedAt: string;
    video: Video;
    id: number;
    quizzes: {
      data: Quizzes[];
    };
  };
  id: number;
}

export interface Quizzes {
  attributes: {
    question: string;
    answer: string;
    quizOptions: string;
    quizId: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  id: number;
}

export interface DayData {
  data: Day[];
  meta: Meta;
}

export interface Error {
  error: {
    data: {
      data: null;
      error: {
        status: number;
        name: string;
        message: string;
        details: {}[];
      };
    };
    status: number;
  };
}
export type FitraatPaymentStatus = "Complete" | "Not complete";
export type Gender = "Male" | "Female" | null;
export interface UserData {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  age: number | null;
  phone: string | null;
  currentDay: number;
  gender: Gender;
  startDate: string | null;
  fitraatPayment: FitraatPaymentStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tran_id: string | null;
}

export interface UserDataWithDay {
  age: number;
  blocked: boolean;
  compliteDay: number;
  confirmed: boolean;
  country: string;
  createdAt: string;
  currentDay: number;
  
  email: string;
  gender: string;
  id: number;
  kagelComplete: boolean;
  language: string;
  phone: string;
  provider: string;
  quizComplete: boolean;
  updateAt: string;
  username: string;
  videoComplete: boolean;
  paid: boolean;
  startDate: string;
}

export interface UserAuthData {
  data: {
    jwt: string;
    user: UserData;
  };
}



export interface PaymentFormValues {
  cus_name: string;
  cus_email: string;
  tran_id: string;
  currency: "USD" | "BDT";
  total_amount: number;
  userId: string;
  product_name: string;
  product_category: string;
  product_profile: string;
  cus_add1: string;
  cus_country: string;
  cus_phone: string;
}
