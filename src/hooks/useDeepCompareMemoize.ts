import { useRef } from 'react';
import deepCompareEqualsForMaps from './deepCompareEqualsForMaps';

export default function useDeepCompareMemoize(value: any) {
    const ref = useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}
