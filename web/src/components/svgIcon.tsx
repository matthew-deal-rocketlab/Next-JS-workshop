interface SvgIconProps {
  pathData: string
  color?: string
  viewBox?: string
  className?: string
  alt?: string
}

const SvgIcon: React.FC<SvgIconProps> = ({
  pathData,
  color = 'currentColor', // Default color is currentColor for CSS inheritance
  viewBox = '0 0 512 512',
  className = '',
  alt = '',
}) => {
  return (
    <svg
      fill={color}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={alt}>
      <path d={pathData} />
    </svg>
  )
}

export default SvgIcon
