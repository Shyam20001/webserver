import { Hono } from "hono";
import { FC } from "hono/jsx";

const mycomp = new Hono();

// Component for the main page with a form
const Mypage: FC = () => {
  return (
    <div>
      <h1>This is My component</h1>
      <form method="POST" action="/sw/data">
        <input type="text" name="data" placeholder="Enter some data" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// Handler for GET request to render the main page
mycomp.get("/", (c) => c.html(<Mypage />));

export default mycomp;
