

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
  // provider_metadata: any;
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

export interface BlogData {
  data: Blog[];
  meta: Meta;
}

// Blog section complete

// start Day section

export type Video = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  // formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  // provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type QuizOption = {
  id: number;
  opiotn1: string;
  optoin2: string;
  option3: string;
  optoin4: string;
};

export type Quiz = {
  id: number;
  question: string;
  answer: string;
  serial: number;
  options: QuizOption;
};

export type FreeQuizz = {
  id: number;
  documentId: string;
  dayId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  quizzess: Quiz[];
};

export type KagelTimeEntry = {
  id: number;
  squizz: number;
  stop: number;
};

export type KagelTime = {
  id: number;
  gap: number;
  serial: number;
  times: KagelTimeEntry[];
};

export type FreeKagel = {
  id: number;
  documentId: string;
  dayId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  kagelTimes: KagelTime[];
};

export interface KegelDayIndividualSession {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  dayCount: number;
  morningkagel: KagelTime[];
  afternoonKagel: KagelTime[];
  nightKagel: KagelTime[];
}
export interface KegelIndividualResponse {
  data: KegelDayIndividualSession[];
  meta: Meta;
}
export type Day = {
  id: number;
  documentId: string;
  dayId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  free_blog: Blog;
  regulerVideo: Video;
  meditationVideo: Video;
  free_quizz: FreeQuizz;
  free_kagel: FreeKagel;
};

export type FreeDaysResponse = {
  data: Day[];
  meta: Meta;
};

export interface DayData {
  data: Day[];
  meta: Meta;
}

export type PaymentStatus = "Complete" | "Not complete";
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
  fitraatPayment: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tran_id: string | null;
  childProtectionPayment: PaymentStatus;
  profileImage: StrapiImage | null;
  kagelPayment: PaymentStatus;
  kagelIndividualDayNumber: number;
  childProtectionDayNumber: number;
  compliteDay: number;
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

export interface Error {
  error: {
    data: {
      data: null;
      error: {
        status: number;
        name: string;
        message: string;
        // details: {}[];
      };
    };
    status: number;
  };
}

//  pro contant type

export interface ProBlog {
  id: number;
  documentId: string;
  topic: string;
  titile: string; // note: typo in API, keep 'titile'
  content: string;
  tag: string;
  dayId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: BlogImage;
}

// Quizz (Pro)
export type ProQuizOption = {
  id: number;
  opiotn1: string;
  optoin2: string;
  option3: string;
  optoin4: string;
};

export type ProQuiz = {
  id: number;
  question: string;
  answer: string;
  serial: number;
  options: ProQuizOption;
};

export type ProQuizz = {
  id: number;
  documentId: string;
  dayId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  quizzess: ProQuiz[];
};

export type ProKagelTimeEntry = {
  id: number;
  squizz: number;
  stop: number;
};

export type ProKagelTime = {
  id: number;
  gap: number;
  serial: number;
  times: ProKagelTimeEntry[];
};

export type ProKagel = {
  id: number;
  documentId: string;
  dayId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  kagelTimes: ProKagelTime[];
};

// Day (Pro)

export type ProDay = {
  id: number;
  documentId: string;
  dayId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  pro_blog: ProBlog;
  regulerVideo: Video;
  meditationVideo: Video;
  pro_quizz: ProQuizz;
  pro_kagel: ProKagel;
};

export type ProDaysResponse = {
  data: ProDay[];
  meta: Meta;
};

// Text node inside each paragraph
export interface TextNode {
  type: "text";
  text: string;
  bold?: boolean;
}

// Paragraph structure
export interface Paragraph {
  type: "paragraph";
  children: TextNode[];
}

// Video file object
export interface EVideo {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  // formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  // provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Single Emergency Protocol entry
export interface EmergencyProtocol {
  id: number;
  documentId: string;
  qute: Paragraph[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  video: EVideo;
}

// Pagination metadata
export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// Meta wrapper
export interface Meta {
  pagination: Pagination;
}

// The entire API response
export interface EmergencyProtocolResponse {
  data: EmergencyProtocol[];
  meta: Meta;
}

export interface StrapiImageFormat {
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
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  // provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}




export interface ProtectionData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  numberCount: number;
  protectionVideo: Video[];
  title: string;
}

export interface ProtectionResponse {
  data: ProtectionData[];
  meta: Meta;
}

export interface ChildProtectionListResponse {
  data: ChildProtectionItem[];
  meta: Meta;
}

export interface ChildProtectionItem {
  id: number;
  documentId: string;
  numberCount: number;
  title: string;
}
