import { Provider } from 'react-redux';
import { store } from '@/store';
import { Layout } from '@/components/layout/Layout';
import { ModeToggle } from "./components/theme-toggle";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">eCommerce Dashboard</h1>
          {/* Dashboard content will go here */}
        </div>
      </Layout>
    </Provider>
  );
}

export default App;
