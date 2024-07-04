export interface Post {
  id: number;
  attributes: {
    description: Array<{
      type: string;
      children: Array<{
        text: string;
        type: string;
      }>;
    }>;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    user: {
      data: {
        id: number;
        attributes: {
          username: string;
          email: string;
          provider: string;
          confirmed: boolean;
          blocked: boolean;
          createdAt: string;
          updatedAt: string;
          age: number;
          phone: string;
          compliteDay: number;
          country: string;
          videoComplete: boolean;
          kagelComplete: boolean;
          quizComplete: boolean;
          gender: string;
          language: string;
          currentDay: number;
        };
      };
    };
  };
}

export interface PostData {
  data: Post[];
  meta: Meta;
}

export interface PostLike {
  id: number;
  attributes: PostLikeAttributes;
}
interface PostLikeAttributes {
  like: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  user: UserData;
  post: Post;
}

export interface PostLikeData {
  data: PostLike[];
  meta: Meta;
}

export interface Blog {
  attributes: {
    BlogId: number;
    topic: string;
    content: string;
    title: string;
    imageURL: string;
    keywords: {
      keyword: string[];
    };
    publishedAt: string;
    updatedAt: string;
    viewCount: string;
  };
  id: number;
}
interface Meta {
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

export interface SingleBlogData {
  data: {
    attributes: {
      title: string;
      content: string;
      imageURL: string;
      viewCount: number;
    };
  };
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
    reward: string;
    video: Video;
    id: number;
    quiz: {
      data: {
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
      };
    };
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

export interface UserData {
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
  userName: string;
  videoComplete: boolean;
}

export interface UserDataWithDay {
  age: number;
  blocked: boolean;
  compliteDay: number;
  confirmed: boolean;
  country: string;
  createdAt: string;
  currentDay: number;
  // {
  //   DayId: number;
  //   createdAt: string;

  //   updatedAt: string;
  //   quiz: {
  //     id: number;
  //     question: string;
  //     answer: string;
  //     quizOptions: string;
  //     quizId: number;
  //     createdAt: string;
  //     updatedAt: string;
  //     publishedAt: string;
  //   };
  //   blog: {
  //     BlogId: number;
  //     topic: string;
  //     content: string;
  //     title: string;
  //     imageURL: string;
  //     keywords: {
  //       keyword: string[];
  //     };
  //     publishedAt: string;
  //     updatedAt: string;
  //     viewCount: string;
  //   };
  //   kegel: {
  //     KagelId: number;
  //     createdAt: string;
  //     kegel_times: {
  //       squeeze: number;
  //       stop: number;
  //       createdAt: string;
  //       publishedAt: string;
  //       updatedAt: string;
  //     }[];
  //     publishedAt: string;
  //     updatedAt: string;
  //   };
  //   publishedAt: string;
  //   reward: string;
  //   sort_note: {
  //     createdAt: string;
  //     publishedAt: string;
  //     updatedAt: string;
  //   };
  //   video: {
  //     vedeoId: number;
  //     createdAt: string;

  //     updatedAt: string;
  //     publishedAt: string;

  //     VideoUrl: string;
  //     videoId: number;
  //   };
  //   id: number;
  // } | null;
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
}

export interface UserAuthData {
  data: {
    jwt: string;
    user: UserData;
  };
}
