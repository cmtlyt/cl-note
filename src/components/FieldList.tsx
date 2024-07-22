import { AlignText } from './AlignText';

interface FieldListRowData {
  label: string;
  space?: string;
  value: string;
}
interface FieldListProps extends BaseCompProps<HTMLDivElement> {
  data: FieldListRowData[];
  width?: string;
}

export function FieldList(props: FieldListProps) {
  const { data, ...otherProps } = props;
  let { width } = props;
  let maxLabelLength = width || 0;
  if (!width?.endsWith('px')) {
    width = `${width}em`;
  }

  if (maxLabelLength === 0) {
    data.forEach((item) => {
      maxLabelLength = Math.max(+maxLabelLength, item.label.length);
    });
    maxLabelLength = `${maxLabelLength}em`;
  }
  console.log('maxLabelLength:', maxLabelLength, width);

  const listDom = data.map((item, index) => {
    return (
      <div className="rounded mt-3" key={index}>
        <AlignText text={item.label} width={maxLabelLength} />
        <span>{item.space ?? ':'}</span>
        <span className="w-auto">{item.value}</span>
      </div>
    );
  });

  return <div {...otherProps}>{listDom}</div>;
}
