import './kakao.css'

export function Kakao_ad_fit() {
    const element = (
        <>
            <ins className="kakao_ad_area"
            style={{
                display:"none"
            }}
            data-ad-unit = "DAN-vi152nWx4gPzYI1E"
            data-ad-width = "300"
            data-ad-height = "250">
            </ins>

            <script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
        </>
    )
     return element
}