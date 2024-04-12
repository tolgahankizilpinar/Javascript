function formatCurrency(currency){
    const currencyNumber = parseInt(currency, 10);

    const formatter = new Intl.NumberFormat("tr-TR",{
        style: "currency",
        currency: "TRY",
        minimumFractionDigit: 2
    });

    return formatter.format(currencyNumber);
}