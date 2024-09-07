import { Routes, Route } from 'react-router-dom';
import { Company } from '../page/company';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/companies/:id" element={<Company />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;