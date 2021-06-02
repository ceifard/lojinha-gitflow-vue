<template>
      <form autocomplete="off" novalidate @submit.prevent="createCustomerAndGo()" data-vv-scope="formularioCliente">

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioCliente.newCustomerName')"
                                    :invalid-feedback="errors.first('formularioCliente.newCustomerName')"
                                    label-for="newCustomerName">
                                        <label class="form-label">
                                          Nome:
                                        </label>                             
                                        <b-form-input
                                          ref="newCustomerName"
                                          name="newCustomerName"                
                                          id="newCustomerName"
                                          v-model="newCustomerName"
                                          v-validate="'required|min:3'"
                                          :class="{ 'is-invalid': errors.has('formularioCliente.newCustomerName') }">
                                        </b-form-input>                                                                               
                        </b-form-group>
                    </b-col>                                             
            </b-form-row>

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioCliente.newCustomerDocumentNumber')"
                                    :invalid-feedback="errors.first('formularioCliente.newCustomerDocumentNumber')"
                                    label-for="newCustomerDocumentNumber">
                                        <label class="form-label">
                                          CPF:
                                        </label>                             
                                        <b-form-input
                                          ref="newCustomerDocumentNumber"
                                          name="newCustomerDocumentNumber"                
                                          v-model="newCustomerDocumentNumber"
                                          v-mask="'###.###.###-##'"
                                          v-validate="'required|cpf'"
                                          :class="{ 'is-invalid': errors.has('formularioCliente.newCustomerDocumentNumber') }">
                                        </b-form-input>                                                                               
                        </b-form-group>  
                    </b-col>                                                                                                        
            </b-form-row>

            <b-form-row>
                    <b-col>
                      <b-form-group :state="!errors.has('formularioCliente.newCustomerBirthday')"
                                  :invalid-feedback="errors.first('formularioCliente.newCustomerBirthday')"
                                  label-for="newCustomerBirthday">
                                      <label>
                                      Data de Nascimento:
                                      </label>                             
                                      <b-form-input
                                      ref="newCustomerBirthday"
                                      name="newCustomerBirthday"                
                                      v-model="newCustomerBirthday"
                                      v-mask="'##/##/####'"
                                      v-validate="{ date_format: 'dd/MM/yyyy', date_between:['01/01/1900', $moment().format('DD/MM/YYYY')], required: true }"
                                      :class="{ 'is-invalid': errors.has('formularioCliente.newCustomerBirthday') }">
                                      </b-form-input>                                                                               
                      </b-form-group> 
                    </b-col>                                                                                                      
            </b-form-row>      

            <b-form-row>
                    <b-col>
                      <b-form-group :state="!errors.has('formularioCliente.newCustomerPhoneNumber')"
                                  :invalid-feedback="errors.first('formularioCliente.newCustomerPhoneNumber')"
                                  label-for="newCustomerPhoneNumber">
                                      <label>
                                      Telefone:
                                      </label>                             
                                      <b-form-input
                                      ref="newCustomerPhoneNumber"
                                      name="newCustomerPhoneNumber"                
                                      v-model="newCustomerPhoneNumber"                                   
                                      v-validate="'required|min:14'"
                                      v-mask="['(##) ####-####', '(##) #####-####']"
                                      :class="{ 'is-invalid': errors.has('formularioCliente.newCustomerPhoneNumber') }">
                                      </b-form-input>                                                                               
                      </b-form-group>   
                    </b-col>                                                                                                      
            </b-form-row>      

            <b-form-row class="mt-4">

              <b-col class="text-right"> 

                <b-button id="btnAvancar" class="ml-2" :disabled="creatingCustomer" variant="success" type="submit">
                  <span v-if="!creatingCustomer">Avançar <i class="fa fa-check"></i></span>
                  <template v-else>
                      <b-spinner class="ml-2" :style="{ 'margin-bottom': '1px' }" small label="Carregando próxima etapa"></b-spinner>            
                  </template>
                </b-button>    

              </b-col>

            </b-form-row>               

      </form>
</template>

<script>
import { 
    removeSpecial,
} from '@/utils/input'
import CpfValidate from '@/utils/cpf.js'   
import { Validator  } from 'vee-validate'     
export default {
    inject: ['$validator'],  
    created() {
        Validator.extend('cpf', {
            getMessage: field => 'CPF inválido.',
            validate: value => CpfValidate(value)
        });         
    },
    methods: {
      createCustomerAndGo() {
        this.$validator.validateAll('formularioCliente').then( async success => {    
            if(!success) { //se não passar na validação...
              window.scrollTo({
                  top: 1,
                  behavior: 'smooth',
              })
              this.enviando_solicitacao = false
              //focar no campo que há erro
              //this.$refs[`${this.$validator.errors.items[0].field}`].$el.focus()
            } else {
                let customer = this.newCustomer
                let formattedCustomer = {
                    ...customer,
                    birthday: this.$moment(this.newCustomerBirthday).format('YYYY-MM-DD'),
                    documents: [
                        {
                            ...customer.documents[0],
                            number: removeSpecial(customer.documents[0].number)
                        }
                    ],
                    phone_numbers: [`+55${removeSpecial(customer.phone_numbers[0])}`],
                    email: this.email
                }               
                let response = await this.$store.dispatch('subscription/createCustomer', formattedCustomer) 
                if(response.status) this.$store.commit('subscription/step', 1)
                else console.log("Erro ao criar customer");
            }
        }) 
      }
    },
    computed: {                                     
        email(){
          return this.$store.getters['login/email']
        },
        creatingCustomer(){
          return this.$store.getters['subscription/creatingCustomer']
        },
        newCustomer: {
            get() {
                return this.$store.getters['subscription/newCustomer']
            },
            set(value) {
                this.$store.commit('subscription/newCustomer', value)
            }
        }, 
        newCustomerName: {
            get() {
                return this.$store.getters['subscription/newCustomerName']
            },
            set(value) {
                this.$store.commit('subscription/newCustomerName', value)
            }
        }, 
        newCustomerDocumentNumber: {
            get() {
                return this.$store.getters['subscription/newCustomerDocumentNumber']
            },
            set(value) {
                this.$store.commit('subscription/newCustomerDocumentNumber', value)
            }
        }, 
        newCustomerPhoneNumber: {
            get() {
                return this.$store.getters['subscription/newCustomerPhoneNumber']
            },
            set(value) {
                this.$store.commit('subscription/newCustomerPhoneNumber', value)
            }
        }, 
        newCustomerBirthday: {
            get() {
                return this.$store.getters['subscription/newCustomerBirthday']
            },
            set(value) {
                this.$store.commit('subscription/newCustomerBirthday', value)
            }
        }, 
    }    
}
</script>