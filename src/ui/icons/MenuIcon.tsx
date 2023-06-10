import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const MenuIcon = (props: SvgProps) => {
  return (
    <Svg height={24} viewBox="0 -960 960 960" width={24} {...props}>
      <Path
        fill="#fff"
        d="M120-240v-60h720v60H120zm0-210v-60h720v60H120zm0-210v-60h720v60H120z"
      />
    </Svg>
  );
};
