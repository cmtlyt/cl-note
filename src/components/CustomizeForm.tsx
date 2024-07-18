interface CustomizeFormRowData {
  label: string;
  space?: string;
  value: string;
}
interface CustomizeFormProps extends BaseCompProps<HTMLDivElement> {
  data: CustomizeFormRowData[];
}

export function CustomizeForm(props: CustomizeFormProps) {
  const { data, ...otherProps } = props;

  let maxLabelLength = 0;

  data.forEach((item) => {
    maxLabelLength = Math.max(maxLabelLength, item.label.length);
  });
  const listDom = data.map((item, index) => {
    return (
      <div className="rounded mt-3" key={index}>
        <div className="text-justify text-last-justify inline-block" style={{ width: `${maxLabelLength}em` }}>
          {item.label}
        </div>
        <span>{item.space || ':'}</span>
        <span className="w-auto">{item.value}</span>
      </div>
    );
  });

  return <div {...otherProps}>{listDom}</div>;
}
