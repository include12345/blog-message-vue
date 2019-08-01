<template lang="html">
    <header>
         <!-- <div class="bg">
         
         </div> -->
          <div>
            <vue-particles
        color="#FFFFE0"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#90EE90"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="bg"
      >
      </vue-particles>
        </div>
       <nav>
          <ul>
              <li style="z-index:10000"><router-link to="/show">主页</router-link></li>
              <li style="z-index:10000"><router-link to="/login">后台</router-link></li>
          </ul>
      </nav>
     
        <section class="home_title">
            <transition name='fade'>
                <h1 v-if="show_headline">{{finalheadline}}</h1>
            </transition>
        </section>  
    </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            finalheadline:'',
            show_headline:true
        }
    },
    computed:mapState(['headline']),
    watch:{
        headline(val) {
            this.show_headline = false;
            setTimeout(()=> {
                this.show_headline = true;
                this.finalheadline = val
            }, 200)
        }
    }
}
</script>

<style lang="css">
.fade-enter-active,.fade-leave-active{
      transition: all .4s;
  }
.fade-enter,.fade-leave-active{
    opacity: 0;
  }
  header{
    height: 8rem;
    display: flex;
    flex-direction: column;
  }
  
  .bg{
    z-index:10;
    position: absolute;
    width: 100%;
    /* left:0;
    top:0; */
      /*background-size: cover; 必须放在background-position后面用 "/" 分割*/
    /* background:  url('../../assets/bg.jpg') no-repeat center /cover; */
    /* brightness()给图片应用一种线性乘法，使其看起来更亮或更暗。如果值是0%，图像会全黑。值是100%，
    则图像无变化。其他的值对应线性乘数效果。值超过100%也是可以的，图像会比原来更亮。如果没有设定值，默认是1。*/
    filter: brightness(0.7);
  }
  nav ul{
    z-index: 10000;
    display: flex;
    display: -webkit-flex;
    -webkit-justify-content:flex-end;
    justify-content: flex-end;
    margin:0;
    list-style: none;
  }
  nav a {
    z-index:10000;
    font-size:1.6rem;
    display: block;
    padding: 1.2rem 1.8rem;
    color:#0e130f;
    opacity: 1;
    transition: opacity 0.3s;
    /*解决iphone下的a标签点击会出现底色*/
  }
  nav a:hover{
    opacity: 0.7;
  }
  .home_title{
    color: rgb(54, 9, 216);
    display: flex;
    margin: auto;
    max-width: 98%;
  }
  .home_title h1{
    margin:auto;
    font-size: 3rem;
    font-weight: 200;
  }

  @media screen and (max-width:768px){
    .home_title h1{
      font-size: 2.6rem;
    }
    .bg,header{
      height: 10rem;
    }
  }
  @media screen and (max-width:480px){
  header,.bg{
      height: 10rem;
    }
    nav a{
      font-size:1.6rem;
    }
  }
</style>
