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
