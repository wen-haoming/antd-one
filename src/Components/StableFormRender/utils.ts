export const getSplitCol = (responseObj: Record<string,boolean>) => {
    if(responseObj.xl){
        return 6
    }else if(responseObj.lg){
        return 8
    }else if(responseObj.md){
        return 12
    }else if(responseObj.sm){
        return 24
    }else{
        return 24
    }
}
