![view1](https://github.com/user-attachments/assets/39378723-8f17-4c24-82a9-e21a17f76537)# 프론트 프로젝트
피그마로 주어진 디자인을 정적 구현합니다

## 목차
- [개요](#개요)
- [기능](#기능)
- [문제상황](#문제상황)
- [마치며](#마치며며)

## 개요
- 시멘틱한 HTML을 고려합니다.
- CSS 연습을 진행합니다
- JavaScript의 연습을 진행합니다.
- 확장성을 고려하여 모듈화를 진행하였습니다.

  ```mermaid
		graph TD
  A[페이지 접속] --> B{대문페이지}
  B --> |loadHTML| C[헤더페이지]
  B --> |loadHTML| D[메인페이지]
  B --> |loadHTML| F[푸터페이지]
  
  ```

## 배포
- vercel을 사용한 배포
- https://front-figma-4zw0189rm-yoons-projects-799152d4.vercel.app/

## 기능
- 주소값을 받아 좌표값을 받아오는 api, 좌표값을 기반으로 지도와, 마커를 생성
- 스크롤 이벤트 처리
- 정규식을 활용하여 1차적인 email 유효성 검사를 진행합니다.

  ```mermaid
		sequenceDiagram
	    client->>+kakaoAPI: 주소정보요청(adress)
	    kakaoAPI->>+client: 주소정보응답(resolve)
	    client-->>-kakaoAPI: 좌표지점의지도요청(x,y)
      kakaoAPI->>+client: 해당지도파싱(map)
      client-->>-kakaoAPI: 마킹요청(x,y)
      kakaoAPI->>+client: 마킹반환(map)
  ```
  
  ```mermaid
		stateDiagram-v2
      [*]  --> 이벤트_감지
	    이벤트_감지 --> 요소_확인
	    요소_확인 --> 기능_동작
	    기능_동작 --> 성공
	    성공 --> [*]
  ```

## 화면

<table>
	<tr>
		<th>헤더</th>
		<th>중간글</th>
		<th>갤러리</th>
	</tr>
 	<tr>
		<td><img src="/img/view1.png" width="100%"></td>
		<td><img src="/img/view2.png" width="100%"></td>
		<td><img src="/img/view3.png" width="100%"></td>
	</tr>
  <tr>
		<th>지도</th>
		<th>모달</th>
		<th>푸터</th>
	</tr>
  	<tr>
		<td><img src="/img/view4.png" width="100%"></td>
		<td><img src="/img/view5.png" width="100%"></td>
		<td><img src="/img/view6.png" width="100%"></td>
	</tr>
</table>


## 문제상황
-확장성을 고려하여 모듈화하기 위해 header와 main footer로 분리한 뒤 index 파일로딩이 끝난 후 파싱을 시도했습니다.
- 문제 -> await을 사용하여 파싱을 먼저 끝냈지만 api 호출 시 DOM 에 등록되기 전에 요소를 찾음 
 - 해결 -> 주소로 좌표값을 구하는 api를 먼저 호출시킨 다음 x,y 값을 구하여 시간과 원화는 좌표값을 설정
-문제 -> 비동기 통신으로 파싱했기 때문에 요소를 찾지 못함, 이벤트 감지가 안됨
 - 해결 -> 이벤트를 위임하여 이벤트가 발생한 타겟과 매치하여 맞을 때 감지하도록 함수 구현
-문제 -> 스크롤시 마다 이벤트를 감지해야하기 때문에 성능적으로 좋지 않음
 - 미해결 ->  쓰로틀링을 사용하였지만 limit 시간을 줄여봐도 원활이 작동이 되지 않는 상황
-문제 -> vercel로 배포 하였지만 해당 페이지에서 api 호출 에러 발생
-   미해결 -> env 파일 등록, kakao 플렛폼에 url 추가 및 여러 시도하였지만 실패
-문제 -> css 및 html 자체의 부족한 실력으로 똑같이 구현하지 못함 
 - 미해결 -> 앞으로 더 많은 노력이 필요함을 느낌

## 마치며
CSS와 HTML이 부족한 것을 알고있지만 디자인 감각이 없다는 핑계로 외면하고 있었습니다. 이번 계기로 부족하지만 그래도 전보다 친해질 수 있는 계기가 되었고,
다시한번 부족함을 인지할 수 있는 계기가 되었습니다. 앞으로 더욱 발전하며, 좋은 프로젝트를 진행할 수 있는 역량을 키울 수 있도록 정진하겠습니다.
