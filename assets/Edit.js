import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function Edit(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Rect width={24} height={24} rx={12} fill="#F3F3F3" />
      <Path
        d="M17.25 18H6.75a.75.75 0 100 1.5h10.5a.75.75 0 100-1.5zm-10.5-1.5h.067l3.128-.285a1.5 1.5 0 00.907-.428l6.75-6.75a1.44 1.44 0 00-.052-2.032L15.495 4.95a1.5 1.5 0 00-1.995-.053l-6.75 6.75a1.5 1.5 0 00-.428.908L6 15.682a.75.75 0 00.75.818zM14.453 6L16.5 8.047 15 9.51 12.99 7.5 14.453 6z"
        fill="#5E6272"
      />
    </Svg>
  );
}

export default Edit;
