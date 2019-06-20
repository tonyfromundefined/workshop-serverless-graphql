# 1. GraphQL 살펴보기
### 본 챕터의 학습 목표는 아래와 같습니다. 👏
- GraphQL 이해하기
- Node.js 환경에서 GraphQL 프로젝트 시작하기
-`Schema-First` vs. `Code-First` 개념에 대해 이해하기
- Nexus 문법 익히기

## (1) GraphQL이란?
GraphQL은 API 설계(Schema)와 요청(Query)을 구조화하는 일련의 약속(Interface)입니다. GraphQL을 통해서 우리는 데이터에 기반하여 API를 디자인 할 수 있으며, 클라이언트에서는 정해진 쿼리 언어를 통해 API를 체계적으로 사용 할 수 있습니다.
- 클라이언트는 서버에 필요한 자원만 요청 할 수 있습니다.
- 클라이언트는 서버가 가진 많은 자원을 단 한 번의 요청으로 가져 올 수 있습니다.
- 타입 시스템을 통해 개발 생산성을 비약적으로 향상 시킬 수 있습니다.
- 제공되는 기본 개발자 도구를 통해 API를 쉽게 문서화하고 검색 할 수 있습니다.
- 버전 관리 없이 API를 점진적으로 진화 시킬 수 있습니다.

## (2) GraphQL 타입 시스템과 쿼리, 뮤테이션 타입
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
  username: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}
```

> 참고: `!`는 데이터 값에 `null`이 포함 될 수 없음을 나타냅니다. 기본적으로 `!`는 모두 붙여준다고 생각하는 것이 좋습니다.

API 설계 단에서 다음과 같이 API에 필요한 타입들을 정의 할 수 있습니다. 자 이제 타입을 만들었으니, 해당 타입을 가지는 데이터를 가져올 수 있도록 만들어주어야겠죠?

### 쿼리와 뮤테이션
쿼리와 뮤테이션은 기본적으로 선언되어야 하는 타입입니다.

- 쿼리는 데이터를 가져오는데 사용합니다. 
  - `ID` 속성을 통해 Client 내부에서 Cache를 구현 할 수 있습니다
- 뮤테이션은 데이터를 조작하는데 사용합니다.
  - 생성
  - 수정
  - 삭제
  - ...

이 두가지 타입을 통해 데이터를 가져오고, 수정 할 수 있도록 `Query`, `Mutation` 타입 내에 속성들을 선언해보겠습니다.

#### 예제
```graphql
type User {
  id: ID!
  username: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Query {
  user(id: ID!): User!
  post(id: ID!): Post!
}

type Mutation {
  createUser(username: String!): User!
  updateUser(id: ID!, username: String): User!
  deleteUser(id: ID!): User!
  createPost(title: String!, content: String!, authorId: String!): Post!
  updatePost(id: ID!, title: String, content: String): Post!
  deletePost(id: ID!): Post!
}
```

다음과 같이 `Query`와 `Mutation`에 속성 값으로 필요한 쿼리, 뮤테이션 들을 만들어주었습니다.

### 리졸버
이렇게 멋지게 선언해 준 GraphQL 스키마를 어떻게 구동시킬 수 있을까요? 바로 리졸버가 그 역할을 해줍니다. 리졸버는 타입 내 속성과 1:1로 일치시켜 구현이 필요합니다. 리졸버는 `parent`, `args`를 기본 argument로 하는 함수의 형태입니다.

- `parent`는 상위 리졸버에서 `return` 한 값을 나타냅니다
- `args`는 쿼리문 내에서 넣어준 매개변수를 나타냅니다.
- `context`는 요청 하나를 타고 공유되는 전역 상태입니다. (로그인 세션 정보등을 저장)

#### 예제
```typescript
const User = {
  id: (parent, args, context) => {
    return parent.id
  },
  username: (parent, args, context) => {
    return parent.username
  },
  posts: (parent, args, context) => {
    const userId = parent.id
    const posts = db.table('Post').filter((post) => post.authorId === userId)

    return posts
  },
}

const Post = {
  id: (parent, args, context) => {
    return parent.id
  },
  title: (parent, args, context) => {
    return parent.title
  },
  content: (parent, args, context) => {
    return parent.content
  },
  author: (parent, args, context) => {
    const authorId = parent.authorId
    const user = db.table('User').findOne((user) => user.id === authorId)

    if (user) {
      return user

    } else {
      throw new Error('Author is not found')
    }
  },
}

const Query = {
  user: (parent, args, context) => {
    const userId = args.id
    const user = db.table('User').findOne((user) => user.id === userId)

    if (user) {
      return user

    } else {
      throw new Error('User is not found')
    }
  },
  post: (parent, args, context) => {
    const postId = args.id
    const post = db.table('Post').findOne((post) => post.id === postId)

    if (post) {
      return post

    } else {
      throw new Error('User is not found')
    }
  },
}

const Mutation = {
  createUser: (parent, args, context) => {
    /* 새 유저를 생성해서 데이터베이스에 삽입합니다 */
    return user
  },
  updateUser: (parent, args, context) => {
    /* args.id를 통해 데이터베이스에서 기존 유저를 불러와 값을 수정 한 뒤 데이터베이스에 삽입합니다 */
    return user
  },
  deleteUser: (parent, args, context) => {
    /* args.id를 통해 데이터베이스에서 기존 유저를 삭제합니다 */
    return user
  },
  createPost: (parent, args, context) => {
    /* 새 게시물을 생성해서 데이터베이스에 삽입합니다 */
    return post
  },
  updatePost: (parent, args, context) => {
    /* args.id를 통해 데이터베이스에서 기존 게시물을 불러와 값을 수정 한 뒤 데이터베이스에 삽입합니다 */
    return post
  },
  deletePost: (parent, args, context) => {
    /* args.id를 통해 데이터베이스에서 기존 게시물을 삭제합니다 */
    return post
  },
}
```
> 본 예제 코드에는 이해를 위한 가상의 `db` 변수를 사용했습니다. (실제 동작하지 않은 Pseudo 코드입니다)

### 요청
클라이언트가 다음과 같은 문법으로 서버에 요청을 날릴 수 있습니다.

```graphql
query {
  user(id: "ea9f5eac-1449-5f03-a1c9-6521622de815") {
    id
    username
  }
}
```

이 요청에 응답하기 위해 서버에서
1. `Query.user` 리졸버가 실행됩니다.
2. 데이터베이스에서 User를 가져와서 해당 값을 리졸버 함수 내에서 `return` 합니다
3. `return` 값을 `User.id`, `User.username` 리졸버에 `parent` argument로 넘겨줍니다
    1. `User.id` 리졸버는 `parent`값을 사용해, id 값을 `return` 합니다.
    2. `User.username` 리졸버는 `parent`값을 사용해, username 값을 `return` 합니다.

순으로 리졸버가 실행됩니다. 그 후 결과를 종합해 다음과 같이 JSON으로 응답하여 줍니다.
```json
{
  "user": {
    "id": "ea9f5eac-1449-5f03-a1c9-6521622de815",
    "username": "tonyfromundefined"
  }
}
```

이러한 개발 방식을 GraphQL에서 *Schema-First (SDL-First)* 개발 방식이라고 합니다. 이러한 방식은 처음 GraphQL 구현체가 등장했을 때 많이 사용되었습니다.

하지만, *Schema-First* 개발 방식에는 다음과 같은 한계점이 존재합니다.

1. 스키마 정의와 리졸버 간의 불일치 문제
2. GraphQL 스키마 분리 문제
3. 스키마 정의의 중복 (코드 재사용 문제)
4. IDE 지원 부족 및 개발자 경험
5. Schema 작성 문제

따라서, 이러한 한계점을 효과적으로 해결하기 위해 *Code-First* 개발 방식이 등장하게 되었습니다.

> 참고: [The Problems of "Schema-First" GraphQL Server Development](https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3)

## (3) Nexus로 시작하는 *Code-First* GraphQL 개발
GraphQL에 대해 이해하셨나요? 앞서 말씀드린 Code-First 개발 방법에 대한 구현체로 Nexus라는 오픈소스 라이브러리를 Prisma에서 내놓았습니다.

이 챕터에서는

- Node.js
- TypeScript
- Webpack
- Nexus

를 기반으로 하는 실제 GraphQL 프로젝트를 살펴보겠습니다. 해당 프로젝트는 본 레포 안의 `/starters/server` 폴더 안에서 찾을 수 있습니다.

### 폴더 및 파일 구조



## (4) 'Task' 타입과 쿼리, 뮤테이션 만들기

## (5) GraphQL Playground

---

### 참고 문헌
- [GraphQL 영문 문서](https://graphql.org/)
- [GraphQL 한국어 문서](https://graphql-kr.github.io/learn/schema/#)