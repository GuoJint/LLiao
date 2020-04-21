const mutations = {
    SET_NEWFMSG(state,newFriendsMSG){
        state.newFriendsMSG = newFriendsMSG
    },
    CLEAR_NEWFMSG(state){
        state.newFriendsMSG = 0
    },
    SET_FRIENDREQ(state,friendReq){
        state.friendReq = friendReq
    },
    SET_WS(state,WS){
        state.WS = WS
    },
    SET_MYHEADIMG(state,myHeadImg){
        state.myHeadImg = myHeadImg
    },
    SET_MYNICK(state,myNick){
        state.myNick = myNick
    },
    SET_MSGTRANSFER(state,msgTransfer){
        state.msgTransfer = msgTransfer
    },
    SET_CHATMSG(state,chatMsg){
        state.chatMsg = chatMsg
    },
    CLEAR_CHATMSG(state){
        state.chatMsg = ''
    }
}
export default mutations