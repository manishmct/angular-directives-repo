# angular-currency-format-input

Component to format input as currency type.

Checkout the [Demo](https://currency-format-directive-angular.stackblitz.io/)

## Consuming your library

Import Directive to your AppModule.

Once the directive is imported, you can use it in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
	<input type="text" formatCurrency [(ngModel)]="currency" decimal_separator="." thousands_separator="," fractionSize="2" />
```

## License

This repository is open-source and available under the [MIT license](https://en.wikipedia.org/wiki/MIT_License). See the LICENSE file for more information.

MIT © [Manikandan](mailto:m.manikandanmct@gmail.com)
