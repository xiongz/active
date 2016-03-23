/**
 * Created by zhangkewen on 2015-09-27.
 */
function chainClass(startFunc,endFunc){
    var self = this;
    var commandArr = [];
    var chainData = {};
    var currIndex = 0;
    self.addCommand = function(command){
        commandArr.push(command);
    }
    self.start = function(){
        if(commandArr.length > 0){
            startFunc.call("");
            currIndex = 0;
            self.doNext();
        }else{
            self.doLast();
        }
    }
    self.doNext = function(){
        if(currIndex < commandArr.length){
            //执行下一个
            commandArr[currIndex++].excute(self);
        }else{
            self.doLast();
        }
    }
    /**
     * 执行最后一个
     */
    self.doLast = function(){
        endFunc.call("");
    }
    self.currCommandIndex = function(){
        return currIndex;
    }
    self.getChainShareData = function(){
        return chainData;
    }
    self.chainSize = function(){
        return commandArr.length;
    }
    self.clear = function(){
        commandArr = [];
        chainData = {};
        currIndex = 0;
    }


    return self;
}

function commandClass(excuteFunc){
    var self = this;
    self.excute = function(chain){
        excuteFunc.call("",chain);
    }
    return self;
}


