import './helpful_test.css';
import { ME } from '../../../public/type';


const helpful: ME = await (await fetch('https://api.qwer.pw/request/helpful_text?apikey=guest')).json()
export function MyoungEonDiv() {
    return(
        <div>
            <div className='title d'>오늘의 명언</div>
            <div>
                {helpful[1].respond}
            </div>
        </div>
    )
}