import { list } from "@keystone-next/keystone/schema";
import { password, relationship, text } from "@keystone-next/fields";

export const User = list({
  //TODO
  //Access
  access: {
    //TODO
  },
  //UI
  ui: {
    //TODO
  },
  //Fields
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
  },
});
