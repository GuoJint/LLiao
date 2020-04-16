<template>
    <div class="chatRoom" @click="test">
        <el-container>
            <el-header>
                <p>{{nowItem.user.nick}}</p>

            </el-header>
            <el-main>
                <div class="Left">
                    <div class="LContainer">
                        <img src="../assets/img1.jpg" alt="">
                        <p>天天天郭晋廷</p>
                    </div>
                </div>
                <div class="Right">
                    <div class="RContainer">
                        <p>少时诵诗书</p>
                        <img src="../assets/img1.jpg" alt="">
                    </div>
                </div>
                
            </el-main>
            <el-footer>
                <div class="tools">
                    <div class="toolLeft">
                        <i class="iconfont">&#xe613;</i>
                        <i class="el-icon-folder-opened"></i>
                        <i class="el-icon-scissors"></i>
                        <i class="el-icon-chat-dot-round"></i>
                    </div>
                    <div class="toolRight">
                        <i class="iconfont">&#xe659;</i>
                        <i class="iconfont">&#xe617;</i>
                    </div>
                </div>
                <el-input
                id="sendmsgBykey"
                type="textarea"
                resize="none"
                v-model="textarea"
                >
                </el-input>
                <button class="sendButton" @click="sendByClick">发送消息</button>
            </el-footer>
        </el-container>
        
    </div>
</template>

<script>
export default {
    name: 'chatRoom',
    props:{
        nowItem:Object,
        ws:Object
    },
    data() { 
        return {
            userID:'',
            textarea:''
        }
    },
    mounted(){
        this.submit()
    },
    methods:{
        test(){
            console.log(this.$route.params.userID)
        },
        submit(){
            document.getElementById('sendmsgBykey').addEventListener('keydown',(event)=>{
                if(event.ctrlKey &&event.keyCode ==13){
                    console.log(this.ws)
                    this.ws.onopen = function(){
                        this.ws.send(this.textarea)
                    }
                }
            })
        },
        sendByClick(){
            this.ws.onopen = function(){
                this.ws.send(this.textarea)
            }
        }
    },
    watch:{
        $route:function(val){
            this.userID = val.params.userID
        }
    }
}
</script>
<style lang="scss">
.chatRoom{
    height: 100vh;
    display: flex;
    .el-header{
        background-color: #F5F5F5;
        height:100px !important;
        border-bottom: 1px solid #E7E7E7;
        p{
            line-height: 100px;
            font-size: 20px;
        }
    }
    .el-main{
        flex: 1;
        background-color: #F5F5F5;
        .Left{
            margin-top:10px;
            width: 100%;
            height: 40px;
            .LContainer{
                float: left;
                display: flex;
                img{
                    width: 40px;
                    height: 40px;
                }
                p{
                    background-color: #FFFFFF;
                    font-size: 18px;
                    height: 20px;
                    padding: 10px;
                    margin-left: 15px;
                    border-radius: 5px;
                }
            }
        }
        .Right{
            margin-top:10px;
            width: 100%;
            height: 60px;
            .RContainer{
                float: right;
                display: flex;
                img{
                    width: 40px;
                    height: 40px;
                }
                p{
                    background-color: #98E165;
                    font-size: 18px;
                    height: 20px;
                    padding: 10px;
                    margin-right: 15px;
                    border-radius: 5px;
                }
            }
        }
    }
    .el-footer{
        height: 200px !important;
        position: relative;
        .tools{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 50px;
            i{
                font-size: 20px;
                margin: 0 10px;
                color: #767676;
                cursor: pointer;
            }
        }
        .el-textarea{
            .el-textarea__inner{
                height: 150px;
                padding: 5px 10px;
                border: none;
                color: #000000;
                font-size: 18px;
            }
        }
        .sendButton{
            position: fixed;
            right: 20px;
            bottom: 20px;
            width: 80px;
            height: 30px;
            background-color: #F5F5F5;
            border: 1px solid #E5E5E5;
        }
        .sendButton:hover{
            background-color: #98E165;
        }
    }
}
</style>