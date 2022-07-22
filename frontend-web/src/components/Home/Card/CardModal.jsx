import "./styles.css"

function CardModal (props) {
  function closeModal () {
    props.closeModal();
  }
  console.log(props.children)
  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody" onClick={(event) => event.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeModal}>닫기</button>
        {props.children}
      </div>
    </div>
  )
}

export default CardModal;