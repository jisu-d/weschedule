import { check, currentUser } from './cook_check'

if(check()){
    location.href = '/page/'
} else{
    console.log(currentUser);
    
}