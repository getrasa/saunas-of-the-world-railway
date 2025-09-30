import React from 'react';

interface ChevronDownIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({width = 24, height = 24, color="#FFFFFF"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={width} height={height} fill={color}>
    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
  </svg>
);

export default ChevronDownIcon;