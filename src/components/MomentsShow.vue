<template>
    <div class="articleListShow">
        <div class="container">
            <div class="content">
                <el-card class="box-card" v-for="(item,index) in articleList" :key="index">
                    <div slot="header" class="clearfix">
                        <span>{{item.username}}</span>
                        <h3>{{item.title}}</h3>
                        <el-button style="float: right; padding: 3px 0" type="text">>></el-button>
                    </div>
                    <div class="article" >
                        {{item.article}}
                    </div>
                    <div class="bottom" >
                        <time class="time">{{item.time}}</time>
                        <div class="interactive">
                            <span class="good icon iconfont icondianzan3">{{item.good}}</span>
                            <span class="watched el-icon-view">{{item.watched}}</span>
                            <span class="comment el-icon-chat-dot-square">{{item.comment}}</span>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="right">
                <div class="r-box-card1">
                    <span @click="toEdit()">写文章</span>
                    <span>草稿箱</span>
                </div>
            </div>
            
        </div>
        <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="totalSize">
        </el-pagination>
    </div>
</template>

<script>
// import { articleListRequest } from '../api/articleShow'
export default {
    name: 'MomentsShow',
    data() { 
        return {
            articleList:[],
            totalSize:0,
            pageSize:0
        }
    },
    created(){
        this.getArticleList()
    },
    computed: {
    },
    methods:{
        getArticleList(){},
        // getArticleList(){
        //     //初始化加载时接受总共条目数以及一页的条目数
        //     //在参数中传入page数，后端返回对应page数的内容
        //     articleListRequest().then( res => {
        //         this.articleList = res.data.articleList
        //         this.totalSize = res.total
        //         this.pageSize = res.pageSize
        //         console.log(this.articleList)
        //     })
        // },
        toEdit(){
            this.$router.push('/articleEdit')
            console.log('xx')
        }
    }
}
</script>
<style lang="scss">
.articleListShow{
    width: 100%;
    padding-top: 70px;
    .container{
        overflow-y: hidden;
        width: 1000px;
        // height: 200px;s
        margin: 0 auto;
        display: flex;

        .content{
            width: 75%;
            .box-card{
                margin-top:20px; 
                .clearfix{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .article{
                    overflow: hidden;
                    max-height: 65px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp:3;
                }
                .bottom{
                    font-size: 14px;
                    margin-top: 13px;
                    line-height: 12px;
                    .time {
                        color: #999;
                    }
                    .interactive{
                        float: right;
                        span{
                            width: 60px;
                            margin-right: 10px;
                            color: #409EFF;
                            &::before{
                                margin-right: 3px;
                                color: #909399;
                            }
                            &::after{
                                content:'|';
                                margin: 0 0 0 5px;
                                color: #909399;
                            }
                            &:hover{
                                cursor: pointer;
                            }
                        }
                        .good{
                            font-size: 14px;
                        }
                        .comment::after{
                            content:'';
                        }
                    }
                }
            }
        }
        .right{
            flex: 1;
            .r-box-card1{
                padding: 20px;
                margin: 20px 0 10px 5px;
                border: 1px solid #EBEEF5;
                box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                border-radius: 5px;
                display: -webkit-flex;
                justify-content: space-around;
                align-items: center;
                span{
                    cursor:pointer;
                }
            }
        }
    }
    .pagination{
        width: 40%;
        margin: 20px auto;
    }
}
</style>