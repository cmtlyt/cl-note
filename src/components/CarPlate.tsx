interface CarPlateProps extends BaseCompProps<HTMLDivElement> {
  label: string;
  space: string;
  value: string;
}

export function CarPlate(props: CarPlateProps) {
  const { label, space, value, ...otherProps } = props;

  const labelSpan = Array.from(label || '').map((char, index) => {
    return <span key={index}>{char}</span>;
  });

  const spanWidth = labelSpan.length;

  return (
    <div {...otherProps}>
      <div className=" rounded mt-3">
        <div className="text-justify text-last-justify inline-block label" style={{ width: `${spanWidth}em` }}>
          {labelSpan}
        </div>
        <span>{space}</span>
        <span className="w-auto">{value}</span>
      </div>
      <div className=" rounded mt-3">
        <span className="w-auto">车主姓名</span>
        <span>：</span>
        <span className="w-auto">陈哲哲</span>
      </div>
    </div>
  );
}
