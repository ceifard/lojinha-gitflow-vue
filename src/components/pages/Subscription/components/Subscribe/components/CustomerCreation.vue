<template>
      <div>

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioAssinatura.name')"
                                    :invalid-feedback="errors.first('formularioAssinatura.name')"
                                    label-for="name">
                                        <label class="form-label">
                                          Nome:
                                        </label>                             
                                        <b-form-input
                                          ref="name"
                                          name="name"                
                                          id="name"
                                          v-model="name"
                                          v-validate="'required|min:3'"
                                          :class="{ 'is-invalid': errors.has('formularioAssinatura.name') }">
                                        </b-form-input>                                                                               
                        </b-form-group>
                    </b-col>                                             
            </b-form-row>

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioAssinatura.document_number')"
                                    :invalid-feedback="errors.first('formularioAssinatura.document_number')"
                                    label-for="document_number">
                                        <label class="form-label">
                                          CPF:
                                        </label>                             
                                        <b-form-input
                                          ref="document_number"
                                          name="document_number"                
                                          v-model="document_number"
                                          v-mask="'###.###.###-##'"
                                          v-validate="'required|cpf'"
                                          :class="{ 'is-invalid': errors.has('formularioAssinatura.document_number') }">
                                        </b-form-input>                                                                               
                        </b-form-group>  
                    </b-col>                                                                                                        
            </b-form-row>     

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioAssinatura.zipcode')"
                                    :invalid-feedback="errors.first('formularioAssinatura.zipcode')"
                                    label-for="zipcode">
                                        <label class="form-label">
                                          CEP:
                                        </label>                             
                                        <b-form-input
                                          ref="zipcode"
                                          name="zipcode"                
                                          v-model="zipcode"
                                          v-mask="'#####-###'"
                                          v-validate="'required'"
                                          :class="{ 'is-invalid': errors.has('formularioAssinatura.zipcode') }">
                                        </b-form-input>                                                                               
                        </b-form-group>  
                    </b-col>                                                                                                        
            </b-form-row>    

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioAssinatura.neighborhood')"
                                    :invalid-feedback="errors.first('formularioAssinatura.neighborhood')"
                                    label-for="neighborhood">
                                        <label class="form-label">
                                          Bairro:
                                        </label>                             
                                        <b-form-input
                                          ref="neighborhood"
                                          name="neighborhood"                
                                          id="neighborhood"
                                          v-model="neighborhood"
                                          v-validate="'required|min:3'"
                                          :class="{ 'is-invalid': errors.has('formularioAssinatura.neighborhood') }">
                                        </b-form-input>                                                                               
                        </b-form-group>
                    </b-col>                                             
            </b-form-row>             

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioAssinatura.street')"
                                    :invalid-feedback="errors.first('formularioAssinatura.street')"
                                    label-for="street">
                                        <label class="form-label">
                                          Rua:
                                        </label>                             
                                        <b-form-input
                                          ref="street"
                                          name="street"                
                                          id="street"
                                          v-model="street"
                                          v-validate="'required|min:3'"
                                          :class="{ 'is-invalid': errors.has('formularioAssinatura.street') }">
                                        </b-form-input>                                                                               
                        </b-form-group>
                    </b-col>                                             
            </b-form-row>   

            <b-form-row>
                    <b-col>
                        <b-form-group :state="!errors.has('formularioAssinatura.street_number')"
                                    :invalid-feedback="errors.first('formularioAssinatura.street_number')"
                                    label-for="street_number">
                                        <label class="form-label">
                                          Numero:
                                        </label>                             
                                        <b-form-input
                                          ref="street_number"
                                          name="street_number"                
                                          id="street_number"
                                          v-model="street_number"
                                          v-validate="'required'"
                                          :class="{ 'is-invalid': errors.has('formularioAssinatura.street_number') }">
                                        </b-form-input>                                                                               
                        </b-form-group>
                    </b-col>                                             
            </b-form-row>             

            <b-form-row>
                    <b-col>
                      <b-form-group :state="!errors.has('formularioAssinatura.number')"
                                  :invalid-feedback="errors.first('formularioAssinatura.number')"
                                  label-for="number">
                                      <label>
                                      Telefone:
                                      </label>                             
                                      <b-form-input
                                      ref="number"
                                      name="number"                
                                      v-model="number"                                   
                                      v-validate="'required|min:10'"
                                      v-mask="['(##) ####-####', '(##) #####-####']"
                                      :class="{ 'is-invalid': errors.has('formularioAssinatura.number') }">
                                      </b-form-input>                                                                               
                      </b-form-group>   
                    </b-col>                                                                                                      
            </b-form-row>                   

      </div>
</template>

<script>
import { Model } from './CustomerCreationModel'

import CpfValidate from '@/utils/cpf.js'   
import { Validator  } from 'vee-validate'     
export default {
    mixins: [Model],    
    inject: ["parentValidator"],
    created() {
        this.$validator = this.parentValidator;
        Validator.extend('cpf', {
            getMessage: field => 'CPF inválido.',
            validate: value => CpfValidate(value)
        });         
    },
}
</script>