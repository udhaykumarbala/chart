import LinearChart from './components/LinearChart'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="h-[500px]">
            <LinearChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
