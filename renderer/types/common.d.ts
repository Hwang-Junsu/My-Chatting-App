export interface IHeaderProps {
  text: string;
  canGoBack?: boolean;
  headerText?: boolean;
  onClick?: () => void;
}

export interface ILayoutProps extends IHeaderProps {
  children: React.ReactNode;
  seoTitle: string;
  hasTabBar?: boolean;
}

export interface IButtonProps {
  large?: boolean;
  text: string;
  type?: "submit" | "button" | "reset";
  [key: string]: any;
}
