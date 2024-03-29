# ✨ K-POP 영상, 뉴스, 순위 콘텐츠를 제공합니다! ✨
[<img src="./docs/fancammoa.title.png" width=40%>](https://www.fancammoa.com/)  
이미지를 클릭하면 사이트로 이동 합니다.  
<a href="https://www.fancammoa.com/" target="_blank" style="font-size: 25px;">fancammoa.com</a>

<br>

K-POP 아이돌 팬들을 위한 사이트   
각 아이돌의 직캠, 뮤직비디오, 인터뷰 등을 검색하고 소장해 보세요.  
그리고, 최신 K-POP 뉴스와 순위를 확인하실수 있습니다.  

<br>
<br>

## 기능구현

<details>
  <summary>회원가입, 로그인, 유효성 검사</summary>
  <div markdown="1">

  - express-session, passport, joi를 통한 구현   
  - joi 유효성검사: 서버에서 유효성 검사를 간결, 정확하게 수행하고, 서버에 전달되는 데이터의 정확성과 일관성을 보장하기 위해 사용

  </div>
</details>

<br>

<details>
  <summary>아이돌 영상검색 및 시청</summary>
  <div markdown="1">

  - 유튜브 API를 이용하여 검색로직 구하였고 키워드를 통해 K-POP과 상관없는 검색결과를 걸러낼수있도록 구현   

  </div>
</details>
        
<br>

<details>
  <summary>K-POP 순위보기</summary>
  <div markdown="1">

  - Spotify API, Last FM API, 유튜브API 등을 활용하여 저장된 K-POP 가수들의 각종 수치들을 이용해 순위를 산정   

  </div>
</details>

<br>

<details>
  <summary>K-POP 뉴스보기</summary>
  <div markdown="1">

  - 웹 페이지의 동적 로딩 등에 대응하기 위해 Selenium을 이용하여 뉴스픽 사이트 크롤링을 하여 구현   
  - Server side 페이지네이션:  뉴스데이터는 자주 업데이트 되므로  offset이 아니라 cursor페이지네이션을 id순서 기반으로 구현

  </div>
</details>

<br>

<details>
  <summary>K-POP 뉴스보기</summary>
  <div markdown="1">

  - 유저와 영상을 N:M 관계 설정을 통해 CRUD를 적용하여 영상 좋아요 기능을 구현 하였고, 좋아요한 영상들을 모아 볼 수 있습니다.   

  </div>
</details>

<br>

<details>
  <summary>어드민 페이지</summary>
  <div markdown="1">

  - 아이돌 정보, 점수 업데이트: Spotify API, 유튜브 API등을 호출하여 전체, 개인별 점수 업데이트를 할 수 있으며, 아이돌을 CRUD 할 수 있도록 구현     
  - 아이돌 순위 이미지 업데이트: 아이돌 순위 이미지를 CRUD를 통해 업데이트 할 수 있도록 구현  
  - K-POP뉴스 업데이트: Selenium을 이용하여 뉴스픽 사이트 크롤링을 하여 업데이트 할 수 있으며, CRUD를 통해 업데이트   
  - 키워드 업데이트:  CRUD를 통해 업데이트 할 수 있도록 구현  

  </div>
</details>

<br>





</details>

<br>
<br>

## 서비스 아키텍처

<img src="./docs/service.architecture.png" width=100%>

<div>
  <!-- Node.js -->
  <img src="https://img.shields.io/badge/NODE.JS-339933?style=flat-square&logo=NODE.JS&logoColor=white"/>
  <!-- Express -->
  <img src="https://img.shields.io/badge/EXPRESS-000000?style=flat-square&logo=EXPRESS&logoColor=white"/>
  <!-- PM2 -->
  <img src="https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=PM2&logoColor=white"/>
</div>

<div>
  <!-- EJS -->
  <img src="https://img.shields.io/badge/EJS-square&logo=EJS&logoColor=black"/>
  <!-- CSS -->
  <img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS&logoColor=black"/>
  <!-- JS -->
  <img src="https://img.shields.io/badge/JS-F7DF1E?style=flat-square&logo=JS&logoColor=black"/>
</div>

<div>
  <!-- AWS -->
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat-square&logo=Amazon EC2&logoColor=white"/>
  <!-- Axios -->
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
</div>

<div>
  <!-- Redis -->
  <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=Redis&logoColor=white"/>
  <!-- MySQL -->
  <img src="https://img.shields.io/badge/Mysql-4479A1?style=flat-square&logo=Mysql&logoColor=white"/>
  <!-- RDS -->
  <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=flat-square&logo=Amazon RDS&logoColor=white"/>
</div>

<br>
<br>

## 프로젝트 구조

  <summary><b>Back-End (Node.js)</b></summary>
  
```html
📦src
 ┣📂architecture                  
 ┣ ┣📂controllers
 ┣ ┣📂repositories
 ┣ ┗📂services
 ┣📂config                   
 ┣📂middlewares                  
 ┣📂models           
 ┣📂routes
 ┣📂seeders                 
 ┗📜app.js
📦views
 ┣📂static
 ┣ ┣📂css
 ┣ ┗📂js
 ┣📜...
```

<br>
<br>

## ERD 설계

<br>

<img src="./docs/fancammoa.erd.png" width=100%>

<br>
<br>

## API 설계

<br>

<img src="./docs/fancammoa.APIimg.png" width=100%>
<details>
  <summary>API 설계 더 보러가기</summary>
  <div markdown="1">

  <a href="https://www.notion.so/API-cb924349c9ec450384a894e9f456fe14?pvs=4" target="_blank" style="font-size: 25px;">Notion/FancamMoa API</a>

  </div>
</details>

<br>
<br>

## 👨‍🚀 제작자

<br>

| Name: 정성훈 | GitHub: [github.com/poodly](https://github.com/Poodly) | Email: qwe0238@naver.com |
