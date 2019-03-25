<template lang="html">
    <el-row>
        <el-col :span="24">
            <el-form ref="articleCreate" :model="article" :rules="createRules" v-loading="listLoading">
                <el-row style="margin-top:20px">
                    <el-col :span="10" :push="1">
                        <el-form-item label="文章标题" label-width="90px" prop="title">
                            <el-input v-model="article.title" style="width:260px" placeholder="请在此处输入标题"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :push="3">
                        <el-form-item label="所属分类" label-width="90px" prop="classify">
                            <el-select v-model="article.classifyName" placeholder="请选择分类">
                                <el-option v-for="(item, index) in classifyList" :key="index" :label="item.classifyName" :value="item.classifyName"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin-top:20px">
                    <el-col :span="12">
                        <el-form-item class="show" prop="content">
                            <el-input type="textarea" v-model="article.content" :rows="25" placeholder="请在此处编辑文章"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <div style="background:#fff;margin:0 0 0 20px;height:526px;overflow-y:auto;" v-html="markedToHtml" class="article"></div>
                    </el-col>
                </el-row>
                <el-form-item style="padding:20px 20px 0 0">
                    <el-button type="primary" style="float:right" size="small" @click="editArticle" :loading="load">{{btnText}}</el-button>
                    <el-button style="float:right;margin-right:10px" size="small" @click="cancle">返回</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import {getOneArticle,editArticle,getClassify} from '@/api/api'
    import marked from 'marked';
    import hlj from 'highlight.js'
    import 'highlight.js/styles/atom-one-dark.css'
    import NProgress from 'NProgress'
    import 'nprogress/nprogress.css'

    export default {
        data() {
            return {
                article: {
                    id: '',
                    title: '',
                    classifyName: '',
                    content: ''
                },
                classifyList: [],
                createRules: {
                    title: [{required: true, message: '请填写标题', trigger: 'blur'}],
                    content: [{required: true, message: '请输入内容', trigger: 'blur'}],
                    classifyName: [{
                        required: true,
                        message: '请选择分类',
                        trigger: 'change'
                    }]
                },
                load: false,
                btnText: '立即更新',
                listLoading: false
            }
        },
        computed: {
            markedToHtml() {
                marked.setOptions({
                    highlight: function(code) {
                        return hlj.highlightAuto(code).value;
                    }
                });
                return marked(this.article.content);
            }
        },
        methods: {
            editArticle() {
                var articleMap = {
                    id: this.article.id,
                    title: this.article.title,
                    classifyName: this.article.classifyName,
                    content: this.article.content
                }
                editArticle(articleMap).then(response => {
                    this.article.id = response.id
                    this.article.classifyName = response.classifyName
                    this.article.title = response.title
                    this.article.content = response.content
                })
                // this.$refs.articleCreate.validate(valid => {
                //     console.log(valid)
                //     if (valid) {
    
                //     }
                // })
            },
            initial() {
                this.listLoading = true
                NProgress.start();
                setTimeout(() => {
                    NProgress.done();
                    this.listLoading = false
                    getOneArticle(this.$route.params.postId).then(response => {
                                this.article.id = response.id
                                this.article.classifyName = response.classifyName
                                this.article.title = response.title
                                this.article.content = response.content
                        })
                    getClassify().then(response => {
                                this.classifyList = response
                        })
                }, 500)
    
            },
            // 取消
            cancle() {
                this.$router.push({path: '/admin/articleList'});
            }
        },
        computed: {
            markedToHtml() {
                marked.setOptions({
                    highlight: function(code) {
                        return hlj.highlightAuto(code).value;
                    }
                });
                return marked(this.article.content);
            }
        },
        mounted() {
            this.initial()
        }
    }
</script>
<style lang="css" >
</style>