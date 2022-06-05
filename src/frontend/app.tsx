import * as ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('app'));
function App() {
    return (<div><h2>Hello from React!</h2><p>Current month is June</p></div>);
}

root.render(<App></App>)