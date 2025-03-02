export interface LowerThird {
  tweetUrl: string;
  profilePicture: string;
  username: string;
  content: string;
  textColor: string;
  borderColor: string;
  boxColor: string;
  animation: string;
  exitAnimation: string;
  animationDuration: number;
  exitDuration: number;
  fontFamily: string;
  fontSize: number;
  textStyle: {
    bold: boolean;
    italic: boolean;
    alignment: 'left' | 'center' | 'right';
    transform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  };
}