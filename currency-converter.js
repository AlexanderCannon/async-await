const axios = require('axios')

const currencyApi = 'http://api.fixer.io/latest?base=';
const countriesApi = 'https://restcountries.eu/rest/v2/currency/';

const getExchangeRate = async (from, to) => {
  try {
    const res = await axios.get(`${currencyApi}${from}`);
    const rate = res.data.rates[to];
    if (rate) {
      return rate;
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} & ${to}`);
  }
}

const getCountries = async (currencyCode) => {
  try {
    const res = await axios.get(`${countriesApi}${currencyCode}`);
    return res.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}`);
  }
};

const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to).then((res) => {
    countries = res;
    console.log(from);
    return getExchangeRate(from, to).then((rate) => {
      const exchangedAmount = amount * rate;
      return `${amount} ${from} is worth ${exchangedAmount} ${to}. This can be used in ${countries.join(', ')}`;
    });
  });
}

const convertCurrencyAsync = async (from, to, amount) => {
  const countries = await getCountries(to);
  const rate = await getExchangeRate(from, to);
  const exchangedAmount = amount * rate;
  return `${amount} ${from} is worth ${exchangedAmount} ${to}. This can be used in ${countries.join(', ')}`;

}

// const g = getExchangeRate('GBP', 'EUR').then((rate) => {
//   console.log(rate);
// });
// const c = getCountries('GBP').then((countries) => {
//   console.log(countries);
// });

// const cc = convertCurrency('EUR', 'GBP', 10000)
//   .then((res) => console.log(res))
//   .catch((e) => console.log(e));

const cca = convertCurrencyAsync('GBP', 'EUR', 10000)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));