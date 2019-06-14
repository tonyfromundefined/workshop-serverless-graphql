# 서버리스 GraphQL 워크샵 🍯

## 본 실습 세션의 학습 목표는 아래와 같습니다. 👏
- Serverless Framework을 활용해, Apollo Server를 API Gateway와 Lambda를 사용하여 배포한다.
- RDS를 사용해 MySQL DB를 구성한다.
- Fargate를 활용해 Prisma를 배포한다.

## 이런 기술 스택이 사용되었어요 🧐
### AWS 서비스
- AWS API Gateway
- AWS Lambda
- AWS S3
- AWS RDS
- AWS Fargate

### API
- Node.js
- Express.js
- Apollo Server
- Prisma Nexus

### Data Layer with ORM
- Prisma

### Database
- MySQL

##  미리 준비해주세요
### 0. 본 Github Repository를 본인의 컴퓨터에 복사해주세요
중간중간 실습에 필요한 파일들이 업로드 되어있습니다. 세션 시작 전 미리 다운 받아주세요.
- `.zip` 파일로 [다운로드](https://github.com/tonyfromundefined/ausg-seminar-2018/archive/master.zip)
- 또는
  ```bash
  $ git clone https://github.com/tonyfromundefined/serverless-graphql-workshop
  ```

### 1. PC 또는 Mac
본 세션은 코딩 과정이 포함되어 있습니다. 또한 CLI(Command Line Interface) 조작이 꼭 필요합니다. 모바일 환경(iPhone, iPad, Android)에서는 진행이 불가능하니 꼭 PC/Mac 환경에서 진행하세요.

### 2. AWS 계정
- AWS 계정 만들기 [이동](https://aws.amazon.com/ko/)

본 가이드는 한명이 하나의 AWS 계정을 사용한다고 가정합니다. AWS API Gateway, Lambda, ECS, RDS, S3, CloudWatch에 접근할 수 있어야 하며, 다른 사람과 계정을 공유하게 되면 특정 리소스에 대해 충돌이 발생 할 가능성이 있으므로 권장하지 않습니다.

#### [중요] 본 워크샵에서 사용하는 'AWS Fargate' 서비스는 **과금**됩니다. 실습이 끝나고 바로 삭제하세요.

**AWS Fargate를 제외한** 본 워크샵의 일환으로 시작하는 모든 리소스는 AWS 계정이 12개월 미만인 경우, 제공하는 AWS 프리티어로 충분히 가능합니다. 단, 사용량이 프리티어를 넘어서는 경우, 과금 될 수도 있습니다. 따라서, 새로운 실습용 계정을 만드시길 권장합니다. 자세한 내용은 [AWS 프리 티어 페이지](https://aws.amazon.com/free/)를 참조하세요.

### 3. 웹 브라우저
- Chrome 최신 버전 [다운로드](https://www.google.com/chrome/)

> Internet Explorer는 AWS Web Console에서 문제가 발생 할 수 있습니다.

### 4. 텍스트 에디터
- VS Code [다운로드](https://code.visualstudio.com/)

본 실습 세션에는 실제 코딩이 포함됩니다. 세션 발표자는 VS Code를 사용하니, 코딩에 익숙하지 않으신 분은 따라하기 쉽도록 환경을 동일하게 설정해주세요.

### 5. Node.js
- Node.js 최신 버전 [다운로드](https://nodejs.org/en/)

### 6. AWS CLI
- AWS CLI 설치하기 [다운로드](https://aws.amazon.com/ko/cli/)


# 자 그럼 이제 시작해볼까요?
1. GraphQL API 프로젝트 코드 살펴보기
    1. Nexus로 시작하는 *Code-First* GraphQL 개발
    2. GraphQL Playground
2. Serverless로 API 배포하기
    1. IAM User 설정하기
    2. Serverless Framework을 사용해 API 배포하기
3. AWS RDS로 MySQL DB 설정하기
4. AWS Fargate에 Prisma Server 배포하기
    1. Prisma란 무엇인가요?
    2. Fargate로 Prisma Docker Image 배포하기
    3. Prisma로 데이터 모델 정의하기
5. API에서 Fargate 사용하기
    1. Prisma Client 사용해보기
    1. `nexus-prisma`를 사용해, Prisma 연결하기
6. 클라이언트 React 프로젝트에서 API 사용하기
    1. GraphQL Code Generator
7. 삭제하기
    1. API 배포 삭제하기
    2. Prisma 삭제하기
    3. RDS 삭제하기

# 할 일
기능 추가를 원하시면, 새 이슈를 생성해주세요. 또한, Pull Request는 언제나 환영입니다.🙏
