import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform
{

  transform(
    value: number | string | null | undefined,
    showSymbol: boolean = true,
    fractionDigits: number = 2
  ): string
  {

    if (value === null || value === undefined || value === '')
    {
      return showSymbol ? '₹ 0' : '0';
    }

    const numericValue = Number(
      typeof value === 'string' ? value.replace(/,/g, '') : value
    );

    if (isNaN(numericValue))
    {
      return showSymbol ? '₹ 0' : '0';
    }

    const formatted = numericValue.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: fractionDigits
    });

    return showSymbol ? `₹ ${ formatted }` : formatted;
  }

}
