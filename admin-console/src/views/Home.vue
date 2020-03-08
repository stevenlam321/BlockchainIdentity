<template>
  <DefaultLayout>
      <div class="assign-credential-form-container">
        <ul class="steps">
            <li class="active">
                <div class="step-num">1</div>
                <div class="step-name">Enter Email</div>
            </li>
            <li>
                <div class="step-num">2</div>
                <div class="step-name">Check User</div>
            </li>
            <li>
            <div class="step-num">3</div>
                <div class="step-name">Fill Credential</div>
            </li>
            <li>
            <div class="step-num">4</div>
                <div class="step-name">Finish</div>
            </li>
        </ul>
        
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../layout/DefaultLayout";
export default {
  name: "Home",
  components: {
    DefaultLayout
  }
};
</script>

<style scoped>
.steps {
    list-style: none;
    display: flex;
  
    margin: 0;
    padding:0;
}
.steps li{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 10;
}
.steps li::after{
    content: '';
    display: block;
    width: 100%;
    height: 5px;
    background: rgb(141, 141, 141);
    position: absolute;
    top: 14px;
    z-index: -1;
}
.steps li.active .step-num{
    background: rgb(50, 160, 36);
}
.steps li.active::after{
    background: rgb(50, 160, 36);
}
.step-num{
    font-size: 18px;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    background: rgb(141, 141, 141);
    text-align: center;
    line-height: 30px;
    color: blanchedalmond;
}
</style>