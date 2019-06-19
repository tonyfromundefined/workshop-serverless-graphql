# 1. GraphQL 살펴보기
### 본 챕터의 학습 목표는 아래와 같습니다. 👏
- GraphQL 이해하기
- Node.js 환경에서 GraphQL 프로젝트 시작하기
- `SDL-First` vs. `Code-First` 개념에 대해 이해하기
- Nexus 문법 익히기

## (0) GraphQL
GraphQL은 API 설계(Schema)와 요청(Query)을 구조화하는 일련의 약속(Interface)입니다. GraphQL을 통해서 우리는 데이터 기반의 API를 디자인 할 수 있으며, 클라이언트에서는 정해진 쿼리 언어를 통해 API를 체계적으로 사용 할 수 있습니다.
- 클라이언트는 서버에 필요한 자원만 요청 할 수 있습니다.
- 클라이언트는 서버가 가진 많은 자원을 단 한 번의 요청으로 가져 올 수 있습니다.
- 타입 시스템을 통해 개발 생산성을 비약적으로 향상 시킬 수 있습니다.
- 제공되는 기본 개발자 도구를 통해 API를 쉽게 문서화하고 검색 할 수 있습니다.
- 버전 관리 없이 API를 점진적으로 진화 시킬 수 있습니다.

## (1) GraphQL 타입 시스템과 쿼리, 뮤테이션 타입
GraphQL의 기본 타입에는 다음 5가지가 존재합니다.

- `Int`: 부호가 있는 32비트 정수.
- `Float`: 부호가 있는 부동소수점 값.
- `String`: UTF-8 문자열.
- `Boolean`: `true` 또는 `false`.
- `ID`: `ID` 스칼라 타입은 객체를 다시 요청하거나 캐시의 키로써 자주 사용되는 고유 식별자를 나타냅니다. `ID` 타입은 String 과 같은 방법으로 직렬화되지만, `ID`로 정의하는 것은 사람이 읽을 수 있도록 하는 의도가 아니라는 것을 의미합니다.

#### 예제

`User`와 `Post`라는 타입을 스키마에 선언해볼까요?

```graphql
type User {
  id: ID!
  createdAt: String!
  updatedAt: String!
  username: String!
  displayName: String!
  email: String!
  isConfirmed: Boolean!
  posts: [Post!]!
}

type Post {
  id: ID!
  createdAt: String!
  updatedAt: String!
  title: String!
  content: String!
  author: User!
}
```

> 참고: `!`는 데이터 값에 `null`이 포함 될 수 없음을 나타냅니다. 기본적으로 `!`는 모두 붙여준다고 생각하는 것이 좋습니다.

API 설계 단에서 다음과 같이 API에 필요한 타입들을 정의 할 수 있습니다. 자 이제 타입을 만들었으니, 해당 타입을 가지는 데이터를 가져올 수 있도록 만들어주어야겠죠?

### 쿼리와 뮤테이션
쿼리와 뮤테이션은 기본적으로 선언되어야 하는 타입입니다. 이 두가지 타입을 통해 데이터를 가져 올 수 있도록 속성들을 선언해보겠습니다.

#### 예제
```graphql
type User {
  id: ID!
  createdAt: String!
  updatedAt: String!
  username: String!
  displayName: String!
  email: String!
  isConfirmed: Boolean!
  posts: [Post!]!
}

type Post {
  id: ID!
  createdAt: String!
  updatedAt: String!
  title: String!
  content: String!
  author: User!
}

type Query {
  user(id: ID!): User!
  users: [User!]!
  post(id: ID!): Post!
  posts: [Post!]!
  unconfirmedUsers: [User!]!
}

type Mutation {
  createUser(username: String!, displayName: String!, email: String!): User!
  updateUser(id: ID!, username: String, displayName: String, email: String): User!
  deleteUser(id: ID!): User!
  createPost(title: String!, content: String!, authorId: String!): Post!
  updatePost(id: ID!, title: String, content: String): Post!
  deletePost(id: ID!): Post!
}
```

다음과 같이 `Query`와 `Mutation`에 속성 값으로 필요한 쿼리, 뮤테이션 들을 만들어주었습니다.

### 리졸버
이렇게 멋지게 선언해 준 GraphQL 스키마를 어떻게 구동시킬 수 있을까요? 바로 리졸버가 그 역할을 해줍니다. 리졸버는 `타입` 내 `속성`과 1:1로 일치시켜 구현이 필요합니다. 리졸버는 `parent`, `args`를 기본 argument로 하는 함수의 형태입니다.

- `parent`는 상위 리졸버에서 `return` 한 값을 나타냅니다
- `args`는 쿼리문 내에서 넣어준 매개변수를 나타냅니다.
- `context`는 요청 하나를 타고 공유되는 전역 상태입니다. (로그인 세션 정보등을 저장)

#### 예제
```typescript
const User = {
  id: (parent, args, context) => {},
  createdAt: (parent, args, context) => {},
  updatedAt: (parent, args, context) => {},
  username: (parent, args, context) => {},
  displayName: (parent, args, context) => {},
  email: (parent, args, context) => {},
  isConfirmed: (parent, args, context) => {},
  posts: (parent, args, context) => {},
}

const Post = {
  id: (parent, args, context) => {},
  createdAt: (parent, args, context) => {},
  updatedAt: (parent, args, context) => {},
  title: (parent, args, context) => {},
  content: (parent, args, context) => {},
  author: (parent, args, context) => {},
}

const Query = {
  users: (parent, args, context) => {},
  posts: (parent, args, context) => {},
  unconfirmedUsers: (parent, args, context) => {},
}

const Mutation = {
  createUser: (parent, args, context) => {},
  updateUser: (parent, args, context) => {},
  deleteUser: (parent, args, context) => {},
  createPost: (parent, args, context) => {},
  updatePost: (parent, args, context) => {},
  deletePost: (parent, args, context) => {},
}
```

### 요청
클라이언트가 다음과 같은 쿼리를 서버로 날린다고 가정합시다.

```graphql
query {
  user(id: "ea9f5eac-1449-5f03-a1c9-6521622de815") {
    id
    username
    displayName
    isConfirmed
  }
}
```

이 요청에 응답하기 위해 서버에서
- `Query.user`가 실행됩니다.
- `return` 값을 `User.id`, `User.username`, `User.displayName`, `User.isConfirmed`에 `parent`에 넘겨줍니다
  - `User.id`는 `parent`값을 사용해, 값을 `return` 합니다.
  - `User.username`가 `parent`값을 사용해, 값을 `return` 합니다.
  - `User.displayName`가 `parent`값을 사용해, 값을 `return` 합니다.
  - `User.isConfirmed`가 `parent`값을 사용해, 값을 `return` 합니다.

순으로 리졸버가 실행됩니다. 그 후 결과를 종합해 다음과 같이 JSON으로 응답하여 줍니다.
```json
{
  "user": {
    "id": "ea9f5eac-1449-5f03-a1c9-6521622de815",
    "username": "tonyfromundefined",
    "displayName": "Tony Won",
    "isConfirmed": true
  }
}
```

이러한 개발 방식을 GraphQL에서 *Schema-First* 개발 방식이라고 합니다. 이러한 방식은 처음 GraphQL 구현체가 등장했을 때 많이 사용되었습니다.

하지만, 몇가지 한계점이 존재하여, *Code-First* 개발 방식이 등장하게 되었습니다.

> 참고: [The Problems of "Schema-First" GraphQL Server Development](https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3)

## (2) Nexus로 시작하는 *Code-First* GraphQL 개발

## (3) 'Task' 타입과 쿼리, 뮤테이션 만들기

## (4) GraphQL Playground

---

### 참고 문헌
- [GraphQL 영문 문서](https://graphql.org/)
- [GraphQL 한국어 문서](https://graphql-kr.github.io/learn/schema/#)