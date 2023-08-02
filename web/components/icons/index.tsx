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
interface Props {
  icon: string;
  height?: number;
  width?: number;
  fill?: string;
}

// Icon component to render icons`
const Icon = ({ icon, ...props }: Props) => {
  switch (icon) {
    case 'bars':
      return <BarsIcon {...props} />;
    case 'xmark':
      return <XMarkIcon {...props} />;
    case 'success':
      return <CheckCircleIcon {...props} />;
    case 'error':
      return <ErrorIcon {...props} />;
    case 'info':
      return <InfoIcon {...props} />;
    case 'warning':
      return <WarningIcon {...props} />;
    case 'arrow-down':
      return <ArrowDownIcon {...props} />;
    case 'arrow-up':
      return <ArrowUpIcon {...props} />;
    default:
      return null;
  }
};

export default Icon;
