import { User } from "../models/index";
import { response } from "../utils/helper";

export const handler = async (event: any, context: any) => {
  const { sub } = event?.requestContext?.authorizer?.claims;

  let user: any = {};

  user = await User.findOne({
    where: {
      uuid: sub,
    },
  });

  return response(200, user);
};