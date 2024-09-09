import { Routes, Route } from 'react-router-dom';
import { Company } from '../page/Company';
import { Home } from '../page/Home';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies/:id" element={<Company />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;