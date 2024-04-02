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
    squeeze: number;
    stop: number;
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

export interface SortNote {
  data: {
    attributes: {
      sortNoteId: number;
      sortNoteContent: string;
      createdAt: string;
      publishedAt: string;
      updatedAt: string;
    };
    id: number;
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
    sort_note: SortNote;
    video: Video;
    id: number;
    quiz: {
      id: number;
      question: string;
      answer: string;
      quizOptions: string;
      quizId: number;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
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
  sortNoteComplete: boolean;
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
  currentDay: {
    DayId: number;
    createdAt: string;

    updatedAt: string;
    quiz: {
      id: number;
      question: string;
      answer: string;
      quizOptions: string;
      quizId: number;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
    blog: {
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
    kegel: {
      KagelId: number;
      createdAt: string;
      kegel_times: {
        squeeze: number;
        stop: number;
        createdAt: string;
        publishedAt: string;
        updatedAt: string;
      }[];
      publishedAt: string;
      updatedAt: string;
    };
    publishedAt: string;
    reward: string;
    sort_note: {
      sortNoteId: number;
      sortNoteContent: string;
      createdAt: string;
      publishedAt: string;
      updatedAt: string;
    };
    video: {
      vedeoId: number;
      createdAt: string;

      updatedAt: string;
      publishedAt: string;

      VideoUrl: string;
      videoId: number;
    };
    id: number;
  } | null;
  email: string;
  gender: string;
  id: number;
  kagelComplete: boolean;
  language: string;
  phone: string;
  provider: string;
  quizComplete: boolean;
  sortNoteComplete: boolean;
  updateAt: string;
  userName: string;
  videoComplete: boolean;
}

export interface UserAuthData {
  data: {
    jwt: string;
    user: UserData;
  };
}