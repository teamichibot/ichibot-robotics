import EventForm from '../EventForm'

export default function NewEventPage() {
  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Tambah Event</h1>
      <EventForm />
    </div>
  )
}
