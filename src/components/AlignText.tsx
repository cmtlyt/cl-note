import { generateClassName } from '@cmtlyt/base';

interface AlignTextProps extends BaseCompProps<HTMLDivElement> {
  text: string;
  align?: 'center' | 'left' | 'right' | 'justify';
  width?: string | number;
}

export function AlignText(props: AlignTextProps) {
  const { text, align, width, ...otherProps } = props;
  const newAlign = align ?? 'justify';
  let textClassName = `text-align-${newAlign}`;
  if (newAlign === 'justify') {
    textClassName += ' text-last-justify';
  }

  const className = generateClassName(textClassName, 'inline-block');
  return (
    <div {...otherProps} className={className} style={{ width }}>
      {text}
    </div>
  );
}
