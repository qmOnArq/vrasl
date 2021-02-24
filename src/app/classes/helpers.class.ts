export class Helpers {
    static interpolate = (
        startTime: number,
        endTime: number,
        currentTime: number,
        startValue: number,
        endValue: number,
    ) => {
        const percent = (currentTime - startTime) / (endTime - startTime);
        const val = percent * (endValue - startValue);
        return val + startValue;
    };

    static setRotationOfAxis = (rotation: THREE.Euler, axis: 'X' | 'Y' | 'Z', value: number) => {
        const x = rotation.x;
        const y = rotation.y;
        const z = rotation.z;

        value = value * (Math.PI / 180);

        switch (axis) {
            case 'X':
                rotation.set(value, y, z);
                break;
            case 'Y':
                rotation.set(x, value, z);
                break;
            case 'Z':
                rotation.set(x, y, value);
                break;
            default:
                rotation.set(value, y, z);
                break;
        }
    };
}
