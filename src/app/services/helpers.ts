/**
 * Converts [ngInput] or classic HTML attribute to boolean value.
 * Main purpose is to have ability to input classic JS expression via e.g. [disabled] but also
 * the HTML way with simple attribute e.g. disabled, where true is empty attribute,
 * For e.g. attribute disabled:
 *      true: disabled | disabled="true" | disabled="disabled" | disabled="any value" | [disabled]="true"
 *      false: no attribute | disabled="false" | [disabled]="false" | [disabled]
 * @example:
 *      @Input() public set disabled(val:any) { this._disabled = toBoolean(val); }
 * Value table:
 *      definition              input                 output
 *      -----------------------------------------------------
 *      [disabled]            -> no input          ->  no output (default value)
 *      [disabled]=""         -> no input          ->  no output (default value)
 *      -----------------------------------------------------
 *      disabled="false"      -> string "false"    ->  false
 *      [disabled]="false"    -> boolean false     ->  false
 *      [disabled]="......."  -> whatever javascript falsy value ->  false
 *      -----------------------------------------------------
 *      disabled              -> string ""         ->  true
 *      disabled=""           -> string ""         ->  true
 *      disabled="true"       -> string "true"     ->  true
 *      disabled="disabled"   -> string "disabled" ->  true
 *      disabled="whatever"   -> string "whatever" ->  true
 *      [disabled]="true"     -> boolean true      ->  true
 *      [disabled]="......."  -> whatever javascript thruthy value ->  true
 *                              (only exception is empty string, which is true due
 *                               accepting solo disabled and disabled="" as true)
 */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function toBoolean(val: unknown) {
    // checks all falsy js values (false, undefined, null, 0, NaN) except empty string ("") and as falsy is accepted also string "false"
    // eslint-disable-next-line max-len
    return val !== false && val !== 'false' && val !== undefined && val !== null && val !== 0 && val === val; // val===val is check for NaN (it does not equal itself)
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function uniq<T>(array: T[] | Readonly<T[]>) {
    return array.filter((value, index, self) => self.indexOf(value) === index);
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function getRandom<T>(arr: T[], n: number): T[] {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);
    if (n > len) {
        throw new RangeError('getRandom: more elements taken than available');
    }
    while (n--) {
        const x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function shuffle<T>(array: T[]): T[] {
    array = [...array];
    let currentIndex = array.length;
    let temporaryValue: T;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
