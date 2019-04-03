<template lang="html">
    <div class="home_wrapper" v-loading="listLoading" element-loading-text="加载中">
        <article v-for='item in items'>
            <header>
                <div>
                    <router-link :to="{path:`/show/article/${item.id}`}" class="article_title">{{item.title}}</router-link>
                </div>
                <div>
                    <p class="article_creatAt">{{item.createAuthor}}</p>
                </div>
            </header>
            <footer>
                <router-link class="article_readMore" :to="{path:`/show/article/${item.id}`}">阅读全文</router-link>
            </footer>
        </article>
        <footer class='loadMore' v-if='loadMoreShow'>
            <el-button type="primary" :loading="loadMoreFlag" @click='loadMore'>{{loadMoreText}}</el-button>
        </footer>
    </div>
</template>

<script>
import {getArticleList} from '@/api/api'
// import marked from 'marked';
export default {
    name: "home",
    data() {
        return {
            items:[],
            listLoading: true,
            loadMoreFlag: false,
            loadMoreText: '加载更多',
            loadMoreShow: false,
            page:1,
            limit: 10
        }
    },
    components: {

    },
    methods: {
        loadMore() {
            this.loadMoreText = '加载中'
            this.loadMoreFlag = true
            this.page++
            this.loadData(this.page, this.limit)
        },
        loadData(page, limit) {
             var json = {};
            json.page = page;
            json.pageSize = limit;
            console.log(json)
            getArticleList(json).then(response => {
                console.log(response);
                if (!response || response.length == 0) {
                    this.$message({
                        message: '结果为空',
                        type: 'warning',
                        duration: 1000
                    })
                    return;
                }
                setTimeout(()=>{
                    // marked(response.articleList.content || '')
                    this.items = this.items.concat(response.articleList)
                    this.listLoading=false
                    if(page * limit < response.articleCount) {
                        this.loadMoreShow = true
                        this.loadMoreFlag =  false
                        this.loadMoreText = '加载更多'
                    } else {
                        this.loadMoreShow = false
                    }
                },200)
            }).catch(error => {
                console.log(error)
                this.$message({
                message: '异常：' + error,
                type: 'warning',
                duration: 1000
                })
                return;
            })
        }
    },
    mounted() {
        // 封装成一个方法，与分页获取文章列表类似
        this.$store.dispatch('changeHeadLine','主页')
        this.loadData(1,this.limit)
    }
}
</script>

<style lang="css" scoped>
h2,h4{
    margin:0;
}
.home_wrapper{
  z-index: 100000;
  margin:auto;
  list-style: none;
  cursor: pointer;
  background-color: lightgoldenrodyellow;
}
.home_wrapper article{
  /* padding-bottom: 1rem; */
  border-bottom:1px solid #d2d2d2;
  /* margin-bottom: 2rem; */
}

.article_title{
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
  color:#404040;
  padding:.4rem 0;
}
.article_creatAt{
  font-family: "Comic Sans MS", curslve, sans-serif;
  font-size: 1.5rem;
  color:#7f8c8d;
  margin: 0;
}
.article_main{
  font-size: 1.5rem;
  color:#34495e;
  line-height: 1.6em;
  /*padding:0.6rem 0;*/
}
footer{
  text-align: right;
}
.article_readMore{
  font-size: 1.5rem;
  color:#919191;
  font-weight: 600;
}
.loadMore {
  margin:4rem 0 0 0;
  display: flex;
  display: webkit-flex;
}
.loadMore button {
  cursor: pointer;
  outline:none;
  padding:1rem;
  margin:auto;
  border-radius:.5rem;
  color:rgba(0, 0, 0, 1);
  border:1px solid #bfcbd9;
    background-color: #f7f7f7;
}
.article_title:hover{
  opacity: 0.5;
}
.article_readMore:hover{
opacity: 0.6;
}
@media screen and (max-width:786px){
  .article_title{
    font-size: 1.8rem;
    line-height: 1.5em;
  }
  .article_creatAt{
    font-size: 1.4rem;
  }
  .loadMore{
    margin: 3rem 0  .8rem 0;
  }
}
@media screen and (max-width:480px){
  .article_main{
    font-size:1.4rem;
  }
  .article_readMore{
    font-size: 1.8rem;
  }
}

</style>
