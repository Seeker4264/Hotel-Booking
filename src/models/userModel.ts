enum gender {
  "male",
  "female",
  "unknown"
};

export interface user {
  "first_name": string;
  "last_name": string;
  "username": string;
  "email": string;
  "gender": gender;
};
