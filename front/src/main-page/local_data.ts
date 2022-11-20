import { check } from './cook_check'
import { addLocalData, schoolData } from '../login-page/local_data'

if(check()){
    // location.href = '/page/'
    addLocalData(schoolData)
}
