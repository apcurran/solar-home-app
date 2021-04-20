function formatCurrency(amt) {
    return new Intl
                .NumberFormat("en-US", { style: "currency", currency: "USD" })
                .format(amt);
}

export { formatCurrency };