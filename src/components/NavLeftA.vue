<template>
    <div class="NavLeftA">
        <img class="HeadPortrait" :src="myHeadImg" alt="头像" @click="userInfoVSB = true">
        <i class="iconfont" :class="Chat" @click="toChat">&#xe624;</i>
        <el-badge :value="newFriendsMSG" :max="99" type="success" :hidden="contactsFlag">
            <i class="iconfont" :class="Contacts" @click="toContacts">&#xe605;</i>
        </el-badge>
        <i class="iconfont" :class="WechatMoments" @click="toWechatMoments">&#xe61f;</i>
        <i class="iconfont setting" @click="userInfoVSB = true">&#xe643;</i>
        <div class="myDrawer">
            <el-drawer
            title="个人信息"
            :before-close="handleClose"
            :visible.sync="userInfoVSB"
            direction="rtl"
            custom-class="demo-drawer"
            ref="drawer"
            >
            <div class="demo-drawer__content">
                <div class="demo-image__preview">
                    <el-image 
                        style="width: 100px; height: 100px"
                        :src="url" 
                        :preview-src-list="srcList">
                    </el-image>
                </div>
                <el-form :model="form">
                    <el-form-item label="昵称:" label-width="80px">
                        <el-input v-model="form.name" autocomplete="off" :placeholder="nick"></el-input>
                    </el-form-item>
                    <el-form-item label="个性签名:" label-width="80px">
                        <el-input v-model="form.qm" autocomplete="off" :placeholder="qm"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号:" label-width="80px" >
                        <el-input v-model="form.phone" autocomplete="off" :placeholder="phone"  disabled></el-input>
                    </el-form-item>
                    <el-form-item label="性别:" label-width="80px">
                        <el-select v-model="form.sex" :placeholder="sex">
                            <el-option label="男" value="shanghai"></el-option>
                            <el-option label="女" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="block">
                    <el-cascader
                        v-model="value"
                        :options="options"
                        @change="handleChange"
                        placeholder="所在区域">
                    </el-cascader>
                </div>
                <div class="demo-drawer__footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button type="primary">确定</el-button>
                </div>
            </div>
            </el-drawer>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NavLeftA',
    data() { 
        return {
            nowRouter:'',
            Chat:'',
            Contacts:'',
            WechatMoments:'',
            //用户信息设置
            userInfoVSB:false,
            options:[{
                value: 'China',
                label: '中国',
                children:[
                    {
                        value:'shanxi',
                        label:'山西',
                    }
                ]
            }],
            form:{
                name:'',
                qm:'',
                sex:''
            },
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [
            'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
            'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ],
            sex:'',
            nick:'',
            qm:'',
            phone:13720904717
        }
    },
    mounted(){
        this.getNowRouter()
    },
    computed:{
        ...mapState([
            "newFriendsMSG",
            "myHeadImg"
        ]),
        contactsFlag:function(){
            if(this.newFriendsMSG <=0){
                return true
            }else{
                return false
            }
        }
    },
    methods:{
        getNowRouter(){
            // console.log(this.$route.name)
            this.nowRouter = this.$route.name
            this.changeColor()
        },
        changeColor(){
            if(this.nowRouter == "Chat"){
                this.Chat = 'active'
                this.Contacts = 'none'
                this.WechatMoments = 'none'
            }else if(this.nowRouter == "Contacts"){
                this.Chat = 'none'
                this.Contacts = 'active'
                this.WechatMoments = 'none'
            }else if(this.nowRouter == "WechatMoments"){
                this.Chat = 'none'
                this.Contacts = 'none'
                this.WechatMoments = 'active'
            }
        },
        toChat(){
            if(this.nowRouter !== 'Chat'){
                this.nowRouter = 'Chat'
                this.changeColor()
                this.$router.push('/Chat')
            }
        },
        toContacts(){
            if(this.nowRouter !== 'Contacts'){
                this.nowRouter = 'Contacts'
                this.changeColor()
                this.$router.push('/Contacts')
            }
        },
        toWechatMoments(){
            if(this.nowRouter !== 'WechatMoments'){
                this.nowRouter = 'WechatMoments'
                this.changeColor()
                this.$router.push('/WechatMoments/MomentsShow')
            }
        },
        //设置用户信息
        handleClose(){
            this.userInfoVSB = false
        }
    },
    watch:{
    }
}
</script>
<style lang="scss">
.NavLeftA{
    height: 100%;
    background-color: #27282C;
    position: relative;
    .el-badge{
        margin: 0 40px 35px 40px;
        i{
            display: block;
            cursor: pointer;
            color: #7F7F80;
            font-size: 40px;
            margin: 0;
        }
        .active{
            color: #07C160;
        }
    }
    i{
            display: block;
            cursor: pointer;
            color: #7F7F80;
            font-size: 40px;
            margin: 0 40px 35px 40px;
        }
    .HeadPortrait{
        width: 70px;
        height: 70px;
        margin: 35px 25px;
    }
    .setting{
        margin: 0;
        position: absolute;
        bottom: 20px;
        left: 40px;
    }
    .active{
        color: #07C160;
    }
    .myDrawer{
        .demo-drawer__content{
            .demo-image__preview{
                .el-image{
                    margin-left: 150px;
                }
                i{
                    display: inline-block;
                    cursor: pointer;
                    color: #fff;
                    font-size: 30px;
                    margin: 0;
                }
            }
            .el-form{
                .el-form-item__content{
                    .el-input{
                        width: 250px;
                        .el-input__inner{
                            border: none;
                        }
                    }
                }
                .el-select{
                    width: 150px;
                    .el-input{
                        width: 100px;
                        // border: 1px solid #DCDFE6;
                        .el-input__inner{
                            text-align: center;
                        }
                        .el-select__caret{
                            margin: 0;
                        }
                    }
                }
                
            }
        }
        .demo-drawer__footer{
            margin-top: 100px;
            display: flex;
            justify-content: space-around;
        }
    }
}
</style>