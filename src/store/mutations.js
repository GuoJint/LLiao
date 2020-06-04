const mutations = {
    SET_NEWFMSG(state,newFriendsMSG){
        state.newFriendsMSG = newFriendsMSG
    },
    SUB_NEWFMSG(state){
        if(state.newFriendsMSG > 0){
            state.newFriendsMSG -= 1
        }
    },
    SET_FRIENDREQ(state,friendReq){
        state.friendReq = friendReq
    },
    SUB_FRIENDREQ(state,index){
        state.friendReq.splice(index,1)
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
    },

    SET_CHATTOTALMSG(state,chatTotalMSG){
        state.chatTotalMSG = chatTotalMSG
    },
    CLEAR_CHATTOTALMSG(state){
        state.chatTotalMSG = 0
    },
    SUB_CHATTOTALMSG(state,subNumber){
        state.chatTotalMSG -= subNumber
    },
    SET_CHAT(state,Chat){
        state.Chat = Chat
    },
    SET_CONTACTS(state,Contacts){
        state.Contacts = Contacts
    },
    SET_NOWITEM(state,nowItem){
        state.nowItem = nowItem
    },
    SET_NOWROUTER(state,nowRouter){
        state.nowRouter = nowRouter
    },
}
export default mutations