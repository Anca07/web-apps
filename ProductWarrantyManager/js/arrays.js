var warranties = [
    {
        id: "X100",
        customer_name: "John Doe",
        customer_email: "john.doe@gmail.com",
        customer_phone: "0728111000",
        product_type: "smartphone",
        validity_years: "2",
        purchase_date: "2019-12-31",
        damages_covered: ["distribution", "usage"]
    },
    {
        id: "X101",
        customer_name: "Mary Jameson",
        customer_email: "mary.jameson@abc.com",
        customer_phone: "0721340102",
        product_type: "laptop",
        validity_years: "5",
        purchase_date: "2019-03-15",
        damages_covered: ["manufacturing", "distribution"]
    },
    {
        id: "X102",
        customer_name: "Daniel Hoffman",
        customer_email: "daniel.hoffman@abc.com",
        customer_phone: "0721343607",
        product_type: "TV",
        validity_years: "7",
        purchase_date: "2018-01-15",
        damages_covered: ["manufacturing", "distribution", "usage", "malfunction"]
    },
    {
        id: "X103",
        customer_name: "Susan McKenzie",
        customer_email: "susan.mckenzie@abc.com",
        customer_phone: "0756113605",
        product_type: "laptop",
        validity_years: "3",
        purchase_date: "2017-07-01",
        damages_covered: ["usage", "malfunction"]
    },
    {
        id: "X104",
        customer_name: "Joseph Thomson",
        customer_email: "joseph.thomson@abc.com",
        customer_phone: "0744121030",
        product_type: "smartphone",
        validity_years: "5",
        purchase_date: "2019-10-10",
        damages_covered: ["manufacturing", "distribution",]
    }
]

var damages = {
    manufacturing: "Defects from manufacturing - e.g. missing parts, damaged parts",
    distribution: "Defects occuring during the distribution phase - e.g. damage of the product during transportation, lost items",
    usage: "Damages due to the consumer usage of the product - e.g. excessive wear, incorrect usage",
    malfunction: "Malfunction defects - e.g. overcharge, excessive heating, explosion, premature failure"
}

var productTypes = [
    "smartphone",
    "laptop",
    "TV"
]
