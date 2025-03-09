import "./App.css";
import { Analytics } from '@vercel/analytics/react'; // Import the Analytics component 

function App() {
  return (
    <div>
      <h1>Welcome to WH Coaching</h1>
      <Analytics />  {/* Add this component to enable Vercel Analytics */}
    </div>
  );
}

export default App;