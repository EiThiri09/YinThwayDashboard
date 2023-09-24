export const FormatTotalCount = (data) => {
    let dailyTotalCount = data.total_count;
    if (dailyTotalCount === undefined) {
        dailyTotalCount = data.total;
    }
    if (dailyTotalCount === undefined) {
        dailyTotalCount = data.count;
    }

    return dailyTotalCount
}
export const FormatDate = (data) => {
    let dailyDate = data.date;
    if (dailyDate === undefined) {
        dailyDate = data.transaction_date;
    }
    
    return dailyDate
}
export const FormatCustomerData = (data) => {
    let dailyCus = data.customers;
    if (dailyCus === undefined) {
        dailyCus = data.revenue;
    }
    return dailyCus;
}

export const FormatCustomerType = (data) => {
    let customerType = data.customer_type;
    if (customerType === undefined) {
        customerType = data.type;
    }
    if (customerType === undefined) {
        customerType = data.payment_provider;
    }
    if (customerType === undefined || customerType === null) {
        customerType = "Undefined";
    }
    return customerType;
}

export const FormatCustomerCount = (data) => {
    let count = data.count;
    if (count === undefined) {
        count = data.amount
    }
    return count;
}