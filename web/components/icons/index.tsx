// SVGs are from https://fontawesome.com/search
// To transform svg to JSX use https://react-svgr.com/playground/?typescript=true

import ArrowDownIcon from './arrow-down';
import ArrowUpIcon from './arrow-up';
import BarsIcon from './bars';
import XMarkIcon from './x-mark';
import CheckCircleIcon from './check-circle';
import ErrorIcon from './error';
import InfoIcon from './info';
import WarningIcon from './warning';

// export all icons here in case of need to use them in other places
export {
  ArrowDownIcon,
  ArrowUpIcon,
  BarsIcon,
  XMarkIcon,
  CheckCircleIcon,
  ErrorIcon,
  InfoIcon,
  WarningIcon,
};
export enum IconType {
  Bars = 'bars',
  XMark = 'xmark',
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
  ArrowDown = 'arrow-down',
  ArrowUp = 'arrow-up',
}

interface Props {
  icon: IconType;
  height?: number;
  width?: number;
  fill?: string;
  stroke?: string;
  onClick?: () => void;
}

// Icon component to render icons`
const Icon = ({ icon, ...props }: Props) => {
  switch (icon) {
    case IconType.Bars:
      return <BarsIcon {...props} />;
    case IconType.XMark:
      return <XMarkIcon {...props} />;
    case IconType.Success:
      return <CheckCircleIcon {...props} />;
    case IconType.Error:
      return <ErrorIcon {...props} />;
    case IconType.Info:
      return <InfoIcon {...props} />;
    case IconType.Warning:
      return <WarningIcon {...props} />;
    case IconType.ArrowDown:
      return <ArrowDownIcon {...props} />;
    case IconType.ArrowUp:
      return <ArrowUpIcon {...props} />;
    default:
      return null;
  }
};

export default Icon;
