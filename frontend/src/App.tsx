import { Route, Routes } from 'react-router';
import Main from './components/feed/Main';
import Navigator from './components/Navigator';
import Item from './components/item/Item';
import Edit from './components/edit/Edit';
import { ToastContainer } from 'react-toastify';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigator />} />
                <Route path="/ads" element={<Main />} />
                <Route path="/ads/:id" element={<Item />} />
                <Route path="/ads/:id/edit" element={<Edit />} />
            </Routes>
            <ToastContainer />
        </div>
    );
};

export default App;
