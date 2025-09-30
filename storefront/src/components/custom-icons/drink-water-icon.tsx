import React, { type FC } from "react";

interface DrinkWaterIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const DrinkWaterIcon: FC<DrinkWaterIconProps> = ({ className, style }) => {
  return (
    <svg
      className={className}
      style={style}
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <mask
        id="mask0_406_382"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="75"
        height="75"
      >
        <rect width="75" height="75" fill="url(#pattern0)" />
      </mask>
      <g mask="url(#mask0_406_382)">
        <rect y="3" width="75" height="69" fill="#5F3515" />
      </g>
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_406_382" transform="scale(0.0111111)" />
        </pattern>
        <image
          id="image0_406_382"
          width="90"
          height="90"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEa0lEQVR4nO2cW6hVRRiAP8/pogcqokwxIoKiB4mMKDCznnqInuRYr1EPQb4YXcwg0KKrx8ynnuopukHRjZJ6qVAzohuEUZqGHgMN7IKYHUv/mPg3bRd7z561115rZp35P/jhcFgze62P2f+e+Wf2BsMwDMMwDMMwDOM/xoEbgGeAHcAh4LjGIf3fRmC5XmuUZB6wFvgFkMBw4tdoWyOA24ADJQQXYz+w0kz3Zw6wHjhZQXInXB9PAWMm/FSckNdGIFgK8arJPpUna5AsGo/ZqP4/J9clWTSNTOYue55+eEnNcQCYIGMeakCyaLipX5aMl5wnS8U4WHFRswhYQQu5sUHJonH9kPe6EPgOOAZcRcvYFEH0VAXJnT52A+fQIj6LIHp7RcmdeFsXWK2gyfwsXXm6TE7+wdPXPbSEmQii/6o4krvjeIWc3yipil4YILkT08B8EifF1LFoQLroFR+kXk/ZEUH0Ns/9LAB2DtnvOhJmYwTRGyqM5Dc9JdwTwE0kyvIIoq8bciRPBVQZDwMXkyDjuv3UZH4eG2IkP9F1/WnARwPm6aeTIGsaFH1fhZFcbPezp43bSE6OucC+BiRPFzZth5XcXaf5u0+7k6nuWa4c0T6heB58Rcl0sTngvtd62v8OXEqCPF6j6EcLr/VeQJv9ep7Eh6t1vOvp45sUjz6M6UbqqCW/0uMD8CzgxYC2/+iuvK+GfS7wk6eP50mQpo8b3Ar8FtCXqzJe4unnSuBPT/s7SJTJivuI+0rshFwGfBHQ5+EBfd7taXsUWEyizAUe0LlvqGB37f3atgxn6JQs5J30nCfvvuRp9w6JM6alyCldDBzUqt+M/r1dl9XLRlDYuTlwAfVtnxF6vieFuBRldHEB8H6AbLd3uLrwrvDNQNz2l1HAvTMe1ML+IOGv6+LnrQHXuZRm9OFaYE+A7H4rxE68YWe3B3M28HKFGZBo3T3JQlOKuLnwkQqy74r9AG3icuCrIUVvpQXMAZbqdtEWYC/wR9e0aY+es3gYWFLzvZypBaeyq1d3v8kyoVOoH0s+1E59q9Z5muiWIUZ1ssvw6REcLXBz29u1+DNqWi3aLZ9fqCi4V8zoQuRO4LzcRbup1Mc1SJYe894PNb3Mz020G8mfNCBZehwT2KafBW7nZdaLriNdSAXpF85G0ZMJSJYe0req9Itmg+iJEcwupOZwc+ZPgXsLB2RaJXp1AiKlpPTPhzyPEnXFV3YxIi2OaCxN4OElB9HrE3h4yUH0lgQeXnIQvTeBh5ccRFcppEsLIxonEnh4yUG0JBDPNvTrCtmL7rBYZ0G7apIc9QBN7NEsfRZR1wBPBx41CA23hI9GbMkScI9X6xeEdld8nVVEpA2iu1miv8/0fcnX+DL2uY62ie7mCuCRgK8yf61feY5Km0VT+CBdp3nYHSv4VWvZq1I5oTRbRCdPbMlCJsSWLGRCbMlCJsSWLGRCbMlCJsSWLGRCbMlCJsSWLLEFGIZhGIZhGIZhGIZhkAn/AlVv3lAI7k6pAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
};

export default DrinkWaterIcon;
