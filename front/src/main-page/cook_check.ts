import {localda} from './localda';

export const check = () => { // true false여부를 확인함 
    if(localda!){
        if(localda.login > 0){
            return false
        } else {
            return true
        }
    } else{
        return true
    }
}