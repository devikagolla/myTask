import {List} from './styledComponents'

const TaskList = props => {
  const {details} = props
  const {id, input, activeTagName} = details

  return (
    <List key={id}>
      <p>{input}</p>
      <p>{activeTagName}</p>
    </List>
  )
}

export default TaskList
