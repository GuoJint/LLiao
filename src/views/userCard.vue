<template>
    <div class="userCard">
            <el-card>
                <div class="CHeader">
                    <div class="CHLeft">
                        <span>{{nowItem.name}}</span>
                        <p>{{nowItem.Sentence}}</p>
                    </div>
                    <img src="../assets/img1.jpg" alt="">
                </div>
                <div class="CMain">
                    <div>
                        <span>备注</span>
                        <p>{{nowItem.marker}}</p>
                    </div>
                    <div>
                        <span>地区</span>
                        <p>{{nowItem.region}}</p>
                    </div>
                    <div>
                        <span>账号</span>
                        <p>{{nowItem.account}}</p>
                    </div>
                </div>
                <div class="CFooter">
                    <el-button type="success">发送消息</el-button>
                </div>
            </el-card>
    </div>
</template>

<script>
export default {
    name: 'userCard',
    props:{
        nowItem:Object
    },
    data() { 
        return {

        }
    }
}
</script>
<style lang="scss">
.userCard{
    width: 100%;
    height: 100vh;
    position: relative;
    .el-card{
        position:absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 70%;
        height: 80vh;
        .CHeader{
            display: flex;
            justify-content: space-around;
            .CHLeft{
                span{
                    font-size: 20px;
                }
                p{
                    margin-top: 20px;
                    font-size: 13px;
                    color: #999999;
                }
            }
            img{
                width: 80px;
                height: 80px;
            }
        }
        .CMain{
            width: 100%;
            height: 45vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            div{
                margin-bottom: 20px;
                span{
                    color: #9999B9;
                    margin-right: 140px;
                }
                p{
                    display: inline-block;

                }
            }
        }
        .CFooter{
            display: flex;
            justify-content: center;
        }
    }
}
</style>