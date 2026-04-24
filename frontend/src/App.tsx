import { Provider } from 'react-redux';
import { store } from './store/workflowStore';
import { TopBar } from './components/panels/TopBar';
import { Sidebar } from './components/sidebar/Sidebar';
import { WorkflowCanvas } from './components/canvas/WorkflowCanvas';
import { NodeConfigForm } from './components/forms/NodeConfigForm';

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col h-screen w-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
        <TopBar />
        <div className="flex flex-1 overflow-hidden relative">
          <Sidebar />
          <WorkflowCanvas />
          <NodeConfigForm />
        </div>
      </div>
    </Provider>
  );
}

export default App;
