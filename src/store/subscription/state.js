export default {
    step: 0, // 0 = cadastro de cliente no PAGARME, 1 = novo cartao, 2 = lista de cartoes, 3 = confirmação de assinatura,
    gettingCustomer: false,
    creatingCustomer: false,
    newCustomer: {
        name: "",
        documents: [
            {
                type: "cpf",
                number: ""
            }
        ],
        phone_numbers: [""],
        birthday: "",
    },
    gettingCustomerCardList: false,
    customerCardList: [],
    creatingCard: false, 
    newCard: {
        card_number: "",
        card_holder_name: "",
        card_expiration_date: "",
        card_cvv: ""
    },
    subscribing: false,
    subscriptionConfirmation: {
        card_id: "",
        customer: {}        
    }
};