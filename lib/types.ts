export type Attachment = {
  key: string;
  title: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
  darkImage?: {
    url: string;
    height: number;
    width: number;
  };
  altText: string;
};

export type Pages = {
  slug: String;
  title: String;
  nav: "left" | "right" | "more" | "none";
}[]