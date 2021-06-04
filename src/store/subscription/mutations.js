import { 
    capitalize
} from '@/utils/input'

export const mutations = {
    step: (state, obj) => state.step = obj,
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
    newCard: (state, obj) => state.newCard = obj,
    gettingCustomerCardList: (state, obj) => state.gettingCustomerCardList = obj,
    customerCardList: (state, obj) => state.customerCardList = obj,
}