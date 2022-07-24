# 시간표 보여주는 시스템

### 기능
- 컴시간 알리미 데이터를 이용해서 현재 날짜의 시간표를 보여줌
- 그 날짜의 급식 정보를 알 수 있음.
- 랜덤 명언을 볼 수 있음.

### API List
- [랜덤 명언](https://api.qwer.pw/docs/helpful_text)
- [나이스 급식식단정보](https://open.neis.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=OPEN17320190722180924242823&infSeq=2#none)
- 컴시간 데이터 파싱

### 사용한 프레임워크
#### sever
- [Fastify](https://www.fastify.io/)
  - [Fastify Cors](https://www.npmjs.com/package/@fastify/cors/v/8.0.0)
    다른 도메인에서 서버에 요청이 가능하도록 하기 위해서 사용함.

### 개발 언어 
- Typescript / React

### 넣을 고민중인 기능들
- 날씨
    - 오늘은 우산이 필요해요.
    - 
- 명언 삭제 고민..