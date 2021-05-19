<template>
    <div class="principal mt-4">


        <b-jumbotron bg-variant="secondary" text-variant="white" class="pb-0 text-center">
            <template #header>Lojinha de Estudos - Teste PR</template>

            <template #lead>
                Essa é uma aplicação simples para eu estudar novas tecnologias conforme for aprendendo. É nois.
            </template>

            <hr class="my-4 bg-white">

            <p>
                Tudo que eu estudar de tecnologia nova será implementado aqui, com o backend em NodeJs que já criei.
            </p>

            <b-row>
                <b-col class="d-flex justify-content-center cartSvgContainer mx-2 w-100 rounded mb-4">
                    <div class="cartSvg">
                        <CartSvg/>
                    </div>                    
                </b-col>
            </b-row>


        </b-jumbotron>

        <!-- <b-row>
            <b-col>
                <CartSvg/>
            </b-col>
        </b-row> -->

    </div>
</template>

<script>
import CartSvg from './CartSvg.vue'
export default {
    components: {
        CartSvg
    }
}
</script>

<style scoped>
    .cartSvgContainer {
        /* background-color: rgba(141, 141, 141, 0.459); */
    }
    .cartSvg {
        display: flex;
        align-items: center;
        max-height: 300px;
        max-width: 250px;
    }
    @media (min-width: 768px) {
        .cartSvg {
            max-height: 450px;
            max-width: 400px;
        }        
    }
</style>