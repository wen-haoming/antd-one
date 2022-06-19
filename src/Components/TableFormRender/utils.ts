export const getSplitCol = (responseObj: Record<string,boolean>) => {
    if(responseObj.xl){
        return 4
    }else if(responseObj.lg){
        return 3
    }else if(responseObj.md){
        return 2
    }else if(responseObj.sm){
        return 1
    }else{
        return 1
    }
}
