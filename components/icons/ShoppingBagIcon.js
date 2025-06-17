import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ShoppingBagIcon = ({ size = 24, color = '#666666' }) => (
  <Svg width={size} height={size} viewBox="0 0 1000 1000" fill="none">
    <Path
      d="M200 300H800L850 900H150L200 300ZM300 200C300 150 350 100 400 100H600C650 100 700 150 700 200V300H600V200H400V300H300V200Z"
      fill={color}
    />
    <Path
      d="M350 450C350 425 375 400 400 400C425 400 450 425 450 450C450 475 425 500 400 500C375 500 350 475 350 450Z"
      fill="white"
    />
    <Path
      d="M550 450C550 425 575 400 600 400C625 400 650 425 650 450C650 475 625 500 600 500C575 500 550 475 550 450Z"
      fill="white"
    />
  </Svg>
);

export default ShoppingBagIcon;
