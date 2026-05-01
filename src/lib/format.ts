export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
  }).format(amount)
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("uk-UA")
}
