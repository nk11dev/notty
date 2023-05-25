import { IMap } from '@/shared/interfaces';

type Options = {
  msg?: string,
  data?: unknown,
  msgList?: MsgListItem[],
  theme?: string,
  isDisabled?: boolean,
};

type MsgListItem = {
  msg?: string,
  data?: unknown,
};

const THEMES_MAP: IMap = {
  default: 'background: #FFF; color: #333;',
  gray: 'background: #E9E9E9; color: #333;',
  green: 'background: #90EE90; color: #556B2F;',
  olive: 'background: #BADA55; color: #333;',
  lavender: 'background: #E6E6FA; color: #4682b4;',
  salmon: 'background: #FFA07A; color: #B22222;',
  violet: 'background: #D8BFD8; color: #8A2BE2;',
  brown: 'background: #DEB887; color: #A0522D;',
  blue: 'background: #ADD8E6; color: #1E90FF;',
  pink: 'background: #FF1493; color: #FFFAFA;',
  sand: 'background: #FFF8DC; color: #BC8F8F;',
};

export function log(options: Options) {
  const {
    theme = 'default',
    msg = '',
    data = '',
    msgList = [],
    isDisabled = false,
  } = options;

  const baseStyles = 'padding: 0 2px;';
  const styles = baseStyles + THEMES_MAP[theme];

  if (!isDisabled) {
    if (msgList.length > 0) {
      msgList.forEach((item: MsgListItem) => {
        console.log(`%c${item.msg}`, styles, item.data);
      });

    } else {
      console.log(`%c${msg}`, styles, data);
    }
  }
}