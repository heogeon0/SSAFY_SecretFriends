import { Wrapper } from "./styles";

function NotFound404 () {
  return (
    <Wrapper>
      <div className="title">404</div>
      <div className="error">Not Found</div>
      <div className="content">요청하신 페이지를 찾을 수 없습니다.</div>
    </Wrapper>
  )
}

export default NotFound404;