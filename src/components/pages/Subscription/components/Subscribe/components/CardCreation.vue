<template>
      <form autocomplete="off" novalidate @submit.prevent="createCardAndGo()" data-vv-scope="formularioCartao">

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioCartao.newCardNumber')"
                                    :invalid-feedback="errors.first('formularioCartao.newCardNumber')"
                                    label-for="newCardNumber">
                                        <label class="form-label">
                                          Numero do cartão de crédito:
                                        </label>                             
                                        <b-form-input
                                          ref="newCardNumber"
                                          name="newCardNumber"                
                                          id="newCardNumber"
                                          v-model="newCardNumber"
                                          placeholder="Ex: 0000000000000000"
                                          maxlenth="16"
                                          v-validate="'required|min:16|credit_card'"
                                          :class="{ 'is-invalid': errors.has('formularioCartao.newCardNumber') }">
                                        </b-form-input>                                                                               
                        </b-form-group>
                    </b-col>                                             
            </b-form-row>

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioCartao.newCardHolderName')"
                                    :invalid-feedback="errors.first('formularioCartao.newCardHolderName')"
                                    label-for="newCardHolderName">
                                        <label class="form-label">
                                          Nome que está escrito no cartão:
                                        </label>                             
                                        <b-form-input
                                          ref="newCardHolderName"
                                          name="newCardHolderName"                
                                          id="newCardHolderName"
                                          v-model="newCardHolderName"
                                          placeholder="Ex: Fulano S Silva"
                                          v-validate="'required|min:3'"
                                          :class="{ 'is-invalid': errors.has('formularioCartao.newCardHolderName') }">
                                        </b-form-input>                                                                               
                        </b-form-group>
                    </b-col>                                             
            </b-form-row>

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioCartao.newCardExpirationDate')"
                                    :invalid-feedback="errors.first('formularioCartao.newCardExpirationDate')"
                                    label-for="newCardExpirationDate">
                                        <label class="form-label">
                                          Data de expiração:
                                        </label>                             
                                        <b-form-input
                                          ref="newCardExpirationDate"
                                          name="newCardExpirationDate"                
                                          id="newCardExpirationDate"
                                          v-model="newCardExpirationDate"
                                          placeholder="Ex: 09/22"
                                          v-mask="'##/##'"
                                          :class="{ 'is-invalid': errors.has('formularioCartao.newCardExpirationDate') }">
                                        </b-form-input>                                                                               
                        </b-form-group>
                    </b-col>                                             
            </b-form-row>

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioCartao.newCardCvv')"
                                    :invalid-feedback="errors.first('formularioCartao.newCardCvv')"
                                    label-for="newCardCvv">
                                        <label class="form-label">
                                          CVV:
                                        </label>                             
                                        <b-form-input
                                          ref="newCardCvv"
                                          name="newCardCvv"                
                                          id="newCardCvv"
                                          v-model="newCardCvv"
                                          maxlength="3"
                                          placeholder="Ex: 123"
                                          v-validate="'required|min:3'"
                                          :class="{ 'is-invalid': errors.has('formularioCartao.newCardCvv') }">
                                        </b-form-input>                                                                               
                        </b-form-group>
                    </b-col>                                             
            </b-form-row>

            <b-form-row class="mt-4">

              <b-col class="text-right"> 

                <b-button id="btnAvancar" class="ml-2" :disabled="creatingCard" variant="success" type="submit">
                  <span v-if="!creatingCard">Avançar <i class="fa fa-check"></i></span>
                  <template v-else>
                      <b-spinner class="ml-2" :style="{ 'margin-bottom': '1px' }" small label="Carregando próxima etapa"></b-spinner>            
                  </template>
                </b-button>    

              </b-col>

            </b-form-row>   

      </form>
</template>

<script>
export default {
    methods: {
        createCardAndGo() {
            this.$validator.validateAll('formularioCartao').then( async success => {    
                if(!success) { //se não passar na validação...
                window.scrollTo({
                    top: 1,
                    behavior: 'smooth',
                })
                this.enviando_solicitacao = false
                //focar no campo que há erro
                //this.$refs[`${this.$validator.errors.items[0].field}`].$el.focus()
                } else {
                    let card = this.newCard
                    let formattedCard = {
                        ...card,
                        card_expiration_date: card.card_expiration_date.replace('/', '')
                    }           
                    console.log(formattedCard);    
                    let response = await this.$store.dispatch('subscription/createCard', formattedCard) 
                    if(response.status) this.$store.commit('subscription/step', 2)
                    else console.log("Erro ao criar cartão");
                }
            })          
        }
    },
    computed: {
        creatingCard: {
            get() {
                return this.$store.getters['subscription/creatingCard']
            },
            set(value) {
                this.$store.commit('subscription/creatingCard', value)
            }
        },       
        newCard: {
            get() {
                return this.$store.getters['subscription/newCard']
            },
            set(value) {
                this.$store.commit('subscription/newCard', value)
            }
        },       
        newCardNumber: {
            get() {
                return this.$store.getters['subscription/newCardNumber']
            },
            set(value) {
                this.$store.commit('subscription/newCardNumber', value)
            }
        },       
        newCardHolderName: {
            get() {
                return this.$store.getters['subscription/newCardHolderName']
            },
            set(value) {
                this.$store.commit('subscription/newCardHolderName', value)
            }
        },       
        newCardExpirationDate: {
            get() {
                return this.$store.getters['subscription/newCardExpirationDate']
            },
            set(value) {
                this.$store.commit('subscription/newCardExpirationDate', value)
            }
        },       
        newCardCvv: {
            get() {
                return this.$store.getters['subscription/newCardCvv']
            },
            set(value) {
                this.$store.commit('subscription/newCardCvv', value)
            }
        },       
    }
}
</script>