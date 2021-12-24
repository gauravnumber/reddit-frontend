import { useState, useEffect } from "react";
import { Message, Container, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { CREATE_SUBREDDIT } from "@/queries";

const CreateSubreddit = () => {
  const [subredditName, setSubredditName] = useState("");
  const [errorCreateSubreddit, setErrorCreateSubreddit] = useState("");
  const [confirm, setConfirm] = useState("");

  const [createSubreddit, result] = useMutation(CREATE_SUBREDDIT, {
    variables: {
      name: subredditName,
    },
    onError: (err) => {
      setErrorCreateSubreddit(err.graphQLErrors[0].message);
      console.log(`err`, err.graphQLErrors[0].message);
      // setConfirm("");
      // console.log(`err`, err.message);
    },
  });

  useEffect(() => {
    if (result.data !== undefined) {
      console.log(`result.data`, result.data.setSubreddit.name);
      setConfirm(result.data.setSubreddit.name);
    }
  }, [result.data]);

  const handleCreateSubreddit = (e: React.FormEvent) => {
    e.preventDefault();
    createSubreddit();
    setErrorCreateSubreddit("");
    setConfirm("");
    // console.log(`result.data`, result.data);
  };

  return (
    <Container>
      <Form onSubmit={handleCreateSubreddit} size="large">
        <Form.Input
          fluid
          placeholder="Create your own subreddit..."
          onChange={(e) => setSubredditName(e.target.value)}
        />
        <button className="ui button teal large">Create subreddit</button>

        {errorCreateSubreddit && (
          <Message content={errorCreateSubreddit} color="red" />
        )}
        {confirm && (
          <Message
            content={`Subreddit: ${confirm}. Created Successfully.`}
            color="green"
          />
        )}
        {/* <Message error>
          <p>{errorCreateSubreddit}</p>
        </Message> */}
      </Form>
    </Container>
  );
};

export default CreateSubreddit;
