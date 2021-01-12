const users = [
  { email: 'kim@test.com', password: '123', name: 'Kim' },
  { email: 'lee@test.com', password: '456', name: 'Lee' },
  { email: 'park@test.com', password: '789', name: 'Park' },
];

type userProps = {
  email: string;
  password: string;
};

const signIn = ({ email, password }: userProps): userProps | undefined => {
  const user = users.find(
    user => user.email === email && user.password === password,
  );
  if (user === undefined) throw new Error();
  return user;
};

export default signIn;
