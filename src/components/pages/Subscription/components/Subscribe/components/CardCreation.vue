<template>
      <div>

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioAssinatura.card_number')"
                                    :invalid-feedback="errors.first('formularioAssinatura.card_number')"
                                    label-for="card_number">
                                        <label class="form-label">
                                          Numero do cartão de crédito:
                                        </label>                             
                                        <b-form-input
                                          ref="card_number"
                                          name="card_number"                
                                          id="card_number"
                                          v-model="card_number"
                                          placeholder="Ex: 0000000000000000"
                                          maxlenth="16"
                                          v-validate="'required|min:16|credit_card'"
                                          :class="{ 'is-invalid': errors.has('formularioAssinatura.card_number') }">
                                        </b-form-input>                                                                               
                        </b-form-group>
                    </b-col>                                             
            </b-form-row>

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioAssinatura.card_holder_name')"
                                    :invalid-feedback="errors.first('formularioAssinatura.card_holder_name')"
                                    label-for="card_holder_name">
                                        <label class="form-label">
                                          Nome que está escrito no cartão:
                                        </label>                             
                                        <b-form-input
                                          ref="card_holder_name"
                                          name="card_holder_name"                
                                          id="card_holder_name"
                                          v-model="card_holder_name"
                                          placeholder="Ex: Fulano S Silva"
                                          v-validate="'required|min:3'"
                                          :class="{ 'is-invalid': errors.has('formularioAssinatura.card_holder_name') }">
                                        </b-form-input>                                                                               
                        </b-form-group>
                    </b-col>                                             
            </b-form-row>

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioAssinatura.card_expiration_date')"
                                    :invalid-feedback="errors.first('formularioAssinatura.card_expiration_date')"
                                    label-for="card_expiration_date">
                                        <label class="form-label">
                                          Data de expiração:
                                        </label>                             
                                        <b-form-input
                                          ref="card_expiration_date"
                                          name="card_expiration_date"                
                                          id="card_expiration_date"
                                          v-model="card_expiration_date"
                                          placeholder="Ex: 09/22"
                                          v-mask="'##/##'"
                                          :class="{ 'is-invalid': errors.has('formularioAssinatura.card_expiration_date') }">
                                        </b-form-input>                                                                               
                        </b-form-group>
                    </b-col>                                             
            </b-form-row>

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioAssinatura.card_cvv')"
                                    :invalid-feedback="errors.first('formularioAssinatura.card_cvv')"
                                    label-for="card_cvv">
                                        <label class="form-label">
                                          CVV:
                                        </label>                             
                                        <b-form-input
                                          ref="card_cvv"
                                          name="card_cvv"                
                                          id="card_cvv"
                                          v-model="card_cvv"
                                          maxlength="3"
                                          placeholder="Ex: 123"
                                          v-validate="'required|min:3'"
                                          :class="{ 'is-invalid': errors.has('formularioAssinatura.card_cvv') }">
                                        </b-form-input>                                                                               
                        </b-form-group>
                    </b-col>                                             
            </b-form-row>
 
      </div>
</template>

<script>
import { Model } from './CardCreationModel'
export default {
    mixins: [Model],        
}
</script>