interface SvgIconProps extends React.SVGAttributes<SVGElement> {
  name: string;
  prefix?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
}

export default function SvgIcon(props: SvgIconProps) {
  const { name, prefix = 'icon', color, ...rest } = props;
  const symbolId = `#${prefix}-${name}`;

  return (
    <svg
      className="icon"
      aria-hidden="true"
      focusable="false"
      data-icon={name}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...rest}
    >
      <use href={symbolId} fill={color} />
    </svg>
  );
}
