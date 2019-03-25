<template>
  <div class="app-container">
    <el-row style="padding:10px 15px;background:#fff">
      <el-col :span="24">
        <el-button size="small" type="primary" @click="createArticle">创建文章</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table style="width:100%" align="center" :data="articleLists" v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column prop="timeStart" min-width="200" label="创建时间"></el-table-column>
          <el-table-column prop="classifyName" min-width="150" label="所属分类"></el-table-column>
          <el-table-column  prop="title" min-width="180" label="文章标题" ></el-table-column>
          <el-table-column  min-width="180" label="操作" >
            <template slot-scope='scope'>
              <!--这里点击查看进入具体页面但是路径中必须带有admin,这时具体页面里会出现评论的删除选项  -->
              <el-button size="small" @click="read(scope.row.id)">查看</el-button>
              <el-button size="small" type='primary' @click="editArticle(scope.row.id)">编辑</el-button>
              <el-button size="small" type='danger' @click="remove(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 50, 100, 500]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="sizeCount">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getArticleList, removeOneArticle} from '@/api/api'
import NProgress from 'NProgress'
import 'nprogress/nprogress.css'
export default {
  name: 'ArticleList',
  data() {
    return {
      articleLists: [{"timeStart":"test","classifyName":"test","title":"test"}],
      pageParam: 1,
      pageSize: 10,
      page: 1,
      sizeCount: this.sizeCount,
      listLoading: false,
    }
  },
  methods: {
    handleSizeChange(val) {
      var json = {};
      json.page = this.pageParam;
      json.pageSize = val;
      this.getLists(json)
    },
    getLists(json) {
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
        this.sizeCount = response.count;
        this.articleLists = response.articleList;
      }).catch(error => {
        console.log(error)
        this.$message({
          message: '异常：' + error,
          type: 'warning',
          duration: 1000
        })
        return;
      })
    },
    handleCurrentChange(val) {
      var json = {};
      json.page = val;
      json.pageSize = this.pageSize;
      this.getLists(json)
    },
    read(id) {
      this.$router.push({path: `/article/${id}`})
    },
    remove(id) {
      this.$confirm('确认要删除吗?','提醒',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type:'waring'
        })
        .then(()=>{
          this.listLoading = true;
          NProgress.start();
          removeOneArticle(id)
            .then(()=>{
              this.listLoading = false
              NProgress.done()
              this.$notify({
                title:'成功',
                message:"删除成功",
                type:'success'
              })
              var json = {};
              json.page = this.pageParam;
              json.pageSize = this.pageSize;
              this.getLists(json)
            })
        }).catch((err) => {
        console.log(err);
      })
    },
    createArticle() {
      this.$router.push({path:'/admin/articleCreate'});
    },
    editArticle(id) {
      this.$router.push({path:`/admin/articleEdit/${id}`});
    }
  },
  mounted() {
    this.$nextTick(function() {
      var json = {};
      json.page = this.pageParam;
      json.pageSize = this.pageSize;
      this.getLists(json)
    })
  }

}
</script>

<style lang="css">
  .page{
    padding:10px;
    background:#fff;
  }
</style>

