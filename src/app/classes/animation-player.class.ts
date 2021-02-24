import { AnimationData, BoneMapping } from '../types';
import { MappedBone } from '../types.mapped-bones';
import { Helpers } from './helpers.class';

export class AnimationPlayer {
    private looping = true;

    private playing = false;
    private time = 0;

    private animationData?: AnimationData;

    constructor(private object: THREE.Group, private boneMapping: BoneMapping) {}

    loadAnimation(animationData: AnimationData) {
        this.animationData = animationData;
        this.time = 0;
        this.playing = false;
    }

    play() {
        this.playing = true;
    }

    stop() {
        this.playing = false;
        this.time = 0;
    }

    pause() {
        this.playing = false;
    }

    getRotationValue(item: MappedBone, useNormalization: boolean) {
        const mappedAttribute = this.boneMapping[item];

        if (!mappedAttribute || !mappedAttribute.name) {
            return null;
        }

        const bone = this.object.getObjectByName(mappedAttribute.name);
        if (bone) {
            const value = bone.rotation[mappedAttribute.axis.toLowerCase() as 'x' | 'y' | 'z'];

            if (useNormalization) {
                return Helpers.interpolate(mappedAttribute.start, mappedAttribute.end, value * (180 / Math.PI), -2, 2);
            }

            return value * (180 / Math.PI);
        }

        return null;
    }

    setRotationValue(item: MappedBone, value: number, useNormalization: boolean) {
        const mappedAttribute = this.boneMapping[item];

        if (!mappedAttribute || !mappedAttribute.name) {
            return;
        }

        if (useNormalization) {
            value = Helpers.interpolate(-2, 2, value, mappedAttribute.start, mappedAttribute.end);
        }

        const bone = this.object.getObjectByName(mappedAttribute.name);
        if (bone) {
            Helpers.setRotationOfAxis(bone.rotation, mappedAttribute.axis, value);
        }
    }

    update(delta: number) {
        if (!this.playing || !this.animationData) {
            return;
        }

        this.time += delta;

        if (this.time > this.animationData.stopTime) {
            this.time = this.animationData.stopTime;

            if (this.looping) {
                this.time = 0;
            } else {
                this.playing = false;
            }
        }

        this.animationData.curves.forEach(curve => {
            const originalAttribute = curve.attribute;
            const mappedAttribute = this.boneMapping[originalAttribute as MappedBone];
            if (!mappedAttribute || !mappedAttribute.name) {
                return;
            }

            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i = 0; i < curve.data.length; i++) {
                const curveItem = curve.data[i];
                if (curveItem.time > this.time) {
                    const currentItem = i > 0 ? curve.data[i - 1] : curve.data[0];
                    const nextItem = curveItem;

                    const currentValue = Helpers.interpolate(
                        -2,
                        2,
                        currentItem.value,
                        mappedAttribute.start,
                        mappedAttribute.end,
                    );

                    const nextValue = Helpers.interpolate(
                        -2,
                        2,
                        nextItem.value,
                        mappedAttribute.start,
                        mappedAttribute.end,
                    );

                    const value = Helpers.interpolate(
                        currentItem.time,
                        nextItem.time,
                        this.time,
                        currentValue,
                        nextValue,
                    );

                    const bone = this.object.getObjectByName(mappedAttribute.name);
                    if (bone) {
                        Helpers.setRotationOfAxis(bone.rotation, mappedAttribute.axis, value);
                    }

                    return;
                }
            }
        });
    }
}
