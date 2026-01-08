import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Redesign from './pages/Redesign';
import ProjectDetail from './pages/ProjectDetail';
import Admin from './pages/Admin';

import ProjectDetailWork from './pages/ProjectDetailWork';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="resume" element={<Resume />} />
        <Route path="redesigns" element={<Redesign />} />
        <Route path="project/:id" element={<ProjectDetail />} />
        <Route path="work/:id" element={<ProjectDetailWork />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
