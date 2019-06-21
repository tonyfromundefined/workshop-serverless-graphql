export default function PageIndex() {
  return (
    <div>
      <h1>📝 할 일 목록</h1>
      <div className='add'>
        <input type='text' />
        <button>추가하기</button>
      </div>
      <Tasks />
      <div>
        AWSKRUG 슬랙 가입하기 😎: <a href='https://slack.awskr.org'>https://slack.awskr.org</a>
      </div>
    </div>
  )
}

function Tasks() {
  return (
    <ul>
      <li>
        <span>id</span>
        {'\u00A0'}|{'\u00A0'}
        <span>content</span>
        {'\u00A0'}
        <span>✔</span>
        {'\u00A0'}
        <button>완료</button>
        <button>삭제</button>
      </li>
    </ul>
  )
}
