interface OfficialSealProps extends BaseCompProps<HTMLDivElement> {
  topText?: string;
  middleText?: string;
  bottomText?: string;
  color?: string;
}

export function OfficialSeal(props: OfficialSealProps) {
  const { topText, middleText, bottomText, color = '#f00', ...otherProps } = props;

  if (!topText && !middleText && !bottomText) return null;

  return (
    <div {...otherProps}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" style={{ fontSize: '128px' }}>
        <title>公章</title>

        <g>
          <desc>圆形边框和中间红星</desc>
          <circle strokeWidth="20" cy="512" cx="512" r="502" fill="none" stroke={color} />
          <path
            stroke="none"
            fill={color}
            transform="translate(-256, -256) scale(1.5)"
            d="M398.84211,486.62291l86.44555,0l26.71234,-82.12292l26.71235,82.12292l86.44553,0l-69.93579,50.75417l26.71372,82.12292l-69.93582,-50.75556l-69.9358,50.75556l26.71373,-82.12292l-69.93581,-50.75417z"
          />
        </g>

        <defs>
          <desc>文本的路径</desc>
          <path id="path-top" strokeWidth="10" stroke={color} fill="none" d="M212,690 a350,350 0 1,1 600,0" />
          <path id="path-bottom" strokeWidth="10" stroke={color} fill="none" d="M112,700 a450,450 0 0,0 800,0" />
          <path id="path-middle" strokeWidth="10" stroke={color} d="M300,770 L724,770" />
        </defs>

        <g fill={color}>
          <desc>文本区域</desc>

          <text fontSize="1em">
            <desc>{topText}</desc>
            <textPath href="#path-top" startOffset="50%" textAnchor="middle">
              {topText}
            </textPath>
          </text>

          <text fontSize="0.75em" style={{ letterSpacing: '16px' }}>
            <desc>{bottomText}</desc>
            <textPath href="#path-bottom" startOffset="50%" textAnchor="middle">
              {bottomText}
            </textPath>
          </text>

          <text fontSize="0.5em">
            <desc>{middleText}</desc>
            <textPath href="#path-middle" startOffset="50%" textAnchor="middle">
              {middleText}
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
}
