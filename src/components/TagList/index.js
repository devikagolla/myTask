import {List} from './styledComponents'

const TagList = props => {
  const {details, onClickTag} = props
  const {optionId, displayText} = details

  const onClickButton = () => {
    onClickTag(optionId)
  }

  return (
    <List key={optionId}>
      <button type="button" onClick={onClickButton}>
        {displayText}
      </button>
    </List>
  )
}

export default TagList
