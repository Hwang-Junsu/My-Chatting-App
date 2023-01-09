export interface IHeaderProps {
  text: string;
  canGoBack?: boolean;
  headerText?: boolean;
  onClick?: () => void;
}

export interface ILayoutProps extends IHeaderProps {
  children: React.ReactNode;
  hasTabBar?: boolean;
}

export interface IButtonProps {
  large?: boolean;
  text: string;
  type?: "submit" | "button" | "reset";
  [key: string]: any;
}
