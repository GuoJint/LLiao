<template>
    <div class="myBlog">
        <div class="container">
            <div class="content">
                <el-card class="box-card" v-for="(item,index) in articleList" :key="index">
                    <div slot="header" class="clearfix">
                        <h3>{{item.title}}</h3>
                        <div v-if="flag" class="userAction">
                            <span>置顶</span>
                            <span>编辑</span>
                            <span class="delete">删除</span>
                        </div>
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
            <el-pagination
                class="pagination"
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="totalSize">
            </el-pagination>
        </div>
    </div>
</template>

<script>
// import { articleListRequest } from '../api/articleShow'
export default {
    name: 'MomentsMange',
    data() { 
        return {
            articleList:[],
            totalSize:0,
            pageSize:0,
            flag:true,
        }
    },
    created(){
        // this.getArticleList()
    },
    computed: {
    },
    methods:{
        // getArticleList(){
        //     //初始化加载时接受总共条目数以及一页的条目数
        //     //在参数中传入page数，后端返回对应page数的内容
        //     articleListRequest().then( res => {
        //         this.articleList = res.data.articleList
        //         this.totalSize = res.total
        //         this.pageSize = res.pageSize
        //         console.log(this.articleList)
        //     })
        // }
    }
}
</script>
<style lang="scss">
.myBlog{
    width: 100%;
    .container{
        overflow-y: hidden;
        width: 1000px;
        // height: 200px;s
        margin: 0 auto;
        .content{
            width: 80%;
            .el-card__body{
                padding: 10px;
            }
            .box-card{
                margin-top:20px; 
                .clearfix{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .userAction{
                        span{
                            width: 60px;
                            margin-right: 15px;
                            
                            &::before{
                                margin-right: 3px;
                                color: #909399;
                            }
                            &::after{
                                content:'|';
                                margin: 0 0 0 10px;
                                color: #909399;
                            }
                            &:hover{
                                cursor: pointer;
                            }
                        }
                        span:hover{
                            color: #409EFF;
                        }
                        .delete::after{
                            content:'';
                        }
                    }
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
        .pagination{
            width: 40%;
            margin: 20px auto;
        }
    }
}
</style>