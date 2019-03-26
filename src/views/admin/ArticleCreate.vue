<template lang="html">
  <el-row>
    <el-col :span="24">
      <el-form ref="articleCreate" :model="article" :rules="createRules">
        <el-row style="margin-top: 20px">
          <el-col :span="10" :push="1">
            <el-form-item label="文章标题" label-width="90px" prop="title">
              <el-input v-model="article.title" style="width:260px" placeholder="请在此处输入标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :push="3">
            <el-form-item label="所属分类" label-width="90px" prop="classify">
              <el-select v-model="article.classifyName" placeholder="请选择分类">
                <el-option v-for="index in classifyList" :key="index" :label="index" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <el-col :span="12">
            <!-- 编辑区 -->
            <el-form-item class="show" prop="content">
              <el-input type="textarea" v-model="article.content" :rows="25" placeholder="请在此处编辑文章"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 展示区 -->
            <div style="backgroup:#fff;margin:0 0 0 20px;height:526px;overflow-y: auto;" v-html="markedToHtml" class="article"></div>
          </el-col>
        </el-row>
        <el-form-item style="padding: 20px 20px 0 0">
          <el-button type="primary" style="float:right" size="small" @click="createArticle" :loading="load">{{btnText}}</el-button>
          <el-button style="float:right;margin-right: 10px" size="small" @click="cancle" :loading="load">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import {createArticle, getClassify} from '@/api/api'
import marked from 'marked';
import hlj from 'highlight.js'
import  'highlight.js/styles/atom-one-dark.css'
export default {
  data() {
    return {
      article: {
        classifyName:'', //文章所属分类
        title: '', //文章标题
        content: '' //文章内容
      },
      classifyList: [],
      createRules: {
        title: [
          {required: true, message: '请填写标题', trigger: 'blur'}
        ],
        content: [
          { required: true, message:'请输入内容', trigger: 'blur'}
        ],
        classify: [
          { required: true, message: '请选择分类', trigger: 'change'}
        ]
      },
      load: false,
      btnText: '立即发布'
    }
  },
  methods: {
    createArticle() {
      var articleMap = {
          title: this.article.title,
          classifyName: this.article.classifyName,
          content: this.article.content
      }
      createArticle(articleMap).then(response => {
          this.article.id = response.id
          this.article.classifyName = response.classifyName
          this.article.title = response.title
          this.article.content = response.content
      })
    },
    // 取消
    cancle(){
      this.$router.push({path:'/admin/articleList'});
    }
  },
   
  computed:{
    markedToHtml(){
      marked.setOptions({
        highlight: function (code) {
        return hlj.highlightAuto(code).value;
        }
      });
      // console.log(this.article.content);
      return marked(this.article.content);
    }
  },
  mounted(){
      getClassify().then(response => {
            this.classifyList = response
        })
  }
}
</script>
<style lang="css" >
</style>