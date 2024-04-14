function formatCurrency(currency){
    const currencyNumber = +currency;

    const formatter = new Intl.NumberFormat("tr-TR",{
        style: "currency",
        currency: "TRY",
        minimumFractionDigit: 2
    });

    return formatter.format(currencyNumber);
}