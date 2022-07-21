// 576 미만(xs), 576이상(sm), 768이상(md), 992이상(lg), 1200이상(xl), 1400이상(xxl)
const size = {
  mobile : '650px',
  tablet : '992px',
}

const theme = {
  mobile : `(max-width:${size.mobile})`,
  tablet : `(max-width:${size.tablet})`,
  titleFont : 'UhBeeJJIBBABBA', // 제목 폰트
  questionFont : 'KyoboHand', // 아이에게 하고 싶은 말 폰트
  namingFont : 'Katuri', // 아이 이름, 로그인 화면 안내말 폰트
  standardFont : 'GmarketSansMedium'
}

export default theme;