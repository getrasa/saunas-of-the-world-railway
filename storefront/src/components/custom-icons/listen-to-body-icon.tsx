import React from "react";

const ListenToBodyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // allows for spreading of any other props passed to the component
    >
      <mask
        id="mask0_406_389"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="75"
        height="75"
      >
        <rect width="75" height="75" fill="url(#pattern1)" />
      </mask>
      <g mask="url(#mask0_406_389)">
        <rect x="1" y="3" width="75" height="69" fill="#5F3515" />
      </g>
      <defs>
        <pattern
          id="pattern1"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_406_389"
            transform="scale(0.0111111)"
          />
        </pattern>
        <image
          id="image0_406_389"
          width="90"
          height="90"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default ListenToBodyIcon;