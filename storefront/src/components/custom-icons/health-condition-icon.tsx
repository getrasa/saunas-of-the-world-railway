import React from 'react';

interface HealthConditionIconProps {
  className?: string;
}

const HealthConditionIcon: React.FC<HealthConditionIconProps> = ({ className }) => {
  const uniqueId = React.useId();
  const maskId = `mask${uniqueId}`;
  const patternId = `pattern${uniqueId}`;
  const imageId = `image${uniqueId}`;

  return (
    <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <mask id={maskId} style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="75" height="75">
        <rect width="75" height="75" fill={`url(#${patternId})`} />
      </mask>
      <g mask={`url(#${maskId})`}>
        <rect x="2" y="3" width="75" height="69" fill="#5F3515" />
      </g>
      <defs>
        <pattern id={patternId} patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref={`#${imageId}`} transform="scale(0.0111111)" />
        </pattern>
        <image id={imageId} width="90" height="90"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFQ0lEQVR4nO2cW2geRRTHf7VN0vSi1kZFvOEFfKi2RQWNgiioiJcKgi0iFBXqS7HS0Bd9U7w0qNWqYLX4ojYgVRDtg7Vqa4g3fPCCUKNoWrQKotGmjdovsSNDT7CE3f1m9puZnU3mB+clX/LNmX/Onj07c2YhkUgkEolEIpFIJBKJRCJhwrHAMmADsAPYC/wBKOAAsA94D3gSuAno9CDrHPnup4D3gZ9lbCW+7AHeAZ6Q35tfp3/t5UAf8JdMSBnafuAF4CwHPpwNbAZGLH0YBV4BuomYpcBOy4mpDGsAm4BTS/hwmvyzGg78eBdYTES0Ab3AuIPJqaNMX9q3WfhxO/CnYx/GgEeAWVTMycBHjienJtlLwOwCH/RnL3v2YQA4kYo4E/jW8wSV2AfAggwf9M/6A/kwCJwRWuSTAoqsxD4Hjp8k8peBfRgMGdltAdKFKriEZ4t9WJEP/aFydm9FE1Rim8Wq9OFh3yJfIHdiNc1tDFjiU2gXdbKaIqafdr1waQSTU5HZZT6E7nPs5N/AGqBLrMfRE11I0/W78wUi27WLZnZvxjjrIhDPxg4C81wKvcyxg0NSJk5mrizsqBrZDS6F3uDYuVUFY70WgXg29rhLoXc4dGwv0F4w1ooIxLOxt10KPRQomuuYPn7AISOBonmCrREIaGp6adYZY4GieYLlEQhoalobZxwMGM0Te30uxgxhwzhkX8Bo9pk+DgHPy57gArkfXAJsBP4p+Z3f45BPPdXNFCw5uk4fv8gyQh56kejHEt/7GQ7Z4ima2wvqUJfVR0N255uxpERkv04AZgKnAFeKYMOW0Xy3iKlFLZM+Dksdu1JaDFz0hjxtKfR9VIDeanrWIpr3yO/oNGGbPgYNo9T3KuXVVMidUvY0i2YlpiPXJn3oLa3jPPk+30Lk8ZxN46DcCtxREM1DRzlskz6GJm3SVim03p2PmlUZTpumj2s9+2aTOu4hYtpy1k5M0scnAfx7xlDkf0u2rRmxPeMBoF/67lqJZmWYPnR1kVeLPwb81mJ5t1TmZCK07kL1xo05g+pW2CtaiGZlkD6GC8q3Bw0fWLqbiPyTRdq4Ho8cA3yXM7Bem7iqZDQrg/TxaM5nnTn1e5Ydkp4QHd0nyDZUt6QL00jWthuYQYDSTRVc/teUjGbVJH105Px8pYVArsx23aYUs+RhoWh3+7qMv1tjOIm89JHHQGCRd4ds42223aTXC9bK5dklrQSml2Ze+shiUQXRfDMB0flpl6eJjBakj8lsDCxyJQ8oizw2vCw3GF/fBH8PKLK+Is+nItZ7mtRWg7FD3wQfoEJ0JfCVp/QxL6Kb4DdNjncE4SJPKWRFJDdBnTIuJhJMSzdlYbpjKYaboK6eoqIvUPXRafEk2Kq9FeIJ0BYtyteOJ9qTMU5PwA6khUTKeXLU2NVkGyLsQnnwWReoh/pAbKdms7hFNk1VTe2wzKEWrI1AMFXS7qdmVH1MTpWw56gh+m79YgTiKUN7Q/pUaoleTtwWgYjNbHvBendtmCOrXipS2yk+Tgnmyqt2VGQ24PpUVQx0ys6xisR21e0dSjZ0AG9GIPI2Ty/LioqOisXeUtAPOOWYKZ33oUXeJC0T04oZwEMBRe6NcSUuJHd5fgfIuKyXJziyiOPjFNaI67PaU4HFjk/o6pNkF1Y9qVjpcvSWmy+A06ueTOy0t/hyqlctGnASHDnj0rBcsF8/3SuLsuie618NRN4vL29JtMA5Td7YqBt4zm1lgMT/6Efm1cDHUgaOynmW1RYH+ROJRCKRSCQSiUQikUgkErjhPyYqvnuh7TOiAAAAAElFTkSuQmCC" />
      </defs>
    </svg>
  );
};

export default HealthConditionIcon;