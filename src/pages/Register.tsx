import React, { useEffect, useState } from "react";
import { Container, Form, Button, Segment } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { REGISTER } from "@/queries";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registering, result] = useMutation(REGISTER, {
    variables: {
      username,
      password,
    },
  });

  useEffect(() => {
    if (result.data !== undefined) {
      localStorage.setItem("jwtToken", result.data.register.token);
      // console.log(`result.data`, result.data.register.token);
    }
  }, [result.data]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    registering();
  };

  return (
    <Container>
      <h1>Register form</h1>
      <Form onSubmit={handleRegister}>
        {/* <Segment stacked> */}
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password..."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" className="ui button teal fluid large" />
        {/* <Button color="teal" fluid size="large">
          Register
        </Button> */}
        {/* </Segment> */}
      </Form>
    </Container>
  );
};

export default Register;
