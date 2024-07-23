import { generateClassName } from '@cmtlyt/base';

interface AlignTextProps extends BaseCompProps<HTMLDivElement> {
  text: string;
  align?: 'center' | 'left' | 'right' | 'justify';
  width?: string;
}

export function AlignText(props: AlignTextProps) {
  const { text, align, ...otherProps } = props;
  let { width } = props;
  if (!width?.endsWith('px') && /^\d+$/.test(width!)) {
    width = `${width}em`;
  }
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
