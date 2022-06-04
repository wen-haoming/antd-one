export const getSplitCol = (responseObj: Record<string,boolean>) => {
    if(responseObj.lg){
        return 5
    }else if(responseObj.md){
        return 4
    }else if(responseObj.sm){
        return 3
    }else if(responseObj.xl){
        return 2
    }else{
        return 1
    }
}