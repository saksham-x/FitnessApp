import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';

const CircularProgressBar = ({ totalCalories, fatPercentage, carbsPercentage, proteinPercentage }) => {
  const getRingPath = (startAngle, endAngle) => {
    const radius = 40;
    const startRadians = ((startAngle - 90) * Math.PI) / 180; // Adjust the starting point to be at the top
    const endRadians = ((endAngle - 90) * Math.PI) / 180;
    const x1 = 50 + radius * Math.cos(startRadians);
    const y1 = 50 + radius * Math.sin(startRadians);
    const x2 = 50 + radius * Math.cos(endRadians);
    const y2 = 50 + radius * Math.sin(endRadians);

    return `M${x1},${y1} A${radius},${radius} 0 ${endAngle - startAngle > 180 ? 1 : 0},1 ${x2},${y2}`;
  };

  const fatEndAngle = (360 * fatPercentage) / 100;
  const carbsEndAngle = (360 * (fatPercentage + carbsPercentage)) / 100;

  return (
    <View style={{ width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' }}>
      <Svg height="200" width="200" viewBox="0 0 100 100">
        {/* Ring for Fat */}
        <Path d={getRingPath(0, fatEndAngle)} fill="#f14647" />
        {/* Ring for Carbs */}
        <Path d={getRingPath(fatEndAngle, carbsEndAngle)} fill="#ffbe61" />
        {/* Ring for Protein */}
        <Path d={getRingPath(carbsEndAngle, 360)} fill="#6acc00" />

        {/* Central Circle */}
        <Circle cx="50" cy="50" r="30" fill="#fff" />

        {/* Total Calories Text */}
        <SvgText x="50" y="50" fontSize="12" textAnchor="middle" dy="4" fill="#000">
          {totalCalories} Calories
        </SvgText>
      </Svg>
    </View>
  );
};

export default CircularProgressBar;
