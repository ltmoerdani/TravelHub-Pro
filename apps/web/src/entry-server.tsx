import { createHandler, renderAsync } from "solid-start/entry-server";
import { StartServer } from "solid-start/entry-server";

export default createHandler(
  renderAsync((event) => {
    return StartServer({
      event,
    });
  })
); 