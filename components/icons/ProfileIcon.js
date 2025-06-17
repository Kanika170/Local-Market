import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const ProfileIcon = ({ size = 24, color = '#666666' }) => (
  <Svg width={size} height={size} viewBox="0 0 1000 1000" fill="none">
    <Circle cx="500" cy="300" r="200" fill={color} />
    <Path
      d="M500 600C350 600 200 675 150 800C100 925 150 1000 500 1000C850 1000 900 925 850 800C800 675 650 600 500 600Z"
      fill={color}
    />
  </Svg>
);

export default ProfileIcon;
