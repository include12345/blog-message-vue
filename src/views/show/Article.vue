<template lang="html">
    <article v-loading="listLoading" element-loading-text="加载中" class="article_wrap article">
        <header>
            <div class="home_title">{{title}}</div>
            <div><p class="home_createAt">{{createAuthor}}</p></div>
        </header>
        <section v-html="content" class="home_main"></section>
    </article>
</template>
<script>
 import {getOneArticle} from '@/api/api'
 import marked from 'marked';
export default {
    // name: "article",
    data() {
        return {
            title:'',
            createAuthor:'',
            content:'',
            listLoading:true
        }
    },
    created() {
        getOneArticle(this.$route.params.id).then(response => {
            setTimeout(()=>{
                console.log(response)
                this.listLoading = false
                this.title = response.title
                this.createAuthor = response.createAuthor
                this.content = marked(response.content || '');    
            },200)        
        })
    }
}
</script>

<style lang="css">
article{
    margin:auto;
    z-index: 10000;
    
}
.content {
   background-color: lightgoldenrodyellow; 
}

.home_title{
    font-size:3rem;
    font-weight:400;
    color:#404040;
    padding:1rem 0;
}
.home_creatAt{
  font-family: "Comic Sans MS", curslve, sans-serif;
  padding:0.6rem 0;
  font-size: 1.8rem;
  color:#7f8c8d;
  /*background: red;*/
  margin:0;
}
.home_main{
  font-size: 1.6rem;
  line-height: 1.6em;
}
img {
  max-width: 100%;
}
/* .foo >>> img { max-width: 50%; } */

@media screen and (max-width:786px){
  .home_title{
    font-size: 2.2rem;
  }
  .home_creatAt{
    font-size: 1.6rem;
  }
}
@media screen and (max-width:480px){
  .home_main{
    font-size:1.4rem;
    line-height: 1.6em;
  }
}
</style>

