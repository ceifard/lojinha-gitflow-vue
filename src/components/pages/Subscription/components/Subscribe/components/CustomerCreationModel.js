import { 
    removeSpecial
} from '@/utils/input'
export let Model = {
    computed: {                
        customer: {
            get() {
                return this.$store.getters['subscription/customer']
            },
            set(value) {
                this.$store.commit('subscription/customer', value)
            }
        }, 
        email: {
            get() {
                return this.$store.getters['subscription/email']
            },
            set(value) {
                this.$store.commit('subscription/email', value)
            }
        }, 
        name: {
            get() {
                return this.$store.getters['subscription/name']
            },
            set(value) {
                this.$store.commit('subscription/name', value.toUpperCase())
            }
        }, 
        document_number: {
            get() {
                return this.$store.getters['subscription/document_number']
            },
            set(value) {
                this.$store.commit('subscription/document_number', value)
            }
        }, 
        zipcode: {
            get() {
                return this.$store.getters['subscription/zipcode']
            },
            set(value) {
                this.$store.commit('subscription/zipcode', value)
            }
        }, 
        neighborhood: {
            get() {
                return this.$store.getters['subscription/neighborhood']
            },
            set(value) {
                this.$store.commit('subscription/neighborhood', value.toUpperCase())
            }
        }, 
        street: {
            get() {
                return this.$store.getters['subscription/street']
            },
            set(value) {
                this.$store.commit('subscription/street', value.toUpperCase())
            }
        }, 
        street_number: {
            get() {
                return this.$store.getters['subscription/street_number']
            },
            set(value) {
                this.$store.commit('subscription/street_number', value)
            }
        }, 
        number: {
            get() {
                let ddd = this.$store.getters['subscription/ddd']
                let number = this.$store.getters['subscription/number']
                return `${ddd}${number}`
            },
            set(value) {
                let fullNumber = removeSpecial(value)
                let ddd = fullNumber.substr(0,2)
                let number = fullNumber.substr(2)
                this.$store.commit('subscription/ddd', ddd)
                this.$store.commit('subscription/number', number)
            }
        },  
    }
}