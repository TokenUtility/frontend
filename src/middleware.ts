import { stackMiddlewares } from "@/middlewares/stackHandler";

import { withComingSoon } from "@/middlewares/withComingSoon";

const middlewares = [withComingSoon];
export default stackMiddlewares(middlewares);
