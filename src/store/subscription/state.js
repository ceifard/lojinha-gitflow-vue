export default {
    step: 0, // 0 = cadastro de cliente no PAGARME, 1 = lista de cartoes, 2 = novo cartao, 3 = confirmação de assinatura,
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
    cardList: [],
    newCard: {},
};