import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotFound from "../Pages/NotFound";
import TaskList from "../Pages/TaskList";

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
