import { stackMiddlewares } from "@/middlewares/stackHandler";
import { withAuth } from "@/middlewares/withAuth";

const middlewares = [withAuth];
export default stackMiddlewares(middlewares);
