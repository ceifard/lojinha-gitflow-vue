export default {
    cancelling: false,
    userSubscription: {},
    subscribing: false,
    newSubscription: {
        customer: {
            email: "",
            name: "",
            document_number: "",
            address: {
                zipcode: "",
                neighborhood: "",
                street: "",
                street_number: ""
            },
            phone: {
                number: "",
                ddd: ""
            }             
        },       
        card_number: "",
        card_holder_name: "",
        card_expiration_date: "",
        card_cvv: "",       
    }
};