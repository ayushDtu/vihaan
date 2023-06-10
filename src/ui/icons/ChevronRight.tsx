import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ChevronRight = (props: SvgProps) => {
  return (
    <Svg height={24} viewBox="0 -960 960 960" width={24} {...props}>
      <Path
        fill="#fff"
        d="M376-240l-56-56 184-184-184-184 56-56 240 240-240 240z"
      />
    </Svg>
  );
};
