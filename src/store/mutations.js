const mutations = {
    SET_NEWFMSG(state,newFriendsMSG){
        state.newFriendsMSG = newFriendsMSG
    },
    CLEAR_NEWFMSG(state){
        state.newFriendsMSG = 0
    }
}
export default mutations