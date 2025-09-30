import React from 'react';

interface TickIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const TickIcon: React.FC<TickIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = 'currentColor' 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height.toString()}
      viewBox="0 -960 960 960"
      width={width.toString()}
    >
      <path
        d="M382-253.847 168.616-467.231l42.769-42.768L382-339.384l366.615-366.615 42.769 42.768L382-253.847Z"
        fill={color}
      />
    </svg>
  );
};

export default TickIcon;
