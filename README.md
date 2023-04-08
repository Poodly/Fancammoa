# ✨ K-POP 영상, 뉴스, 순위 콘텐츠를 제공합니다! ✨
[<img src="./docs/fancammoa.title.png" width=40%>](https://www.fancammoa.com/)  
이미지를 클릭하면 사이트로 이동 합니다.  
<a href="https://www.fancammoa.com/" target="_blank" style="font-size: 25px;">fancammoa.com</a>

<br>

K-POP 아이돌 팬들을 위한 사이트   
각 아이돌의 직캠, 뮤직비디오, 인터뷰 등을 검색하고 소장해 보세요.  
그리고, 최신 K-POP 뉴스와 순위를 확인하실수 있습니다.  

<br>

## K-POP스타들의 영상을 검색하고 시청해 보세요!
<details>
  <summary>K-POP스타를 검색하고 시청</summary>
  <img src="./docs/fancammoa.search.png" width=100%>
  <img src="./docs/fancammoa.search.modal.png" width=100%>
</details>

<br>

## K-POP스타들의 순위를 확인하세요!
<details>
  <summary>K-POP스타의 순위</summary>
  <img src="./docs/fancammoa.rank.png" width=100%>
  <img src="./docs/fancammoa.rank.modal.png" width=100%>
</details>

<br>

## K-POP스타들의 최신 뉴스를 확인하세요!
<details>
  <summary>K-POP스타의 뉴스</summary>
  <img src="./docs/fancammoa.news.png" width=100%>
</details>

<br>

## K-POP스타들의 영상을 모아보세요!
<details>
  <summary>영상들을 좋아요하여 마이페이지에 모아보세요.</summary>
  <img src="./docs/fancammoa.like.png" width=100%>
  <img src="./docs/fancammoa.like.video.png" width=100%>
</details>

<br>
<br>

## 기술적 의사결정

<br>
<br>

## 트러블슈팅

<details>
  <summary>아이돌 영상검색 및 시청</summary>
  <div markdown="1">
    </br>
    <ul>
      <li>검색결과 문제</li>
      <li>K-POP과 상관없는 검색결과, 유저의 목적과 다른 검색 결과가 같이 검색되는 문제가 발생하였고,
         검색결과 영상의 tag, title, description과 db에 저장되어있는 키워드들을 비교하여 키워드와 맞지 않으면 검색결과를 보여주지 않게 하였다.</li>
    </ul>
      <br>
      <li>APIKEY노출 문제<li>
        <ul>
          <li>유튜브 API KEY 노출등 보안적 이슈로인해 프론트엔드에 있던 검색로직을 백엔드쪽으로 옮겨 로직을 보이지 않게하였으며 .env를 활용하여 API KEY보안 강화</li>    
        </ul>
      <br>
      <li>APIKEY노출 문제<li>
        <ul>
          <li>유튜브 API 할당량 제한 이슈로인해 redis 캐싱작업으로 유튜브API조회 최소화</li>    
        </ul>
  </div>
</details>

<br>

### ~~~

<br>

### ~~~

<br>

### ~~~

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

## 설계

<details>
  <summary><b>ERD</b></summary>
  <div markdown="1">
    <ul>
      <div><img src="./docs/fancammoa.erd.png" width=100%></div>
    </ul>
  </div>
</details>

<details>
  <summary><b>API</b></summary>
  <div markdown="1">
    <ul>
      API
    </ul>
  </div>
</details>

<br>
<br>

## 👨‍🚀 제작자

<br>

| Name: 정성훈 | GitHub: [github.com/poodly](https://github.com/Poodly) | Email: qwe0238@naver.com |
