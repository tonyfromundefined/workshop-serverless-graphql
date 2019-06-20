# 서버리스 GraphQL 워크샵 🍯

## 이런 기술 스택이 사용되었어요 🧐

### 언어 및 환경
- [TypeScript](https://www.typescriptlang.org) 👏
- [Node.js](https://nodejs.org/en/about/)
- [Babel](https://babeljs.io)
- [Webpack](https://webpack.js.org/)
- [Dotenv](https://github.com/motdotla/dotenv)

### API 서버
- [Express.js](https://expressjs.com/ko/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Prisma Nexus](https://nexus.js.org/) 👏
- [Serverless Framework](https://serverless.com)
- [AWS API Gateway](https://aws.amazon.com/ko/api-gateway/)
- [AWS Lambda](https://aws.amazon.com/ko/lambda/)
- [AWS S3](https://aws.amazon.com/ko/s3/)

### Data Loader + ORM
- [Docker](https://www.docker.com/)
- [Prisma](https://www.prisma.io/) 👏
- [AWS Fargate](https://aws.amazon.com/ko/fargate/) 👏

### Database
- [MySQL](https://www.mysql.com/)
- [AWS RDS](https://aws.amazon.com/ko/rds/)

### Web Client
- [React.js](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Apollo Client](https://github.com/apollographql/apollo-client)
- [React Apollo](https://github.com/apollographql/react-apollo)
- [React Apollo Hooks](https://github.com/trojanowski/react-apollo-hooks)
- [GraphQL Code Generator](https://graphql-code-generator.com) 👏
- [MobX 5](https://github.com/mobxjs/mobx)
- [styled-components](https://www.styled-components.com) 👏

### 기타
- [AWS CloudFormation](https://aws.amazon.com/ko/cloudformation/)


##  미리 준비해주세요
### 0. 본 Github Repository를 본인의 컴퓨터에 복사해주세요
중간중간 실습에 필요한 파일들이 업로드 되어있습니다. 세션 시작 전 미리 다운 받아주세요.
- `.zip` 파일로 [다운로드](https://github.com/tonyfromundefined/serverless-graphql-workshop/archive/master.zip)
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


## 자 그럼 이제 시작해볼까요?
1. [GraphQL 살펴보기](/documents/1-graphql)
    1. GraphQL이란?
    2. GraphQL Type 시스템과 `Query`, `Mutation` Type
    3. Nexus로 시작하는 *Code-First* GraphQL 개발
    4. GraphQL Playground
    5. `Task` 타입과 쿼리, 뮤테이션 만들기
2. [Serverless로 GraphQL API 배포하기](/documents/2-serverless)
    1. IAM 사용자 생성하기
    2. Serverless Framework을 사용해 Node.js 프로젝트 배포하기
3. [AWS에 Prisma 배포하기 (CloudFormation)](/documents/3-prisma-on-aws)
4. [Prisma 사용하기](/documents/4-prisma)
    1. Prisma란?
    2. Prisma 시작하기
    3. Prisma Client 사용해보기
    4. `nexus-prisma`를 사용해, Prisma 연결하기
5. [React.js에서 GraphQL 사용하기](/documents/5-react-graphql)
6. [삭제하기](/documents/6-delete)
    1. API 배포 삭제하기
    2. CloudFormation Stack 삭제하기

## 할 일
Feature Request를 원하시면, 새 이슈를 생성해주세요. 또한, Pull Request는 언제나 환영입니다.🙏

---

### Cheatsheets
- [완성된 서버 프로젝트](/cheatsheet/server)
- [완성된 클라이언트 프로젝트](/cheatsheet/client)
