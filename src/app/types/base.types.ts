import { AslWord } from '../definitions/asl-words';

export interface UnityInstance {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    SendMessage(gameObject: string, methodName: string, parameter?: string | number | boolean): void;
}

export interface WordDefinition {
    name?: string;
    index?: boolean;
    red?: boolean;
    oculus?: boolean;
    hidden?: boolean;
}

export interface CategoryDefinition {
    name: string;
    words: Readonly<AslWord[]>;
}
