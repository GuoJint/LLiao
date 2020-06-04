<template>
    <div class="Contacts">
        <div  class="ContactsAside">
            <!-- 搜索框 -->
            <div class="asideInput ">
                <div class="CardInputContainer">
                    <el-autocomplete
                        v-model="state"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入内容"
                        @select="handleSelect"
                        suffix-icon="el-icon-search"
                    ></el-autocomplete>
                    <i class="addChat el-icon-plus" @click="dialogVisible = true"></i>
                </div>
            </div>
            <div class="tofixed"></div>
            <!-- 新的朋友 -->
            <div>
                <p  class="classification">新的朋友</p>
                <div ref="newFriend" class="newFriends" @click="addNewFriends">
                    
                    <div class="CardContainer">
                        <div class="CardL">
                            <el-badge :value="newFriendsMSG" :max="99" type="success" :hidden="contactsFlagT">
                                <i class="iconfont">&#xe618;</i>
                            </el-badge>
                        </div>
                        <div class="CardM">
                            <div>
                                <h4>新的朋友</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- A-B筛选内容 -->
            <div id="friendList">
                <div ref="indexListP"  v-for="(items,index) in ContactsList" :key="index">
                    <p  class="classification">{{items.group}}</p>
                    <div 
                    class="asideCard" 
                    :id="item.name"
                    ref=indexList 
                    v-for="(item,index) in items.groupAry" :key="index" 
                    @click="changePeople(item.id,item.nick,item)
                    ">
                        <div class="CardContainer">
                            <div class="CardL">
                                <img :src="item.headUrl" alt="头像">
                            </div>
                            <div class="CardM">
                                <div>
                                    <h4>{{item.nick}}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 弹框添加好友，添加详情，新的朋友 -->
            <div class="dialog">
                <el-dialog
                title="添加好友"
                class="addFriend"
                :visible.sync="dialogVisible"
                width="30%">
                    <el-input v-model="searchContent" placeholder="请以账号或手机号添加"></el-input>
                    <el-button type="success" plain @click="addFriend">添加好友</el-button>
                </el-dialog>
                <el-dialog
                title="用户信息"
                class="userInfo"
                :visible.sync="addUserInfoSure"
                width="30%">
                    <div class="left">
                        <img :src="addUserInfo.headUrl" alt="用户头像">
                        <div>
                            <h4>{{addUserInfo.nick}}</h4>
                            <p>{{addUserInfo.comments}}</p>
                        </div>
                    </div>
                    <div class="right">
                        <p>{{addUserInfo.region}}</p>
                    </div>
                    <div class="submitAdd">
                        <el-input v-model="addmessage" placeholder="请填写备注信息"></el-input>
                        <el-button type="success" plain @click="confirmAdd">点击添加</el-button>
                    </div>
                </el-dialog>
                <el-dialog
                title="新的朋友"
                class="newFriendsDialog"
                :visible.sync="newFriendVsb"
                width="50%">
                    <div v-if="newFriendFlag">
                        <div class="NFVContainer" v-for="(item,index) in friendReq" :key="index">
                            <div class="NFVLeft">
                                <img :src="item.user.headUrl" alt="">
                                <div>
                                    <h6>{{item.user.nick}}</h6>
                                    <p>{{item.message? item.message:"没有备注哦。"}}</p>
                                </div>
                            </div>
                            <div class="NFVRight">
                                <div>
                                    <el-button size="small" type="success" @click="ifAccept(2,item.fromUserid,index)">接受</el-button>
                                    <el-button size="small" type="success" @click="ifAccept(1,item.fromUserid,index)">拒绝</el-button>
                                </div>
                                <p>{{item.createtime}}</p>
                            </div>
                        </div>
                    </div>
                    <div v-else class="newFFlagFalse">
                        <p>暂时没有任何好友请求哦。</p>
                    </div>
                </el-dialog>
            </div>
        </div>
        <div class="ContactsMain">
            <router-view :nowItem="nowItem"></router-view>
        </div>
    </div>
</template>

<script>
import {searchListRequest , searchUserRequest , ContactsListRequest , searchUserConfirm  ,ifAcceptRequest } from '../api/Contacts'
import { mapState , mapMutations} from 'vuex'
export default {
    name: 'Contacts',
    data() { 
        return {
            state:'',
            searchResults:[],
            ContactsList:[],
            ContactsListElse:[],
            selection:'',
            nowItem:'',
            contactsListLoop:'',
            //添加好友系列数据
            dialogVisible: false,
            searchContent:'',
            addUserInfoSure:false,
            addUserInfo:'',
            addmessage:'',
            //新的朋友系列数据
            newFriendVsb:false,
            newFriendFlag: false,
        }
    },
    mounted(){
        // this.loadResults()
        this.getContactsList()
    },
    computed:{
        ...mapState([
            'newFriendsMSG',
            'friendReq'
        ]),
        contactsFlagT:function(){
            if(this.newFriendsMSG <=0){
                return true
            }else{
                return false
            }
        }
    },
    methods:{
        ...mapMutations([
            'SET_FRIENDREQ',
            'SUB_NEWFMSG',
            'SUB_FRIENDREQ'
        ]),
        //获取联系人列表
        getContactsList(){
            ContactsListRequest().then((res)=>{
                // console.log(res)
                if(res.status == 500){
                    this.$message.error(res.msg)
                }else{
                    this.ContactsList = res.friends
                }
            }).catch((err)=>{
                this.$message.error(err)
            })
        },
        //获取搜索框预搜索列biao
        // loadResults() {
        //     loadRequest().then((res)=>{
        //         this.searchResults = res.data
        //     })
        // },
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
            searchListRequest({
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
                this.$refs.newFriend.style.backgroundColor = ""
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
        //点击添加好友
        addFriend(){
            // this.dialogVisibleSure = false
            
            // console.log(this.searchContent)
            searchUserRequest(this.searchContent).then((res)=>{
                console.log(res)
                if(res.status == 200){
                    this.addUserInfo = res.user
                    this.addUserInfoSure = true
                }else{
                    this.$message.error(res.mag)
                }
            })
        },
        //确认添加
        confirmAdd(){
            let id = this.addUserInfo.id
            let nick = this.addUserInfo.nick
            let message = this.addmessage
            searchUserConfirm(id,nick,message).then((res)=>{
                if(res.status == 200){
                    this.$message.success(res.msg)
                    this.addUserInfoSure = false
                }else{
                    this.$message.error(res.msg)
                }
                
            })
        },
        //点击新的朋友
        addNewFriends(){
            if(this.$refs.indexList !== undefined){
                this.$refs.indexList.forEach( item =>{
                    item.style.backgroundColor = ""
                })
            }
            this.$refs.newFriend.style.backgroundColor = "#C9C6C6"
            this.newFriendVsb = true
            
            if(this.friendReq.length > 0){
                this.newFriendFlag = true
            }else{
                this.newFriendFlag = false
            } 
        },
        //接受或拒绝
        ifAccept(status,id,index){
            ifAcceptRequest(id,status).then((res)=>{
                if(res.status == 500){
                    this.$message.error(res.msg)
                }else{
                    this.$message.success(res.msg)
                }
                this.SUB_NEWFMSG()
                this.SUB_FRIENDREQ(index)
            })
        },
    },
    destroyed(){
        clearInterval(this.contactsListLoop)
    }
    
}
</script> 
<style lang="scss">
.Contacts{
    display: flex;
    .ContactsAside{
        &::-webkit-scrollbar {
            width: 10px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #999999;
            // background-image: linear-gradient(160deg,#2e317c,#2983bb,#93b5cf);
            border-radius: 10px;
        }
    //     &::-webkit-scrollbar-track {
    //         background-color: #93b5cf;
    //         // background-image: linear-gradient(160deg,#93b5cf,#2983bb,#2e317c);
    //     }
        overflow-y: scroll;
        width: 300px;
        height: 100vh;
        background-color: #EEEAE8;
        .tofixed{
            width: 283px;
            height: 100px;
        }
        .dialog{
            .userInfo{
                .el-dialog__body{
                    display: flex;
                    flex-wrap: wrap;
                    .left,.right{
                        flex: 1;
                        display: flex;
                    }
                    .left{
                        justify-content: center;
                        align-items: center;
                        img{
                            margin-right: 20px;
                            height: 60px;
                            width: 60px;
                        }
                        div{
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            p{
                                margin-top: 15px;
                            }
                        }
                    }
                    .right{
                        flex-direction: column;
                    }
                    .submitAdd{
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        // align-items: center;
                        .el-input{
                            margin: 10px 0;
                            width: 100%;
                        }
                    }
                }
            }
            .addFriend{
                .el-dialog__body{
                    .el-input{
                        width: 70% !important;
                        margin-right: 10px;
                    }
                }
            }
            .newFriendsDialog{
                .el-dialog__header{
                    border-bottom: 1px solid #E7E7E7;
                }
                .el-dialog__body{
                    .newFFlagFalse{
                        p{
                            text-align: center;
                            color: #B2CCD6;
                            font-size: 17px;
                        }
                    }
                    .NFVContainer{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin: 0 auto;
                        margin-top: 5px;
                        width: 80%;
                        border-bottom: 1px solid #E7E7E7;
                        .NFVLeft,.NFVRight{
                            height: 60px;
                            display: flex;
                            margin-bottom: 5px;
                        }
                        .NFVLeft{
                            width: 60%;
                            img{
                                width: 60px;
                                height: 60px;
                            }
                            div{
                                margin-left: 10px;
                                h6{
                                    font-size: 16px;
                                    margin-bottom: 15px;
                                }
                            }
                        }
                        .NFVRight{
                            flex: 1;
                            align-items: flex-end;
                            flex-direction: column;
                            div{
                                p{
                                    display: inline-block;
                                    margin-right: 15px;
                                }
                            }
                            p{
                                color: #A6A6A6;
                                margin-top: 5px;
                            }
                        }
                    }
                }
            }
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
                .addChat{
                    font-size: 40px;
                    border-radius: 10px;
                    background-color: #DBD9D8;
                }
            }
        }
        .asideCard,.newFriends{
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
                        width: 60px;
                        height: 60px;
                    }
                    i{
                        display: block;
                        font-size: 60px;
                        color: #FA9D3B;
                    }
                }
            }
        }
        .asideCard:hover,.newFriends:hover{
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