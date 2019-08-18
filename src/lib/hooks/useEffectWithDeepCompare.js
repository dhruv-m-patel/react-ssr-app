import React from 'react';
import equal from 'fast-deep-equal';

function useDeepCompare(value) {
  const ref = React.useRef();
  if (!ref.current || !equal(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

export default function useEffectWithDeepCompare(callback, dependencies) {
  return React.useEffect(callback, useDeepCompare(dependencies));
}
