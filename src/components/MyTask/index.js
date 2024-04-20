import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import TagList from '../TagList'

import TaskList from '../TaskList'

import {
  Container,
  LeftContainer,
  RightContainer,
  Button,
  Heading,
} from './styledComponents'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTask extends Component {
  state = {
    textInput: '',
    taskList: [],
    activeTag: tagsList[0].optionId,
    selectTag: '',
  }

  onChangeInput = event => {
    this.setState({textInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({activeTag: event.target.value})
  }

  onClickTag = id => {
    this.setState(prev => ({selectTag: prev.selectTag === id ? '' : id}))
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {textInput, activeTag} = this.state
    const newTask = {
      id: uuidv4(),
      input: textInput,
      activeTagName: activeTag,
    }

    this.setState(prev => ({
      taskList: [...prev.taskList, newTask],
      textInput: '',
      activeTag: tagsList[0].optionId,
    }))
  }

  render() {
    const {taskList, textInput, activeTag, selectTag} = this.state
    const filterList =
      selectTag === ''
        ? taskList
        : taskList.filter(each =>
            each.activeTagName.toLowerCase().includes(selectTag.toLowerCase()),
          )
    return (
      <Container>
        <LeftContainer>
          <Heading>Create a task!</Heading>
          <form onSubmit={this.onSubmitForm}>
            <div>
              <label htmlFor="task">Task</label>
              <input
                id="task"
                type="text"
                value={textInput}
                placeholder="Enter the task here"
                onChange={this.onChangeInput}
              />
            </div>
            <div>
              <label htmlFor="select">Tags</label>
              <select
                id="select"
                value={activeTag}
                onChange={this.onChangeOption}
              >
                {tagsList.map(each => (
                  <option value={each.optionId}>{each.displayText}</option>
                ))}
              </select>
            </div>
            <Button type="submit">Add Task</Button>
          </form>
        </LeftContainer>
        <RightContainer>
          <h1>Tags</h1>
          <ul>
            {tagsList.map(each => (
              <TagList
                details={each}
                key={each.optionId}
                onClickTag={this.onClickTag}
              />
            ))}
          </ul>
          <h1>Tasks</h1>
          {filterList.length > 0 ? (
            <ul>
              {filterList.map(each => (
                <TaskList details={each} key={each.id} />
              ))}
            </ul>
          ) : (
            <p>No Tasks Added Yet!</p>
          )}
        </RightContainer>
      </Container>
    )
  }
}
export default MyTask
