export default {
    step: 0, // 0 = cadastro de cliente no PAGARME, 1 = novo cartao, 2 = lista de cartoes, 3 = confirmação de assinatura,
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
    newCard: {},
};