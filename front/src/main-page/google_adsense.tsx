import './google_adsense.css';

export function AdsensebyGoogleDiv() {
    return (
        <>
            <div className='title'>오늘의 정보</div>
            <div>
                <ins className="adsbygoogle"
                    data-ad-layout="in-article"
                    data-ad-format="fluid"
                    data-ad-client="ca-pub-6211769300139830"
                    data-ad-slot="5189642459"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({ });
                </script>
            </div>
        </>
    )
}