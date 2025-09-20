import { Layout } from "@/components/layout/Layout";
import { useAppSelector } from "./hooks/redux";
import { ErrorBoundary } from "react-error-boundary";
import { ScreenMap } from "./components/layout/screenMap";

function App() {
  const { activeView } = useAppSelector((state) => state.ui);
  const Component = () => {
    const SelectedComponent = ScreenMap[activeView.toLowerCase() as keyof typeof ScreenMap];
    return SelectedComponent ? SelectedComponent : <div className="h-full w-full flex items-center justify-center">Screen Not available now :)</div>;
  };
  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <Layout>
        <Component />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
