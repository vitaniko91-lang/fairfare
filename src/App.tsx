import { Route, Routes } from 'react-router-dom'
import { BookingProvider } from './state/booking'
import { FlowLayout } from './flow/FlowLayout'
import { CasePage } from './case/CasePage'
import { SearchPage } from './flow/SearchPage'
import { FlightsPage } from './flow/FlightsPage'
import { SeatsPage } from './flow/SeatsPage'
import { ExtrasPage } from './flow/ExtrasPage'
import { PayPage } from './flow/PayPage'
import { DonePage } from './flow/DonePage'

export default function App() {
  return (
    <BookingProvider>
      <Routes>
        <Route path="/" element={<CasePage />} />
        <Route path="/book" element={<FlowLayout />}>
          <Route index element={<SearchPage />} />
          <Route path="flights" element={<FlightsPage />} />
          <Route path="seats" element={<SeatsPage />} />
          <Route path="extras" element={<ExtrasPage />} />
          <Route path="pay" element={<PayPage />} />
          <Route path="done" element={<DonePage />} />
        </Route>
      </Routes>
    </BookingProvider>
  )
}
