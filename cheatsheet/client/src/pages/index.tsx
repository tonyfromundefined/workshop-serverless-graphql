import { useState } from 'react'
import {
  IGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from '~/generated/graphql'

export default function PageIndex() {
  const [content, setContent] = useState('')

  const { error, loading, data, refetch } = useGetTasksQuery()
  const createTask = useCreateTaskMutation()

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value)
  }

  const onAddButtonClick = async () => {
    await createTask({
      variables: {
        data: {
          content,
          isDone: false,
        },
      },
    })
    await refetch()
  }

  return (
    <div>
      <h1>📝 할 일 목록</h1>
      <div className='add'>
        <input type='text' value={content} onChange={onInputChange} />
        <button onClick={onAddButtonClick}>추가하기</button>
      </div>
      <Tasks
        error={error}
        loading={loading}
        data={data}
        refetch={refetch}
      />
      <div>
        AWSKRUG 슬랙 가입하기 😎: <a href='https://slack.awskr.org'>https://slack.awskr.org</a>
      </div>
    </div>
  )
}

interface ITasksProps {
  error: any
  loading: boolean
  data?: IGetTasksQuery
  refetch: () => any
}
function Tasks(props: ITasksProps) {
  const updateTask = useUpdateTaskMutation()
  const deleteTask = useDeleteTaskMutation()

  if (props.error) {
    return (
      <div>error</div>
    )
  }

  if (props.loading || !props.data || !props.data.tasks) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <ul>
      {props.data.tasks.map((task) => {
        const onCompleteButtonClick = async () => {
          await updateTask({
            variables: {
              data: {
                isDone: true,
              },
              where: {
                id: task.id,
              },
            },
          })
          await props.refetch()
        }

        const onDeleteButtonClick = async () => {
          await deleteTask({
            variables: {
              where: {
                id: task.id,
              },
            },
          })
          await props.refetch()
        }

        return (
          <li key={task.id}>
            <span>{task.id}</span>
            {'\u00A0'}|{'\u00A0'}
            <span>{task.content}</span>
            {task.isDone && <span>{'\u00A0'}✔</span>}
            {'\u00A0'}
            <button onClick={onCompleteButtonClick}>완료</button>
            <button onClick={onDeleteButtonClick}>삭제</button>
          </li>
        )
      })}
    </ul>
  )
}
