/* 
*   Author - Manikandan Maheswaran
*   Email - m.manikandanmct@gmail.com
*   Directive Name - Currency Format
*   Description - ATM like currency input for web in Angular 2
*/


import { Directive, ElementRef, HostListener, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

@Directive({
  selector: '[formatCurrency]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FormatCurrencyDirective,
    multi: true
  }]
})
export class FormatCurrencyDirective implements OnInit {
  private init = "";
  private value = "";
  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;
  private FRACTION_SIZE: number;
  private PADDING = "000000";

  @Input() decimal_separator: string;
  @Input() thousands_separator: string;
  @Input() fractionSize: string;

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: (_: any) => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(private el: ElementRef) {
  }
  ngOnInit() {
    this.DECIMAL_SEPARATOR = this.decimal_separator || ".";
    this.THOUSANDS_SEPARATOR = this.thousands_separator || ",";
    this.FRACTION_SIZE = parseInt(this.fractionSize, 10) || 2;
    this.init = "0" + this.DECIMAL_SEPARATOR + this.PADDING.substring(0, this.FRACTION_SIZE);
  }

  writeValue(value: any) {
    if (value) {
      this.init = value;
      this.value = value.split(this.DECIMAL_SEPARATOR).join("");
    }
    this.updateModelView(this.init);
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  updateModelView(value: string | number) {
    this.onChangeCallback(value);
    this.onTouchedCallback(value);
    this.el.nativeElement.value = value;
  }
  //Adds Thousands Separator to number string
  parse(value: string | number): string {
    let [integer, fraction = ""] = (value || "").toString().split(".");

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR) || "0";

    fraction = parseInt(fraction, 10) > 0 && this.FRACTION_SIZE > 0
      ? this.DECIMAL_SEPARATOR + (fraction + this.PADDING).substring(0, this.FRACTION_SIZE)
      : this.DECIMAL_SEPARATOR + this.PADDING.substring(0, this.FRACTION_SIZE);

    return integer + fraction;
  }
  //Checks for keydown events and parses the value
  @HostListener('keydown', ['$event']) onMouseLeave(event: Event) {
    event.preventDefault();
    let parsedValue = "";
    if (event['key'].match(/[0-9]/g) && this.value.length < 16) {
      this.value += event['key'];
      parsedValue = this.parse(parseInt(this.value) / 100);
      this.updateModelView(parsedValue);
    }
    else if (event['keyCode'] === 8) {
      this.value = this.value.slice(0, -1);
      parsedValue = this.value ? this.parse(parseInt(this.value) / 100) : "0" + this.DECIMAL_SEPARATOR + this.PADDING.substring(0, this.FRACTION_SIZE);
      this.updateModelView(parsedValue);
    }    
  }
}