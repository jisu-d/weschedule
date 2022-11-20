import { localda } from '../local_data'


const check = () => { // true false여부를 확인함
    if(!localda){
        location.href = '/login/'
    }else if (localda.year <= 0){
        location.href = '/login/'
    }
}

check()