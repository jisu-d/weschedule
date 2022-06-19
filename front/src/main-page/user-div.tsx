import './user-div.css';

const localda = JSON.parse(localStorage.getItem('obj'))

export function InfoDiv(){
    const element = (
        <>
        <div>{localda.schoolname}</div>
        <div>
            <span>{localda.year + '학년 '}</span>
            <span>{localda.class + '반'}</span>
        </div>
        </>
    )
    return element
}