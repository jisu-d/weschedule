import { Datai } from '../../../public/type';
import { localda } from '../Search-page/local_data'
import './Table.css'
import { proxy } from "../proxy";

const day = ['월', '화', '수', '목', '금'] as const;

// const da = await (await fetch(`${proxy}/comciganData?school=${localda.schoolname}&Year=${localda.year}&class=${localda.class}&zeroOne=0`)).json() as Datai;
const da = await (await fetch(`${proxy}/comciganData?school=${'새솔고등학교'}&Year=${1}&class=${1}&zeroOne=0`)).json() as Datai;

const makeTable = (arr:[string, string][], key:number) => <tr key={key * 6}><td>{key + 1}</td>{arr.map((v, i) => {
    if(v){
        return (<td key={i + 1 + key * 6}>{v[0]}<br />{v[1]}</td>)
    } else {
        return(<td key={i + 1 + key * 6}></td>)
    }
})}</tr>

const makeTableAll = (size:number) => {
    const arr:JSX.Element[] = [];
    for(let i = 0; i < size; i++){
        arr.push(makeTable(day.map(v => da[v][i]), i)) 
    }
    return arr;
}

const firstTable = () => {
    const arr:JSX.Element[] = []
    day.map((v, i) => arr.push(<td key={`first-${i}`}>{v}</td>))
    
    return(
        <tr>
            <td></td>
            {arr}
        </tr>
    )
}

export function Table(props:{size:number}){
    return (
        <>
        <div className="title">시간표</div>
        <table>
            <tbody>
                {firstTable()}
                {makeTableAll(props.size)}
            </tbody>
        </table>
        </>
    )
}