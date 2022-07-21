import styled from "styled-components";

const Form = styled.form`
  width: 95%;
  max-width: 500px;
  margin: auto;
  div {
    display: grid;
    grid-template-columns: minmax(80px, 1fr) 10fr;
    margin: 10px;
    gap: 10px;
    label {
      text-align: right;
    }
  }
`;

function SignUp() {
  return (
    <>
      <Form>
        <div>
          <label htmlFor="email">E-Mail : </label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input type="password" />
        </div>
      </Form>
    </>
  );
}

export default SignUp;
