import { 
    capitalize
} from '@/utils/input'

export const mutations = {
    step: (state, obj) => state.step = obj,
    gettingCustomer: (state, obj) => state.gettingCustomer = obj,
    creatingCustomer: (state, obj) => state.creatingCustomer = obj,
    newCustomer: (state, obj) => state.newCustomer = obj,
    newCustomerName: (state, obj) => {
        let capitalized = capitalize(obj)
        state.newCustomer.name = capitalized
    },
    newCustomerDocumentNumber: (state, obj) => {
        state.newCustomer.documents[0].number = obj
    },
    newCustomerPhoneNumber: (state, obj) => {
        state.newCustomer.phone_numbers.splice(0, 1, obj)
    },
    newCustomerBirthday: (state, obj) => state.newCustomer.birthday = obj,
    creatingCard: (state, obj) => state.creatingCard = obj,
    newCard: (state, obj) => state.newCard = obj,
    newCardNumber: (state, obj) => state.newCard.card_number = obj,
    newCardHolderName: (state, obj) => {
        let capitalized = capitalize(obj)
        state.newCard.card_holder_name = capitalized
    },
    newCardExpirationDate: (state, obj) => state.newCard.card_expiration_date = obj,
    newCardCvv: (state, obj) => state.newCard.card_cvv = obj,
    gettingCustomerCardList: (state, obj) => state.gettingCustomerCardList = obj,
    customerCardList: (state, obj) => state.customerCardList = obj,
    subscribing: (state, obj) => state.subscribing = obj,
    subscriptionConfirmation: (state, obj) => state.subscriptionConfirmation = obj,
    subscriptionConfirmationCardId: (state, obj) => state.subscriptionConfirmation.card_id = obj,
    subscriptionConfirmationCustomer: (state, obj) => state.subscriptionConfirmation.customer = obj,
}