module.exports = async (thread) => {
    try{
        if(thread.joinable && !thread.joined){
            await thread.join();
        }
    }catch (e){
        console.log(e)
    }
}