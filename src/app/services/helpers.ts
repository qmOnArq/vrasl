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
export function toBoolean(val: unknown) {
    // checks all falsy js values (false, undefined, null, 0, NaN) except empty string ("") and as falsy is accepted also string "false"
    return val !== false && val !== 'false' && val !== undefined && val !== null && val !== 0 && val === val; // val===val is check for NaN (it does not equal itself)
}
