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
}
export default mutations