# SendU REST API 문서
## 서버 기본 정보
 OS
 >Linux Ubuntu

 Cloud Service
 >Microsoft Azure

VM name
> SendUKor

DB VM SSH Authentication Info
>Ip : 104.41.183.65
>UserName : sendu
>PW : SendUKor1234

## User Manage API (port 3000)

### 토큰 인증 불필요한 API
//REST 권고 사항에 따라 GET, POST, DELETE 재설정
#### GET /users/signin (로그인 API)

**params**

//암호화 구현 예정

userName : 유저이름

password : 비밀번호

**return value**

인증 정보가 DB에 존재하지 않을 경우 :
{
isSucces : false,
message: 'Authentication failed. User not found.'
}

인증 성공할 경우 : 토큰값 반환
{
isSucces: true,
message: 'Enjoy your token!',
token: token
}

중복된 이메일이 존재할 경우
{
success : false,
message : 'Email already exists!'
}

**토큰 유효 시간은 24시간**

#### POST /users/signup/(db에 데이터 추가)

**params**

//유저 정보는 지속적으로 추가할 예정

username : 유저 이름

password : 비밀번호

email : 유저 이메일

age : 유저 나이

**return value**

데이터가 이미 존재할 경우 :
409
{isSucces: false, message : 'Data Already Exists!'}


성공적으로 DB에 데이터를 저장했을 때 :
201
가입된 유저 정보 반환

### 토큰 인증이 필요한 API(/api/*)

**params**
token : /users/signin 에서 전달받은 토큰

/api/* 인증에 실패할 경우 :
{ isSuccess: false, message: 'Failed to authenticate token.' }

이메일로 유저 정보 검색

### GET /users/?q=[email]

q=[email]을 붙이지 않은 경우:
400

이메일에 따른 유저 정보가 존재하지 않는 경우 :
404

이메일에 따른 유저 정보가 존재하는 경우: 
200


유저 정보 반환
ex)

~~~
{
  "_id": "5871a775f88b8e6b15373e69",
  "userName": "박영훈",
  "password": "sendu1234",
  "email": "jm8qBQvIwAR9POPwXhoxOaqaAB83",
  "numAddress": "51268",
  "address": "경상남도 창원시 마산합포구 완월남6길 5-1 청구빌 201호",
  "__v": 0
}
~~~

### Resource API (/resources/*)

이미지 주소 및 약관 등을 제공합니다.

### GET /resources/images/main

엽서 배경 이미지들의 aws s3 주소를 리턴

~~~
[
  {
    "main1": "https://s3.ap-northeast-2.amazonaws.com/cardbackground2/main1.png"
  },
  {
    "main2": "https://s3.ap-northeast-2.amazonaws.com/cardbackground2/main2.png"
  },
  {
    "main3": "https://s3.ap-northeast-2.amazonaws.com/cardbackground2/main3.png"
  }
]
~~~

### GET /resources/userTerms

이용약관 리턴

### 개발용 API

### GET /debug/users

**return value**
모든 유저 정보를 json 형태로 반환

### OrderManagement API 

### POST /orders/{email}

엽서 주문하기

**body**

~~~
  {
	"email" : "1234",
	"orderUUID" : "jpark",
	"orderDate" : "12",
	"receiverName" : "ParkJesung",
	"address" : "ansan",
	"numAddress" : "94",
	"text" : "안녕",
	"img" : "s3"
}
~~~

### GET /orders/{email}

유저가 주문한 엽서들의 정보를 반환



## sendu.kr 서버 정보
OS
>Ubuntu 14

Cloud Service
>Microsoft Azure

VMName
>SendUKor

VM SSH Authentication Info
>Host : sendu.kr
>
>UserName : ubuntu
>
>Password : SendUKor1234
>

Programming Language

>Java (Using Tomcat)

>Node.js

>Nginx
