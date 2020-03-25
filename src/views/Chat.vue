<template>
    <div class="Chat">
        <div class="chatAside">
            <div class="asdeInput">
                <div class="CardInputContainer">
                    <el-autocomplete
                        v-model="state"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入内容"
                        @select="handleSelect"
                        suffix-icon="el-icon-search"
                    ></el-autocomplete>
                    <i class="GroupChat el-icon-plus"></i>
                </div>
            </div>
            <div class="asideCard">
                <div class="CardContainer">
                    <div class="CardL">
                        <img src="../assets/img1.jpg" alt="头像">
                    </div>
                    <div class="CardM">
                        <div>
                            <h4>Noble</h4>
                            <p>sdsddsds</p>
                        </div>
                    </div>
                    <div class="CardR">
                        <p>14:30</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="chatMain">chatMain</div>
    </div>
</template>

<script>
import {searchRequest , loadRequest} from '../api/chat'
export default {
    name: 'Chat',
    data() { 
        return {
            state:'',
            searchResults:[]
        }
    },
    mounted(){
        this.loadResults()
    },
    methods:{
        loadResults() {
            loadRequest().then((res)=>{
                console.log(res.data)
                this.searchResults = res.data
            })
        },
        //将搜索值传给后端，后端返回数据，通过.then中的callback反馈到界面
        querySearchAsync(queryString, cb) {
            var searchResults = this.searchResults;
            //如果有queryString则传给后端返回数据，否则使用初始加载的数据
            var results = queryString ? this.getSearchResults(queryString) : searchResults;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 1000);
        },
        getSearchResults(queryString){
            searchRequest({
                queryString
            }).then((res)=>{
                //cb必须为数组
                return res.data
            })
        },
        createStateFilter(queryString) {
            return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        //当选择之后触发的事件
        handleSelect(item) {
            console.log(item);
        }
    }
}
</script>
<style lang="scss">
.Chat{
    display: flex;
    .chatAside{
        width: 300px;
        height: 100vh;
        background-color: #EEEAE8;
        .asdeInput{
            width: 100%;
            height: 70px;
            .CardInputContainer{
                margin-top: 30px;
                display: flex;
                justify-content: space-around;
                .el-input__inner{
                    background-color: #DBD9D8;
                }
                .GroupChat{
                    font-size: 40px;
                    border-radius: 10px;
                    background-color: #DBD9D8;
                }
            }
        }
        .asideCard{
            position: relative;
            width: 100%;
            height: 100px;
            // background-color: #CAC7C6;
            .CardContainer{
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 85%;
                height: 70%;
                .CardL,.CardR,.CardM{
                    float: left;
                    height: 100%;
                }
                .CardM{
                    width: calc(100% - 120px);
                    h4,p{
                        margin-left: 10px;
                    }
                    p{
                        margin-top: 20px;
                    }
                }
                .CardR{
                    width: 50px;
                }
                .CardL{
                    width: 70px;
                    img{
                        display: block;
                        width: 70px;
                        height: 70px;
                    }
                }
                p{
                    color: #999999;
                }
            }
        }
        .asideCard:hover{
            background-color: #D8D8D9;
        }
    }
    .main{
        flex: 1;
    }
}
</style>