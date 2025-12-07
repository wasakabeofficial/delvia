type BaseTextBlock = {
  title: string;
  description: string;
};

type BaseBadgeItem = BaseTextBlock & {
  id: string;
  badge: string;
};
type BaseImageCard = BaseTextBlock & {
  imageUrl: string;
};

export type BlogPost = BaseImageCard & {
  url?: string;
  tag?: string;
};

export type ClientProfile = BaseBadgeItem;
export type Step = BaseBadgeItem;

export type ServiceCarouselItem = {
  image: string;
  title: string;
  desc: string;
  url: string;
};
