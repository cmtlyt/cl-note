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
  return (
    <div {...otherProps} className={`${textClassName}  inline-block`} style={{ width }}>
      {text}
    </div>
  );
}
