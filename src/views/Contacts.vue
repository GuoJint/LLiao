<template>
    <div class="Contacts">
        <div class="ContactsAside">
            <div class="asideInput ">
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
            <div class="tofixed"></div>
            <!-- #中的内容 -->
            <div>
                <p class="classification">#</p>
                <div 
                class="asideCard" 
                ref=indexListElse 
                v-for="(item,index) in ContactsListElse" :key="index" 
                @click="changePeopleElse(item.userID,index,item)
                ">
                    <div class="CardContainer">
                        <div class="CardL">
                            <img :src="item.img" alt="头像">
                        </div>
                        <div class="CardM">
                            <div>
                                <h4>{{item.name}}</h4>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- A-B筛选内容 -->
            <div v-for="(items,index) in ContactsList" :key="index">
                <p class="classification">{{String.fromCharCode(index+65)}}</p>
                <div 
                class="asideCard" 
                :id="item.name"
                ref=indexList 
                v-for="(item,index) in items" :key="index" 
                @click="changePeople(item.userID,item.name,item)
                ">
                    <div class="CardContainer">
                        <div class="CardL">
                            <img :src="item.img" alt="头像">
                        </div>
                        <div class="CardM">
                            <div>
                                <h4>{{item.name}}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ContactsMain">
            <router-view :nowItem="nowItem"></router-view>
        </div>
    </div>
</template>

<script>
import {searchRequest , loadRequest , ContactsListRequest , ContactsListRequestElse} from '../api/Contacts'
import { mapState } from 'vuex'
export default {
    name: 'Contacts',
    data() { 
        return {
            state:'',
            searchResults:[],
            ContactsList:[],
            ContactsListElse:[],
            selection:'',
            nowItem:''
        }
    },
    mounted(){
        this.loadResults()
        this.getContactsList()
    },
    computed:{
        ...mapState([
            'userID'
        ])
    },
    methods:{
        //获取联系人列表
        getContactsList(){
            ContactsListRequest(this.userID).then((res)=>{
                this.ContactsList = res.data
            })
            ContactsListRequestElse(this.userID).then((res)=>{
                this.ContactsListElse = res.data
            })
        },
        //获取搜索框预搜索列表
        loadResults() {
            loadRequest().then((res)=>{
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
        },
        changePeople(userID,name,item){
            //当点击同一次路由后不执行  此时通过route获取的userid为点击之前的所以当没有重复点击时userid也不同
            if(userID != this.$route.params.userID){
                this.nowItem = item
                this.$refs.indexList.forEach(item => {
                    if(item.id == name)  {
                        item.style.backgroundColor = "#C9C6C6"
                    }else{
                        item.style.backgroundColor = ""
                    }
                });
                this.$router.push(`/Contacts/${userID}`)
            }
        },
        changePeopleElse(userID,index,item){
            //当点击同一次路由后不执行  此时通过route获取的userid为点击之前的所以当没有重复点击时userid也不同
            if(userID != this.$route.params.userID){
                //indexList为ref数组
                this.nowItem = item
                this.$refs.indexListElse.forEach(item => {
                    item.style.backgroundColor = ""
                });
                this.$refs.indexListElse[index].style.backgroundColor = "#C9C6C6"
                this.$router.push(`/Contacts/${userID}`)
            }
        }
    }
}
</script>
<style lang="scss">
.Contacts{
    display: flex;
    .ContactsAside{
        overflow-y: scroll;
        width: 300px;
        height: 100vh;
        background-color: #EEEAE8;
        .tofixed{
            width: 283px;
            height: 100px;
        }
        .asideInput{
            position: fixed;
            z-index: 10;
            width: 283px;
            height: 100px;
            background-color: #EEEAE8;
            .CardInputContainer{
                margin: 30px 0;
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
                    h4{
                        line-height: 70px;
                        margin-left: 20px;
                    }
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
                    font-size: 14px;
                    color: #999999;
                }
            }
        }
        .asideCard:hover{
            background-color: #DEDCDB;
        }
        .classification{
            margin-left: 20px;
            color: #999999;
            cursor: default;
        }
    }
    .ContactsMain{
        flex: 1;
    }
}
</style>