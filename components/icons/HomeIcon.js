import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeIcon = ({ size = 24, color = '#666666' }) => (
  <Svg width={size} height={size} viewBox="0 0 1000 1000" fill="none">
    <Path
      d="M500 100L100 400V900H400V600H600V900H900V400L500 100Z"
      fill={color}
    />
  </Svg>
);

export default HomeIcon;
