type Credentials = {
  email: string;
  password: string;
  role?: string;
};

const validUser: Credentials = {
  email: "standard_user@test.com",
  password: "secret_sauce",
  role: "standard",
};

function getLoginUrl(env: string): string {
  return `https://${env}.example.com/login`;
}

export { validUser, getLoginUrl };
