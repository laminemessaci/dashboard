export enum Currency {
  EUR,
  USD,
  DA,
}

// Get Currency Symbol
const getCurrencySymbol = (symbol: Currency) => {
  switch (symbol) {
    case Currency.EUR:
      return "€";
    case Currency.USD:
      return "$";
    case Currency.DA:
      return "DA";
    default:
      return "€";
  }
};

// Get Symbol intl
const getSymbolIntl = (symbol: Currency) => {
  switch (symbol) {
    case Currency.EUR:
      return "EUR";
    case Currency.USD:
      return "USD";
    case Currency.DA:
      return "DA";
    default:
      return "EUR";
  }
};

export { getCurrencySymbol, getSymbolIntl };
